import Billboard from "@/components/Billboard";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import ProductionHouse from "@/components/ProductionHouse";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/modals/useInfoModalStore";
import useHandleGenres from "@/hooks/genres/useHandleGenres";
import { useEffect, useState } from "react";
import { databaseConfig } from './../../backend/src/config/database.config';
import useMovieList from "@/hooks/movie/useMovieList";
import { useSeries } from "@/hooks/series/useSeries";

interface GameMovie {
  id: number;
  title: string;
  poster: string;
}

interface Genre {
  id: number;
  title: string;
  games: GameMovie[];
}

export default function Home() {
  const { isOpen, closeModal } = useInfoModalStore();
  const { data } = useMovieList()
  console.log(data)

  const { data: genres, error, isLoading } = useHandleGenres()
  const { data:series,error:errorSeries,isLoading:isLoadingSeries } = useSeries()
    
  console.log(genres)

  return (
    <div className="bg-zinc-900 min-h-screen">
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <ProductionHouse data={series } title="Dòng game nổi bật trong ngày" />
        {/* 2 cái cứng */}
        {/* Render thêm theo genre */}
      </div>
    </div>
  );
}
