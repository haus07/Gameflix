import React, { useRef } from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import ContentRankCard from "./ContenrRankCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
  type: "ranked" | "default";
}

const MovieList: React.FC<MovieListProps> = ({ data, title, type }) => {
  if (isEmpty(data)) return null;
  console.log(data)

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const renderCard = (movie: Record<string, any>, index: number) =>
    type === "ranked" ? (
      <ContentRankCard key={movie.id} data={movie} rank={index + 1} />
    ) : (
      <MovieCard key={movie.id} data={movie} />
    );
  const titleMap = new Map<string, string>([
      ["Superhero","Siêu anh hùng"],
      ["Adventure","Khám phá"],
      ["Racing","Đua xe"],
      ["Shooter","Bắn súng"],
      ["RPG","Nhập vai"],
    ])
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8 relative">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        {titleMap.has(title)?titleMap.get(title):title}
      </p>

      {/* Nút mũi tên */}
      <div
        ref={prevRef}
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/70 hover:text-black"
      >
        ◀
      </div>
      <div
        ref={nextRef}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/70 hover:text-black"
      >
        ▶
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={"auto"}
        grabCursor={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // gán ref cho Swiper
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="overflow-x-hidden"
      >
        {data?.map((movie, index) => (
          <SwiperSlide key={movie.id} style={{ width: "300px" }}>
            {renderCard(movie, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
