export interface User {
    name: string
    email: string
}

export interface UserRegister {
    name: string
    password: string
    email: string
}

export interface UserLogin {
    email: string
    password: string
}