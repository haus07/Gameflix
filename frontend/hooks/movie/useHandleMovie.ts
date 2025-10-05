
import api from "@/axios/axios"
import { useQuery } from "@tanstack/react-query"


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

    const useRandomMovieQuery = () => {
       return useQuery({
        queryKey: ['randomMovie'],
           queryFn: async () => {
               if (typeof window !== 'undefined') {
                   const cachedData = sessionStorage.getItem('random_movie')
                   if (cachedData) {
                       return JSON.parse(cachedData)
                   }
               }
               const response = await api.get('api/v1/game-movie/random-movie')
               const data = response.data.data
               if (typeof window !== 'undefined') {
                   sessionStorage.setItem('random_movie',JSON.stringify(data))
               }
               return data
            },
            staleTime: 1000 * 60 * 60 
        })
    }
    
    return {
        fetchDataRandomMovie,
        fetchDataMovie,
        useRandomMovieQuery
    }
}

export default useHandleMovie