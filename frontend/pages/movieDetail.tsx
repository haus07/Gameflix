import React, { useState } from 'react';
import { Heart, Share2, Plus, Play, Star, MessageCircle, ThumbsUp, Clock, Calendar, Globe, Award, Bookmark, Eye } from 'lucide-react';
import image from '@/public/images/kind/callofduty.jpg'

interface Comment {
  id: number;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
  rating: number;
}

interface MovieDetailProps {
  movie?: {
    id: number;
    title: string;
    originalTitle: string;
    poster: string;
    backdrop: string;
    description: string;
    rating: number;
    imdbRating: number;
    year: number;
    duration: string;
    quality: string;
    genre: string[];
    director: string;
    cast: string[];
    country: string;
    language: string;
    releaseDate: string;
  };
}

const MovieDetail: React.FC<MovieDetailProps> = ({ 
  movie = {
    id: 1,
    title: "Tay Đua F1",
    originalTitle: "F1: The Movie",
    poster: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=450",
    backdrop: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=800",
    description: "Brad Pitt vào vai một cựu tay đua trở lại với đường đua Công thức 1 cùng APXGP một đội đua già tướng. Đồng hành cùng Pitt trên chặng đường này là Damson Idris, vào vai người đồng đội của anh. Cùng nhau, họ sẽ đối đầu với những tay đua máu mặt trong lĩnh vực thể thao, chính phục những đỉnh cao mới.",
    rating: 9.0,
    imdbRating: 7.9,
    year: 2025,
    duration: "1h 40m",
    quality: "4K",
    genre: ["Chính Kịch", "Hành Động", "Chiếu Rạp"],
    director: "Joseph Kosinski",
    cast: ["Brad Pitt", "Damson Idris", "Kerry Condon", "Javier Bardem"],
    country: "Mỹ",
    language: "Tiếng Anh",
    releaseDate: "27.06.2025"
  }
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: "FilmLover2024",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      content: "Phim hay tuyệt vời! Brad Pitt thể hiện xuất sắc vai diễn này. Những cảnh đua xe rất mãn nhãn và kịch tính.",
      likes: 45,
      timestamp: "2 giờ trước",
      rating: 5
    },
    {
      id: 2,
      username: "RacingFan",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      content: "Là một fan của F1, tôi thấy phim này rất chân thực và hấp dẫn. Khuyên mọi người nên xem!",
      likes: 32,
      timestamp: "5 giờ trước",
      rating: 5
    },
    {
      id: 3,
      username: "MovieCritic",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face",
      content: "Chất lượng hình ảnh 4K tuyệt đẹp, âm thanh sống động. Đáng để xem trên màn hình lớn.",
      likes: 28,
      timestamp: "1 ngày trước",
      rating: 4
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        username: "Bạn",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        content: newComment,
        likes: 0,
        timestamp: "Vừa xong",
        rating: newRating
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setNewRating(5);
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 transition-all duration-200 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-500'} ${interactive ? 'cursor-pointer hover:text-amber-400 hover:scale-110' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative h-full w-full bg-black overflow-x-hidden">
      {/* Enhanced Background with Parallax Effect */}
     <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080" 
            alt="Fantastic Four"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex p-8 gap-8 max-w-8xl mx-auto w-full">
          {/* Enhanced Movie Poster */}
          <div className="w-80 flex-shrink-0">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <img 
                src={image.src} 
                alt={movie.title}
                className="relative w-full h-auto rounded-2xl shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-all duration-500"
              />
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20">
                ⭐ {movie.rating}
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex items-center justify-center">
                <Play className="w-16 h-16 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="mt-8 space-y-4">
              <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Xem Ngay</span>
              </button>
              
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`${isFavorited ? 'bg-gradient-to-br from-pink-600 to-red-600 text-white shadow-lg shadow-pink-500/25' : 'bg-gray-800/80 backdrop-blur-sm text-gray-300 hover:text-white border border-gray-700'} hover:scale-105 font-medium py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} />
                  <span className="text-xs font-semibold">Yêu thích</span>
                </button>
                
                <button 
                  onClick={() => setIsWatchlisted(!isWatchlisted)}
                  className={`${isWatchlisted ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25' : 'bg-gray-800/80 backdrop-blur-sm text-gray-300 hover:text-white border border-gray-700'} hover:scale-105 font-medium py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="text-xs font-semibold">Danh sách</span>
                </button>
                
                <button className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/80 text-gray-300 hover:text-white font-medium py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
                  <Share2 className="w-5 h-5" />
                  <span className="text-xs font-semibold">Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Enhanced Movie Stats */}
            <div className="mt-8 bg-black backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Thông tin phim
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    IMDb:
                  </span>
                  <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-1 rounded-full">
                    {movie.imdbRating}/10
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Chất lượng:
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {movie.quality}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Thời lượng:
                  </span>
                  <span className="text-white font-medium">{movie.duration}</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Năm:
                  </span>
                  <span className="text-white font-medium">{movie.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Movie Details */}
          <div className="flex-1 text-white">
            <div className="mb-8">
              <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                {movie.title}
              </h1>
              <p className="text-2xl text-gray-400 mb-6 font-light tracking-wide">{movie.originalTitle}</p>
              
              <div className="flex items-center gap-8 mb-8">
                <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                  {renderStars(Math.floor(movie.rating))}
                  <span className="text-xl font-bold text-amber-400">{movie.rating}/10</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">{movie.year}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{movie.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {movie.genre.map((g, index) => (
                  <span key={index} className="bg-gradient-to-r from-gray-700/80 to-gray-800/80 backdrop-blur-sm hover:from-amber-600/80 hover:to-red-600/80 text-white px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer hover:scale-105 border border-white/10">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-10 bg-gray-900/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-amber-400" />
                Giới thiệu
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">{movie.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm mb-12">
              <div className="space-y-6 bg-gray-900/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <span className="text-gray-400 block mb-2 text-sm">Đạo diễn:</span>
                  <p className="text-white font-semibold text-lg">{movie.director}</p>
                </div>
                <div className="hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <span className="text-gray-400 block mb-2 text-sm">Diễn viên:</span>
                  <p className="text-white font-semibold">{movie.cast.join(', ')}</p>
                </div>
              </div>
              <div className="space-y-6 bg-gray-900/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <span className="text-gray-400 block mb-2 text-sm">Quốc gia:</span>
                  <p className="text-white font-semibold flex items-center gap-2 text-lg">
                    <Globe className="w-5 h-5 text-blue-400" />
                    {movie.country}
                  </p>
                </div>
                <div className="hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <span className="text-gray-400 block mb-2 text-sm">Ngôn ngữ:</span>
                  <p className="text-white font-semibold">{movie.language}</p>
                </div>
                <div className="hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <span className="text-gray-400 block mb-2 text-sm">Khởi chiếu:</span>
                  <p className="text-white font-semibold">{movie.releaseDate}</p>
                </div>
              </div>
            </div>

            {/* Enhanced Related Movies Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Play className="w-8 h-8 text-red-500" />
                Các bản chiếu
              </h2>
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl mb-4 border border-white/10">
                      <img 
                        src={`https://images.unsplash.com/photo-1489599263120-0f65e9699cea?w=200&h=300`} 
                        alt="Related movie"
                        className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-fit mx-auto">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors duration-300">
                      Phim liên quan {item}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">2024 • 1h 45m</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Comments Section */}
        <div className="bg-gradient-to-b from-black/90 to-black backdrop-blur-xl border-t border-white/10">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-10 flex items-center gap-4">
                <MessageCircle className="w-10 h-10 text-amber-500" />
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Bình luận ({comments.length})
                </span>
              </h2>

              {/* Enhanced Add Comment */}
              <div className="mb-10">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex gap-6">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                      alt="Your avatar" 
                      className="w-14 h-14 rounded-full border-3 border-amber-500 shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="mb-4">
                        <span className="text-white font-semibold text-lg mr-6">Đánh giá của bạn:</span>
                        <div className="inline-flex bg-gray-800/50 p-2 rounded-full">
                          {renderStars(newRating, true, setNewRating)}
                        </div>
                      </div>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Chia sẻ cảm nhận của bạn về bộ phim này..."
                        className="w-full p-5 bg-gray-800/50 backdrop-blur-sm text-white rounded-xl border border-gray-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none transition-all duration-300"
                        rows={4}
                      />
                      <div className="flex justify-between items-center mt-6">
                        <span className="text-gray-400 text-sm bg-gray-800/30 px-3 py-1 rounded-full">
                          {newComment.length}/500 ký tự
                        </span>
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                        >
                          Đăng bình luận
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-xl p-6 rounded-2xl hover:from-gray-800/60 hover:to-gray-900/60 transition-all duration-300 border border-white/5 hover:border-white/10 group">
                    <div className="flex items-start gap-5">
                      <img 
                        src={comment.avatar} 
                        alt={comment.username}
                        className="w-12 h-12 rounded-full border-2 border-gray-600 group-hover:border-amber-500 transition-colors duration-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-white font-bold text-lg">{comment.username}</span>
                          <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                            {renderStars(comment.rating)}
                            <span className="text-amber-400 font-bold text-sm">{comment.rating}/5</span>
                          </div>
                          <span className="text-gray-400 text-sm bg-gray-800/30 px-2 py-1 rounded-full">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-200 mb-5 leading-relaxed text-lg">{comment.content}</p>
                        <div className="flex items-center gap-8">
                          <button className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors duration-300 group-hover:scale-105">
                            <ThumbsUp className="w-5 h-5" />
                            <span className="font-semibold">{comment.likes}</span>
                            <span className="text-sm">Hữu ích</span>
                          </button>
                          <button className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium hover:underline">
                            Trả lời
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;