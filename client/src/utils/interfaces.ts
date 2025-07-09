export interface IResgisterForm {
    name: string , email?: string , phone: string , password:string
}

export interface ILoginForm {
    emailOrPhone:string , password : string
}

export interface IUser {
    _id:string , name:string , phone:string ,email?:string , password:string, role: "admin" | "customer" , addresses: []
}

export interface IUseAuthStore {
    authUser: IUser | null,
    isSigninUp: boolean,
    isLogginIn: boolean,
    isCheckingAuth: boolean
    
    signup: (formData: IResgisterForm) => Promise<void>
    login: (formData: ILoginForm) => Promise<void>
    logout: () => Promise<void>
    checkAuthUser: () => Promise<void> 
}