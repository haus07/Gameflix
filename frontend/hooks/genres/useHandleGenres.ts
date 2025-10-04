import api from "@/axios/axios";

export const useHandleGenres = () => {
    const fetchDataGenreWithMovie = async () => {
        try {
            const response = await api.get('api/v1/genres/home')
            return response.data
            
        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchDataGenreWithMovie
    }
}
export default useHandleGenres