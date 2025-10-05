import React, { useCallback, useMemo } from "react";
import { BsFillPlayFill, BsChevronDown, BsPlus, BsHandThumbsUp } from "react-icons/bs";
import useInfoModalStore from "@/hooks/modals/useInfoModalStore";
import { useRouter } from "next/router";
import debounce from 'lodash.debounce'

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();
  
  // const preFetchData = (movieId: number)=>{
    
  // }
  const handleModal = useCallback(() => openModal(data?.id), [openModal, data]);
  const handleWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data]);

  return (
    <div className="group relative h-[12vw] min-h-[180px]">
      {/* Base Thumbnail */}
      <img 
        src={data.poster} 
        alt={data.title || "Movie"} 
        draggable={false} 
        className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl
          transition-all duration-300 cursor-pointer
          group-hover:brightness-75 sm:group-hover:opacity-0" 
      />

      {/* Hover Expanded Card */}
      <div className="absolute top-0 left-0 w-full opacity-0 invisible sm:visible scale-95
        transition-all duration-300 ease-out z-10 pointer-events-none
        group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-[6vw] 
        group-hover:translate-x-[2vw] group-hover:pointer-events-auto
        drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
        
        <div className="relative bg-zinc-900 rounded-xl overflow-hidden ring-2 ring-zinc-700/50">
          {/* Hover Thumbnail */}
          <div className="relative h-[12vw] min-h-[180px] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
            <img 
              src={data.poster} 
              alt={data.title || "Movie"} 
              draggable={false} 
              className="w-full h-full object-cover cursor-pointer" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          </div>

          {/* Content Section */}
          <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 lg:p-4 
            border-t-2 border-zinc-700 space-y-3">
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <ActionButton onClick={handleWatch} variant="play" size="lg" />
              <ActionButton icon={BsPlus} size="lg" />
              <ActionButton icon={BsHandThumbsUp} size="lg" iconSize="sm" />
              <ActionButton onClick={handleModal} icon={BsChevronDown} size="lg" iconSize="sm" className="ml-auto" />
            </div>

            {/* Metadata */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                
                {data.year && <Badge>{data.year}</Badge>}
                {data.rating && <Badge>{data.rating}</Badge>}
              </div>

              <div className="flex items-center gap-2 text-zinc-400 text-xs lg:text-sm">
                {data.duration && <span className="font-medium">{data.duration}</span>}
                {data.quality && (
                  <>
                    <span className="text-zinc-600">•</span>
                    <Badge variant="quality">{data.quality}</Badge>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {data.genre && <GenreTag>{data.genre}</GenreTag>}
                {data.secondaryGenre && <GenreTag>{data.secondaryGenre}</GenreTag>}
              </div>

              {data.title && (
                <h3 className="text-white font-bold text-sm lg:text-base line-clamp-1 mt-3 tracking-wide">
                  {data.title}
                </h3>
              )}
            </div>
          </div>

          {/* Accent Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 via-transparent to-transparent 
            rounded-xl pointer-events-none opacity-60" />
        </div>
      </div>
    </div>
  );
};

// Sub-components
interface ActionButtonProps {
  onClick?: () => void;
  variant?: 'play';
  icon?: React.ComponentType<{ className?: string }>;
  size?: 'md' | 'lg';
  iconSize?: 'sm' | 'md';
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  variant, 
  icon: Icon, 
  size = 'md',
  iconSize = 'md',
  className = '' 
}) => {
  const isPlay = variant === 'play';
  const sizeClasses = size === 'lg' ? 'w-10 h-10' : 'w-9 h-9';
  const iconSizeClasses = iconSize === 'sm' ? 'w-3.5 h-3.5 lg:w-4 lg:h-4' : 'w-4 h-4 lg:w-5 lg:h-5';
  
  return (
    <button
      onClick={onClick}
      className={`${sizeClasses} rounded-full flex items-center justify-center
        transition-all duration-200 active:scale-90 hover:scale-105
        ${isPlay 
          ? 'bg-white hover:bg-zinc-100 shadow-lg hover:shadow-xl' 
          : 'border-2 border-white/90 hover:border-white hover:bg-white/20 backdrop-blur-sm'
        }
        ${className}`}
    >
      {isPlay ? (
        <BsFillPlayFill className={`text-black ml-0.5 ${iconSizeClasses}`} />
      ) : Icon ? (
        <Icon className={`text-white ${iconSizeClasses}`} />
      ) : null}
    </button>
  );
};

const Badge: React.FC<{ children: React.ReactNode; variant?: 'quality' }> = ({ children, variant }) => (
  <span className={`text-xs lg:text-sm px-1.5 py-0.5 rounded border font-medium
    ${variant === 'quality' 
      ? 'border-zinc-600 text-zinc-300 bg-zinc-800/50' 
      : 'border-zinc-600 text-zinc-400'
    }`}>
    {children}
  </span>
);

const GenreTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-xs lg:text-sm px-3 py-1 rounded-full bg-zinc-700/60 text-zinc-300 
    font-medium backdrop-blur-sm border border-zinc-600/30">
    {children}
  </span>
);

export default MovieCard;