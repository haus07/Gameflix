import api from "@/axios/axios";

interface Series {
    title: string
    description: string
    poster: string
    trailerSource: string
    publisher: string
    developer: string
}

export const getAllSeries= async () => {
    const response = await api.get('api/v1/series')
    return response.data.data.data
}
