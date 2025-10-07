"use client";

import React, { useRef } from "react";
import ProductionHouseCard from "./ProductionHouseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { isEmpty } from "lodash";

interface ProductionHouseProps {
  data: Record<string, any>[];
  title: string;
}

const ProductionHouse: React.FC<ProductionHouseProps> = ({ data, title }) => {
  console.log(data)
  if (isEmpty(data)) return null;

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8 relative">
      {/* title */}
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        {title}
      </p>

      {/* nút điều hướng */}
      <div
        ref={prevRef}
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer 
        items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/70 hover:text-black"
      >
        ◀
      </div>
      <div
        ref={nextRef}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer 
        items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/70 hover:text-black"
      >
        ▶
      </div>

      {/* swiper */}
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="overflow-x-hidden"
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id} style={{ width: "220px" }}>
            <ProductionHouseCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductionHouse;
