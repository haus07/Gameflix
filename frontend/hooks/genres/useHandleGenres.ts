import api from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";

const useHandleGenres = () => {
    console.log("useHandleGenres dang dc mount")
    return useQuery({
        queryKey: ['genresWithGames'],
        queryFn: async () => {
            try {
                console.log("chay queryFN")
            sessionStorage.removeItem('genre_list')
            
            if (typeof window !== 'undefined') {
                console.log("nhay vao cache trong session")
                const cachedData = sessionStorage.getItem('genre_list')
                if (cachedData) {
                    console.log("return cachedData")
                    return JSON.parse(cachedData)
                }
            }
            const response = await api.get('api/v1/genres/home')
            console.log("goi api thanh cong")   
                const data = response.data.data
                console.log(data)
            if (typeof window !== 'undefined' && data) {
                sessionStorage.setItem('genre_list',JSON.stringify(data))
            }
            return data
            } catch (error) {
                console.log(error)
           }
        },
        staleTime: 0
   })
}
export default useHandleGenres