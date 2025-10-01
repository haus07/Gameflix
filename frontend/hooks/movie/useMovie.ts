import useSWR from "swr";
import api from "@/axios/axios";

// fetcher chuẩn cho SWR
const fetcher = (url: string) => api.get(url).then(res => res.data.data);

// hook để fetch movie theo id
export const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `/api/v1/game-movie/${id}` : null, // nếu id undefined => không fetch
    fetcher
  );

  return {
    movie: data,
    isLoading,
    isError: !!error,
  };
};
