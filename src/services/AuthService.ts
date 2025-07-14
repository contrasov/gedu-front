import api from "@/lib/api";

export interface LoginData {
    email: string
    password: string
}

export interface RegisterData {
    type: string,
    code: string,
    name: string,
    dateBirth: string,
    phone: string,
    email: string,
    cpf: string,
    training?: string;
    password: string
}

export const login = async (loginData: LoginData) => {
    const response = await api.post('/auth/login', loginData)
    if (response.data.acces_token){
        localStorage.setItem('authToken', response.data.acces_token)
    }
    return response.data
}

export const register = async (registerData: RegisterData) => {
    const response = await api.post('/auth/register', registerData)
    return response.data
}

export const logout = async () => {
    localStorage.removeItem('authToken')
    return true;
}