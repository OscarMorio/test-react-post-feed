import { UserData, UserPrivateData } from "./base-models"

export type Nullable<T> = T | null

export type PartialUserData = Partial<UserData>

export type UserLoginData = Pick<UserData, 'userName'> & UserPrivateData

export type GenericPostCrudOperation<T = undefined, P = Nullable<number>> = (postId: P, payload?: T) => void