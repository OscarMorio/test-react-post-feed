import { Nullable } from "@/shared/models/base-types";
import { PropsWithChildren, useEffect, useId, useRef, useState } from "react";

interface UserDataFormProps {
  hasErrors?: boolean;
  onDataChange: (username: string, password: string) => void
  errorMessage?: string
}

const UserDataForm = ({
  hasErrors = false,
  errorMessage,
  onDataChange
}: PropsWithChildren<UserDataFormProps>) => {
  const usernameId = useId()
  const passwordId = useId()

  const [username, setUsername] = useState<Nullable<string>>(null);
  const [password, setPassword] = useState<Nullable<string>>(null);

  useEffect(() => {
    if (username && password) onDataChange(username, password)
  }, [username, password])


  return (
    <div className="form-container flex flex-col">
      <span className="form-field">
        <label htmlFor={usernameId}>Username</label>
        <input id={usernameId} type="text" name="text" onInput={(e) => setUsername(e.currentTarget.value)} />
      </span>

      <span className="form-field">
        <label htmlFor={passwordId}>Password</label>
        <input id={passwordId} type="password" onInput={(e) => setPassword(e.currentTarget.value)} />
      </span>

      {hasErrors && (
        <span className="form-error">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default UserDataForm
