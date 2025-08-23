import React, { useState } from 'react';
import { Play, Heart, Info, ChevronRight } from 'lucide-react';

const StreamingInterface = () => {
  const [isLiked, setIsLiked] = useState(false);

  const animeGrid = [
    { id: 1, title: "Yu-Gi-Oh!", image: "/api/placeholder/120/160" },
    { id: 2, title: "Charlotte", image: "/api/placeholder/120/160" },
    { id: 3, title: "Citrus", image: "/api/placeholder/120/160" },
    { id: 4, title: "Overlord", image: "/api/placeholder/120/160" },
    { id: 5, title: "Your Name", image: "/api/placeholder/120/160" },
    { id: 6, title: "Konosuba", image: "/api/placeholder/120/160" },
    { id: 7, title: "Steins;Gate", image: "/api/placeholder/120/160" },
    { id: 8, title: "Sword Art Online", image: "/api/placeholder/120/160" },
    { id: 9, title: "Prison School", image: "/api/placeholder/120/160" },
    { id: 10, title: "Made in Abyss", image: "/api/placeholder/120/160" },
    { id: 11, title: "Mob Psycho 100", image: "/api/placeholder/120/160" },
    { id: 12, title: "Black Clover", image: "/api/placeholder/120/160" },
    { id: 13, title: "Attack on Titan", image: "/api/placeholder/120/160" },
    { id: 14, title: "Dr. Stone", image: "/api/placeholder/120/160" },
    { id: 15, title: "One Piece", image: "/api/placeholder/120/160" }
  ];

  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Kho Tàng Anime Mới Nhất</h1>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="relative px-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-800 to-amber-700 min-h-[500px]">
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50"></div>
          
          {/* Anime Characters Background */}
          <div className="absolute right-0 top-0 w-2/3 h-full">
            <div className="relative w-full h-full">
              {/* Shield Hero Character */}
              <div className="absolute right-20 top-10 w-32 h-48 bg-gradient-to-b from-green-600 to-green-800 rounded-lg transform rotate-3 shadow-2xl"></div>
              {/* Raphtalia Character */}
              <div className="absolute right-40 top-20 w-28 h-44 bg-gradient-to-b from-orange-500 to-red-600 rounded-lg transform -rotate-2 shadow-2xl"></div>
              {/* Sword Effect */}
              <div className="absolute right-10 top-32 w-1 h-32 bg-gradient-to-b from-white to-gray-300 transform rotate-45 shadow-lg"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 flex flex-col justify-center h-full">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold mb-2 text-white">
                Sự Trỗi Dậy Của Khiên Hiệp Sĩ
              </h2>
              <p className="text-emerald-200 text-sm mb-4">The Rising Of The Shield Hero</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-yellow-600 px-2 py-1 rounded text-xs font-semibold">IMDb 7.7</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">T16</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">2019</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">Phần 4</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">Tập 7</span>
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-gray-300 text-sm">Chính Kịch</span>
                <span className="text-gray-300 text-sm">Hành Động</span>
                <span className="text-gray-300 text-sm">Anime</span>
                <span className="text-gray-300 text-sm">Hoạt Hình</span>
                <span className="text-gray-300 text-sm">Kỳ Ảo</span>
              </div>

              {/* Description */}
              <p className="text-gray-200 text-sm mb-6 leading-relaxed">
                Naofumi bị triệu hồi đến một thế giới song song cùng ba người khác. Mỗi người họ 
                đều được trang bị một vũ khí riêng biệt khi bị triệu hồi. Naofumi tình cờ nhận được 
                chiếc khiên huyền thoại, nhưng đây lại là vũ khí yếu nhất trong tứ đại huyền khí. Xui...
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full flex items-center gap-2 font-semibold transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </button>
                
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${isLiked ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} px-4 py-3 rounded-full transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-full transition-colors">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-8 lg:grid-cols-10 xl:grid-cols-15 gap-3">
            {animeGrid.map((anime, index) => (
              <div key={anime.id} className="group cursor-pointer">
                <div className="relative rounded-lg overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 aspect-[3/4] hover:scale-105 transition-transform duration-200">
                  {/* Placeholder for anime poster */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs text-center px-2">
                      <div className="font-semibold">{anime.title}</div>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anime Grid */}
      </div>
    </div>
  );
};

export default StreamingInterface;