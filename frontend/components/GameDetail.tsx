import React, { useState } from 'react';
import { Heart, Share2, Plus, Play, Star, MessageCircle, ThumbsUp, Clock, Calendar, Globe, Award } from 'lucide-react';

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
            className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'} ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative h-full w-full bg-gray-950 overflow-hidden">
      {/* Background with Blur Effect */}
      <div className="absolute inset-0">
        <div 
          className="h-full w-full bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/30 backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex p-8 gap-8">
          {/* Movie Poster */}
          <div className="w-80 flex-shrink-0">
            <div className="relative">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {movie.rating}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105">
                <Play className="w-6 h-6" />
                Xem Ngay
              </button>
              
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`${isFavorited ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'} hover:bg-red-600 font-medium py-3 px-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} />
                  <span className="text-xs">Yêu thích</span>
                </button>
                
                <button 
                  onClick={() => setIsWatchlisted(!isWatchlisted)}
                  className={`${isWatchlisted ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'} hover:bg-green-600 font-medium py-3 px-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all`}
                >
                  <Plus className={`w-5 h-5`} />
                  <span className="text-xs">Thêm vào</span>
                </button>
                
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span className="text-xs">Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Movie Stats */}
            <div className="mt-6 bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">IMDb:</span>
                  <span className="text-yellow-400 font-semibold">{movie.imdbRating}/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Chất lượng:</span>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">{movie.quality}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Thời lượng:</span>
                  <span className="text-white">{movie.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Năm:</span>
                  <span className="text-white">{movie.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex-1 text-white">
            <div className="mb-6">
              <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
              <p className="text-xl text-gray-300 mb-4">{movie.originalTitle}</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  {renderStars(Math.floor(movie.rating))}
                  <span className="text-xl font-semibold">{movie.rating}/10</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-5 h-5" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>{movie.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g, index) => (
                  <span key={index} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm transition-colors cursor-pointer">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Giới thiệu:</h2>
              <p className="text-gray-200 text-lg leading-relaxed">{movie.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 block mb-1">Đạo diễn:</span>
                  <p className="text-white font-medium">{movie.director}</p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Diễn viên:</span>
                  <p className="text-white font-medium">{movie.cast.join(', ')}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 block mb-1">Quốc gia:</span>
                  <p className="text-white font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {movie.country}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Ngôn ngữ:</span>
                  <p className="text-white font-medium">{movie.language}</p>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Khởi chiếu:</span>
                  <p className="text-white font-medium">{movie.releaseDate}</p>
                </div>
              </div>
            </div>

            {/* Related Movies Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Các bản chiếu</h2>
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img 
                        src={`https://images.unsplash.com/photo-1489599263120-0f65e9699cea?w=200&h=300`} 
                        alt="Related movie"
                        className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-white font-medium group-hover:text-yellow-400 transition-colors">
                      Phim liên quan {item}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-900/70 backdrop-blur-sm border-t border-gray-700">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-yellow-500" />
                Bình luận ({comments.length})
              </h2>

              {/* Add Comment */}
              <div className="mb-8">
                <div className="bg-gray-800 p-6 rounded-xl">
                  <div className="flex gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                      alt="Your avatar" 
                      className="w-12 h-12 rounded-full border-2 border-yellow-500"
                    />
                    <div className="flex-1">
                      <div className="mb-3">
                        <span className="text-white font-medium mr-4">Đánh giá của bạn:</span>
                        {renderStars(newRating, true, setNewRating)}
                      </div>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Chia sẻ cảm nhận của bạn về bộ phim này..."
                        className="w-full p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none resize-none"
                        rows={4}
                      />
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-400 text-sm">
                          {newComment.length}/500 ký tự
                        </span>
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black font-bold px-6 py-2 rounded-lg transition-colors"
                        >
                          Đăng bình luận
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/70 transition-colors">
                    <div className="flex items-start gap-4">
                      <img 
                        src={comment.avatar} 
                        alt={comment.username}
                        className="w-12 h-12 rounded-full border-2 border-gray-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-white font-semibold text-lg">{comment.username}</span>
                          <div className="flex items-center gap-2">
                            {renderStars(comment.rating)}
                            <span className="text-yellow-400 font-medium">{comment.rating}/5</span>
                          </div>
                          <span className="text-gray-400 text-sm">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-200 mb-4 leading-relaxed">{comment.content}</p>
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
                            <ThumbsUp className="w-5 h-5" />
                            <span className="font-medium">{comment.likes}</span>
                            <span className="text-sm">Hữu ích</span>
                          </button>
                          <button className="text-gray-400 hover:text-white transition-colors text-sm">
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