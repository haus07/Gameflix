import { useQuery } from "@tanstack/react-query";
import api from "@/axios/axios";


export const useSeriesById = (id) => {
    try {
        return useQuery({
        queryKey: ['seriesById',id],
        queryFn: async () => await api.get(`api/v1/series/${id}`).then(res => res.data.data),
        enabled:!!id,
        staleTime: 1000 * 60 * 60 * 2
    })
    } catch (error) {
        console.log(error)
    }
}