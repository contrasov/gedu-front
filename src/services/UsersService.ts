import api from "@/lib/api";
import type { RegisterData } from "./AuthService";

export interface User {
    _id: string,
    type: string,
    code: string,
    name: string,
    dateBirth: string,
    phone: string,
    email: string,
    cpf: string,
    training?: string,
    courseId: {
        name: string
    }
}

export const getTeachers = async() => {
    const response = await api.get('/user/teachers')
    return response.data
}

export const getStudents = async() => {
    const response = await api.get('/user/students')
    return response.data
}

export const getUserInfo = async(id: string) => {
    const token = localStorage.getItem('authToken')    
    const response = await api.get(`/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const deleteUser = async(id: string) => {
    const token = localStorage.getItem('authToken')    
    const response = await api.delete(`/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const updateUser = async(id: string, userData: RegisterData) => {
    const token = localStorage.getItem('authToken')    
    const response = await api.put(`/user/${id}`, userData , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
