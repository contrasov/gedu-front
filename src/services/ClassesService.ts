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

export interface NewsData {
    title: string;
    description: string
}

export interface NewsInfo {
    title: string,
    description: string,
    dateCreate: string,
}

export enum ActivityType{
    Prova = 'Prova',
    Tarefa = 'Tarefa'
}

export enum AttandaceType{
    Presente = 'Presente',
    Faltou = 'Faltou'
}

export interface ActivitiesData {
    name: string;
    endDate: string;
    type: ActivityType
}

export interface AttandaceData {
    date: string;
    records: {
        studentId: string;
        status: AttandaceType;
    }[];
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

export const createNews = async (id: string, createNews: NewsData) => {
    const token = localStorage.getItem('authToken')
    const response = await api.post(`/class/${id}/add-news`, createNews, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getNewsByClass = async (id: string) => {
    const token = localStorage.getItem('authToken')
    const response = await api.get(`/class/${id}/news`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const deleteNews = async (id: string, newsId: string) => {
    const token = localStorage.getItem('authToken')
    const response = await api.get(`/class/${id}/news/${newsId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const createActivity = async (id: string, createActivity: ActivitiesData) => {
    const token = localStorage.getItem('authToken')
    const response = await api.post(`/class/${id}/add-activity`, createActivity, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getMyActivities = async() => {
    const token = localStorage.getItem('authToken')
    const response = await api.get(`/class/activities`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getActivitiesByClass = async (id: string) => {
    const token = localStorage.getItem('authToken')
    const response = await api.get(`/class/${id}/activities`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const createAttendance = async (id: string, createAttendance: AttandaceData) => {
    const token = localStorage.getItem('authToken')
    const response = await api.post(`/class/${id}/add-attendance`, createAttendance, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const getAttendanceByClass = async (id: string) => {
    const token = localStorage.getItem('authToken')
    const response = await api.get(`/class/${id}/attendance`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}