//registerform interface
export interface IResgisterForm {
    name: string , email?: string , phone: string , password:string
}
//Login form interface
export interface ILoginForm {
    emailOrPhone: string,
    password: string
}

//User interface 
export interface IUser {
    _id:string , name:string , phone:string ,email?:string , password:string, role: "admin" | "customer" , addresses: []
}

// Auth Store interface
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

//Modal interface
export interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    title?: string, 
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full',
    showCloseButton?: boolean,
    closeOnOverlayClick?: boolean, 
    closeOnEscape?: boolean,
    className?: string,
    children?: React.ReactNode;

}

//Login popup interface
export interface LoginModalProps{
    isOpen: boolean, 
    onClose: () => void
}