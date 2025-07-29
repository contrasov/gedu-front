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

export interface SubjectData {
    name: string,
    description: string,
    courseId: string,
    status: boolean
}

export const getCoursers = async() => {
    const response = await api.get('/course')
    return response.data
}

/* mini gambiarra */
export const getCourse = async(id: string) => {
    const response = await api.get(`/course/${id}`)
    return response.data.subjectIds
}

export const getCourseInfo = async(id: string) => {
    const response = await api.get(`/course/${id}`)
    return response.data
}

export const createCourse = async (courseData: CreateCourse) => {
    const response = await api.post('/course', courseData)
    return response.data
}

export const createSubject = async (subjectData: SubjectData) => {
    const token = localStorage.getItem('authToken')
    const response = await api.post(`/subject/`, subjectData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}