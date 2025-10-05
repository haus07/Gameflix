import React, { useCallback, useEffect, useState } from "react";
import { BsXSquare, BsPlayFill, BsPlus, BsHandThumbsUp, BsVolumeUp, BsVolumeMute } from "react-icons/bs";
import PlayButton from "./PlayButton";
import useInfoModalStore from "@/hooks/modals/useInfoModalStore";
import Image from "next/image";
import useHandleMovie from "@/hooks/movie/useHandleMovie";
import { useSeriesById } from "@/hooks/series/useSeriesById";

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const { movieId } = useInfoModalStore();
  const { useMovieDetailQuery } = useHandleMovie();
  const { data: movieDetail, error: errorMovieDetail, isLoading: isLoadingMovieDetail } = useMovieDetailQuery(movieId)
  console.log(movieDetail)
  const { data: seriesData, error: errorSeriesData, isLoading: isloadingSeriesData } = useSeriesById(movieDetail?.seriesId)
  console.log(seriesData)
  

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start overflow-y-auto pt-12 pb-12">
      <div className="relative w-full max-w-3xl mx-auto">
        <div
          className={`${
            isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
          } transform transition-all duration-400 ease-out relative bg-zinc-900 rounded-lg overflow-hidden shadow-2xl`}
        >
          {/* Close Button - Netflix Style */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 h-9 w-9 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors"
          >
            <BsXSquare size={24} className="text-white" />
          </button>

          {/* Hero Section with Video Thumbnail */}
          <div className="relative aspect-video w-full">
            <Image
              src={movieDetail?.poster}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              alt={movieDetail?.title}
            />
            
            {/* Gradient Overlay - Netflix signature fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            
            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <h2 className="text-white text-4xl font-bold mb-6">
                {movieDetail?.title}
              </h2>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <PlayButton movieId={movieDetail?.id} />
                
                <button className="h-10 w-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                  <BsPlus size={24} className="text-white" />
                </button>
                
                <button className="h-10 w-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                  <BsHandThumbsUp size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-12 bg-zinc-900">
            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Main Info */}
              <div className="col-span-2 space-y-4">
                {/* Match & Year & Duration */}
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">2024</span>
                  <span className="border border-gray-500 px-1 text-xs text-gray-400">
                    HD
                  </span>
                </div>

                {/* Description */}
                <p className="text-white text-base leading-relaxed">
                  {movieDetail?.description}
                </p>
              </div>

              {/* Right Column - Cast & Genres */}
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-500">Cast: </span>
                  <span className="text-gray-400">Actor 1, Actor 2, Actor 3</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Genres: </span>
                  <span className="text-gray-400">{movieDetail?.genre}</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Duration: </span>
                  <span className="text-gray-400">{movieDetail?.duration}</span>
                </div>
              </div>
            </div>

            {/* More Like This Section */}
            <div className="mt-12">
              <h3 className="text-white text-2xl font-semibold mb-6">
                Nội dung liên quan
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {seriesData?.[0]?.games?.filter((item)=>item.id!==movieDetail?.id)
                  .map((item) => (
    <div
      key={item?.id}
      className="bg-zinc-800 rounded-md overflow-hidden hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="aspect-video bg-zinc-700 relative">
        <Image
          src={item?.poster || "https://images.unsplash.com/photo-1606813902734-57f6c03c703f"}
          alt={item?.title || "Game preview"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={true}
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
                          <span className="text-white font-semibold">{item?.title }</span>
          <span className="border border-gray-600 px-1 text-gray-400">HD</span>
        </div>
        <p className="text-gray-400 text-xs line-clamp-3">
          {item?.description}
        </p>
      </div>
    </div>
  ))}
</div>
            </div>

            {/* About Section */}
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h3 className="text-white text-lg font-semibold mb-4">
                About {movieDetail?.title}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Director: </span>
                  <span className="text-gray-400">Director Name</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Cast: </span>
                  <span className="text-gray-400">Actor 1, Actor 2, Actor 3, Actor 4</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Writer: </span>
                  <span className="text-gray-400">Writer Name</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Genres: </span>
                  <span className="text-gray-400">{movieDetail?.genre}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;