import fetcher from "@/libs/fetcher";
import useSWR from "swr";


const useMovieList = () => {
    const { 
        data,
        error,
        isLoading
    } = useSWR(`api/v1/game-movie`, fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus:false
    })

    return {
        data,
        error,
        isLoading
    }
}


export default useMovieList