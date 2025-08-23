import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { BsChevronDown, BsPlus, BsHandThumbsUp } from "react-icons/bs";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw] min-h-[180px]">
      {/* Main thumbnail image */}
      <img 
        onClick={() => {}} 
        src={data.thumbnailUrl} 
        alt={data.title || "Movie"} 
        draggable={false} 
        className="
          cursor-pointer
          object-cover
          transition-all
          duration-300
          shadow-xl
          rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          delay-300
          w-full
          h-[12vw]
          min-h-[180px]
        " 
      />

      {/* Hover card */}
      <div className="
        opacity-0
        absolute
        top-0
        transition-all
        duration-300
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
        drop-shadow-2xl
      ">
        {/* Hover thumbnail */}
        <img 
          onClick={() => {}} 
          src={data.thumbnailUrl} 
          alt={data.title || "Movie"} 
          draggable={false} 
          className="
            cursor-pointer
            object-cover
            transition-all
            duration-300
            shadow-xl
            rounded-t-md
            w-full
            h-[12vw]
            min-h-[180px]
          " 
        />

        {/* Content overlay */}
        <div className="
          z-10
          bg-zinc-800
          p-3
          lg:p-4
          absolute
          w-full
          transition-all
          duration-300
          shadow-2xl
          rounded-b-md
          border-t-2
          border-zinc-700
        ">
          {/* Action buttons */}
          <div className="flex flex-row items-center gap-2 mb-3">
            {/* Play button */}
            <div 
              onClick={() => {}} 
              className="
                cursor-pointer 
                w-8 h-8 lg:w-10 lg:h-10 
                bg-white 
                rounded-full 
                flex justify-center items-center 
                transition-all duration-200 
                hover:bg-neutral-200
                hover:scale-105
                shadow-lg
              "
            >
              <BsFillPlayFill className="text-black w-4 lg:w-5 ml-0.5" />
            </div>

            {/* Add to list button */}
            <div 
              onClick={() => {}} 
              className="
                cursor-pointer 
                w-8 h-8 lg:w-10 lg:h-10 
                border-white border-2 
                rounded-full 
                flex justify-center items-center 
                transition-all duration-200 
                hover:border-neutral-300
                hover:bg-white/10
                hover:scale-105
              "
            >
              <BsPlus className="text-white hover:text-neutral-300 w-4 lg:w-5" />
            </div>

            {/* Like button */}
            <div 
              onClick={() => {}} 
              className="
                cursor-pointer 
                w-8 h-8 lg:w-10 lg:h-10 
                border-white border-2 
                rounded-full 
                flex justify-center items-center 
                transition-all duration-200 
                hover:border-neutral-300
                hover:bg-white/10
                hover:scale-105
              "
            >
              <BsHandThumbsUp className="text-white hover:text-neutral-300 w-3 lg:w-4" />
            </div>

            {/* More info button */}
            <div 
              onClick={() => {}} 
              className="
                cursor-pointer 
                ml-auto 
                w-8 h-8 lg:w-10 lg:h-10 
                border-white border-2 
                rounded-full 
                flex justify-center items-center 
                transition-all duration-200 
                hover:border-neutral-300
                hover:bg-white/10
                hover:scale-105
              "
            >
              <BsChevronDown className="text-white hover:text-neutral-300 w-3 lg:w-4" />
            </div>
          </div>

          {/* Movie info */}
          <div className="space-y-2">
            {/* Match percentage and year */}
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-semibold text-sm lg:text-base">
                98% Match
              </span>
              {data.year && (
                <span className="text-white/70 text-xs lg:text-sm border border-white/40 px-1 rounded">
                  {data.year}
                </span>
              )}
              {data.maturityRating && (
                <span className="text-white/70 text-xs lg:text-sm border border-white/40 px-1 rounded">
                  {data.maturityRating}
                </span>
              )}
            </div>

            {/* Duration and quality */}
            <div className="flex items-center gap-2 text-white/80 text-xs lg:text-sm">
              {data.duration && <span>{data.duration}</span>}
              {data.quality && (
                <>
                  <span>•</span>
                  <span className="border border-white/40 px-1 rounded text-xs">
                    {data.quality}
                  </span>
                </>
              )}
            </div>

            {/* Genre tags */}
            <div className="flex flex-wrap items-center gap-1 text-white/70 text-xs lg:text-sm">
              {data.genre && (
                <span className="bg-white/10 px-2 py-0.5 rounded-full">
                  {data.genre}
                </span>
              )}
              {data.secondaryGenre && (
                <span className="bg-white/10 px-2 py-0.5 rounded-full">
                  {data.secondaryGenre}
                </span>
              )}
            </div>

            {/* Title (if available) */}
            {data.title && (
              <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-1 mt-2">
                {data.title}
              </h3>
            )}
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent rounded-md pointer-events-none" />
      </div>
    </div>
  );
};

export default MovieCard;