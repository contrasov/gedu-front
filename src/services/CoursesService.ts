import api from "@/lib/api";

export interface Course {
    _id: string,
    name: string,
    subjectIds: [
        {
            _id: string,
            name: string,
        }
    ]
}

export const getCoursers = async() => {
    const response = await api.get('/course')
    return response.data
}

export const getCourse = async(id: string) => {
    const response = await api.get(`/course/${id}`)
    return response.data.subjectIds
}