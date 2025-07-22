import api from "@/lib/api";

interface Student {
    _id: string;
    name: string;
    email: string;
}

export interface ClassInfo {
    _id: string,
    name: string;
    subjectId: {
        code: string;
    };
    schedule: Array<string>;
    teacherId: {
        name: string;
    };
    studentIds: Student[];
}

export interface ClassData {
    courseId: string,
    subjectId: string,
    teacherId: string,
    schedule: Array<String>;
}

export const enrollStudent = async(id: string) => {
    const token = localStorage.getItem('authToken');
    const response = await api.post(`/class/${id}/add-student`,{},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
}

export const unenrollStudent = async(id: string) => {
    const token = localStorage.getItem('authToken');
    const response = await api.delete(`/class/${id}/remove-student`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
}

export const createClass = async (createClass: ClassData) => {
    const token = localStorage.getItem('authToken')
    const response = await api.post(`/class`, createClass, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getClasses = async () => {
    const token = localStorage.getItem('authToken')
    const response = await api.get('/class', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getInfoClass = async (id: string) => {
    const token = localStorage.getItem('authToken')
    const response = await api.get(`/class/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}