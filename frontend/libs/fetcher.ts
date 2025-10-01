// /libs/fetcher.ts
import api from "@/axios/axios";

const fetcher = (url: string) => api.get(url).then(res => res.data.data);

export default fetcher;
