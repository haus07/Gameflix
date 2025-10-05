import api from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";

const useHandleGenres = () => {
    console.log("useHandleGenres dang dc mount")
    return useQuery({
        queryKey: ['genresWithGames'],
        queryFn: async () => {
            try {
            sessionStorage.removeItem('genre_list')
            
            if (typeof window !== 'undefined') {
                const cachedData = sessionStorage.getItem('genre_list')
                if (cachedData) {
                    return JSON.parse(cachedData)
                }
            }
            const response = await api.get('api/v1/genres/home')
            const data = response.data.data
            if (typeof window !== 'undefined' && data) {
                sessionStorage.setItem('genre_list',JSON.stringify(data))
            }
            return data
            } catch (error) {
                console.log(error)
           }
        },
        staleTime: 1000 * 60 * 60 * 12
   })
}
export default useHandleGenres