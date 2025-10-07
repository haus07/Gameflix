import api from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";


const useSeriesWithGenres = () => {
    return useQuery({
        queryKey: ['seriesWithGenres'],
        queryFn: async () => {
            try {
                if (typeof window !== 'undefined') {
                    const cachedData = sessionStorage.getItem('series_genres')
                if (cachedData) {
                    return JSON.parse(cachedData)
                    }
                    const response = await api.get('api/v1/genres/home/series')
                    const data = response.data.data
                    if (typeof window !== 'undefined' && data) {
                        sessionStorage.setItem('series_genres',JSON.stringify(data))
                    }
                    return data
                }
            } catch (error) {
                console.log(error)
            }
        },
        staleTime: 1000 * 60 * 60 * 12
    })
}
export default useSeriesWithGenres