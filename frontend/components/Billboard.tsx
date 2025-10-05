"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { motion } from "framer-motion";   // 👈 import framer-motion
import PlayButton from "./PlayButton";
import useInfoModalStore from "@/hooks/modals/useInfoModalStore";
import useHandleMovie from "@/hooks/movie/useHandleMovie";

const Billboard = () => {
  const { openModal } = useInfoModalStore();
  const { fetchDataRandomMovie,useRandomMovieQuery } = useHandleMovie() 
  const { data, error, isLoading } = useRandomMovieQuery() 
  const handleOpenModal = useCallback(() => openModal(data?.id), [openModal,data]);
  console.log(data)

  if (!data) return null;

  return (
    <div className= "relative h-[56.26vw] overflow-hidden">
      {/* Video background */}
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%] scale-105 animate-zoom-slow"
        autoPlay
        muted
        loop
        src={data?.trailerSource}
      />

      {/* Gradient overlay để dễ đọc chữ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Movie info */}
      <motion.div
        className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.p
          className="text-white text-2xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {data?.title}
        </motion.p>

        <motion.p
          className="text-white text-sm md:text-lg mt-3 w-[80%] lg:w-[50%] drop-shadow-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {data?.description}
        </motion.p>

        <motion.div
          className="flex flex-row items-center mt-4 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-3 md:px-4 text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Billboard;
