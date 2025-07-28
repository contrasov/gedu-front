import api from "@/lib/api";

export interface Course {
    _id: string,
    name: string,
    description: string,
    semesterDuration: number,
    subjectIds: [
        {
            _id: string,
            name: string,
        }
    ],
}

export interface CreateCourse {
    name: string,
    description: string,
    semesterDuration: number,
    status: boolean
}

export const getCoursers = async() => {
    const response = await api.get('/course')
    return response.data
}

export const getCourse = async(id: string) => {
    const response = await api.get(`/course/${id}`)
    return response.data.subjectIds
}

export const createCourse = async (courseData: CreateCourse) => {
    const response = await api.post('/course', courseData)
    return response.data
}