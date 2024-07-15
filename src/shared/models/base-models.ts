export interface Post {
    id: number
    userId: number
    title: string
    body: string
}

export interface UserData {
    userId: number
    userName: string
}

export interface UserPrivateData {
    password: string
}