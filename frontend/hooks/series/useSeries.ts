import { getAllSeries } from "@/api/series"
import { useQuery } from "@tanstack/react-query"

export const useSeries = () => {
    return useQuery({
        queryKey: ['series'],
        queryFn: getAllSeries,
        staleTime:1000*60*5
    })
}