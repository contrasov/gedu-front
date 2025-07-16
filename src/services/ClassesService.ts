import api from "@/lib/api";

export const getClasses = async ()  => {
    const response = await api.get('/class')
    return response.data
}

export const getInfoClass = async(id: string) => {
    const response = await api.get(`/class/${id}`)
    return response.data
}