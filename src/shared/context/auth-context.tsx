import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UserData } from "../models/base-models";
import { Nullable, PartialUserData, UserLoginData } from "../models/base-types";

export interface AuthContextProps extends PartialUserData {
  isLogged: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => void;
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({
  children,
}: PropsWithChildren): ReactNode => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userData, setUserData] = useState<Nullable<UserData>>(null);
  const [users, setUsers] = useState<UserLoginData[]>([]);
  const firstLoad = useRef(true);

  const handleLogout = () => {
    setIsLogged(false)
    setUserData(null)
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
  };

  const handleLogin = (
    username: string,
    password: string
  ): Promise<boolean> => {
    if (!username || !password) return Promise.resolve(false);
    const userInfo = users.find((user) => user.userName === username);
    // Username doesn't exist
    if (!userInfo) return Promise.resolve(false);

    const loginSuccessful = userInfo.password === password;

    if (loginSuccessful) {
      setIsLogged(true);
      const payload = {
        userName: userInfo.userName,
        userId: users.length,
      };
      setUserData(payload);

      localStorage.setItem("token", "dummyauth");
      localStorage.setItem("user-data", JSON.stringify(payload));

      Promise.resolve(true);
    }

    return Promise.resolve(false);
  };

  const handleRegister = (username: string, password: string) => {
    const payload = { userName: username, password };
    const prevUsers: UserLoginData[] = JSON.parse(
      localStorage.getItem("users") ?? "[]"
    );

    if (prevUsers.some((user) => user.userName === username)) {
      // User already exists
      throw new Error("User already exists");
    }

    localStorage.setItem("users", JSON.stringify([...prevUsers, payload]));
    setUsers([...prevUsers, payload])
  };

  const initialize = () => {
    const token = localStorage.getItem("token");
    const localUsers = JSON.parse(
      localStorage.getItem("users") ?? "[]"
    ) as UserLoginData[];

    setUsers(localUsers);

    if (token === "dummyauth") {
      setIsLogged(true);
      const retrievedUserData = JSON.parse(
        localStorage.getItem("user-data") ?? "{}"
      );
      setUserData(retrievedUserData);
    }
  };

  useEffect(() => {
    if (firstLoad.current) {
      initialize();
      firstLoad.current = false;
    }
  }, []);

  const AuthContextValues: AuthContextProps = useMemo(() => {
    return {
      isLogged,
      userId: userData?.userId,
      userName: userData?.userName,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout
    };
  }, [isLogged, userData, users]);

  return (
    <AuthContext.Provider value={AuthContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
