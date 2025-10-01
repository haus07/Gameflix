
import api from "@/axios/axios"


const useHandleMovie = () => {
    const fetchDataRandomMovie = async () => {
    try {
        const response = await api.get('api/v1/game-movie/random-movie')
    return response.data.data
    } catch (error) {
        console.log(error)
    }
    }

    const fetchDataMovie = async (id) => {
        try {
            const response = await api.get(`api/v1/game-movie/${id}`)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    }
    
    return {
        fetchDataRandomMovie,
        fetchDataMovie
    }
}

export default useHandleMovie