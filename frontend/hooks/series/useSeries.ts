import { getAllSeries } from "@/api/series"
import api from "@/axios/axios"
import { useQuery } from "@tanstack/react-query"

export const useSeries = () => {
    return useQuery({
        queryKey: ['series'],
        queryFn: async () => {
            if (typeof window !== 'undefined') {
                const cachedData = sessionStorage.getItem('series')
                if (cachedData) {
                    return JSON.parse(cachedData)
                }
                const response = await api.get('api/v1/series')
                const data = response.data.data.data
                if (typeof window !== 'undefined' && data) {
                    sessionStorage.setItem('series',JSON.stringify(data))
                }
                return data
            }
        },
        staleTime:1000*60*5
    })
}