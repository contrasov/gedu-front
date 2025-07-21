import api from "@/lib/api";

export interface User {
    _id: string,
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

export const getTeachers = async() => {
    const response = await api.get('/user/teachers')
    return response.data
}