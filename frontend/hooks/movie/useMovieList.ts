import { useQuery } from "@tanstack/react-query";
import api from "@/axios/axios";
// Giả định `api` đã được import từ '@/axios/axios'
// Giả định hook này nằm trong file useRandomMovieQuery.ts hoặc tương tự

const ONE_HOUR_IN_MS = 1000 * 60 * 60;
const TWENTY_FOUR_HOURS_IN_MS = ONE_HOUR_IN_MS * 24; // 24 giờ

const useMovieList = () => {
    console.log("✅ useMovieList hook mounted");
    return useQuery({
        queryKey: ['movieList'],
        
        queryFn: async () => {
            // 1. KIỂM TRA SESSION STORAGE (Persistence sau F5)
            if (typeof window !== 'undefined') {
                const cachedData = sessionStorage.getItem('movie_list');
                
                if (cachedData) {
                    // Nếu tìm thấy cache, trả về data từ Session Storage
                    return JSON.parse(cachedData); 
                }
            }

            // 2. GỌI API NẾU KHÔNG CÓ CACHE HOẶC LẦN ĐẦU
            const response = await api.get('api/v1/game-movie');
            const data = response.data.data; // Lấy đúng phần data từ response
            
            // 3. LƯU KẾT QUẢ VÀO SESSION STORAGE
            // Dùng JSON.stringify() để chuyển object thành chuỗi
            if (typeof window !== 'undefined' && data) {
                sessionStorage.setItem('movie_list', JSON.stringify(data));
            }
            
            return data;
        },
        
        // 4. CẤU HÌNH CACHE (StaleTime)
        // Dữ liệu được coi là tươi trong 24 giờ (trên TanStack cache nội bộ)
        staleTime: TWENTY_FOUR_HOURS_IN_MS 
    });
};

export default useMovieList;