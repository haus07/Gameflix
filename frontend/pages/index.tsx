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
  const { data: genres, error, isLoading } = useHandleGenres()
return (
  <div className="bg-zinc-900 min-h-screen">
    <InfoModal visible={isOpen} onClose={closeModal} />

    {/* BẮT ĐẦU KHỐI HERO UNIT */}
    <div className="relative">
      <Navbar />
      <Billboard />
    </div>
    {/* KẾT THÚC KHỐI HERO UNIT */}

    <div className="pb-40">
      {/* Các MovieList sẽ bắt đầu ngay sau khối Billboard */}
      <MovieList title="Nổi bật hiện tại" data={data?.data} />
      {genres?.map((genre) => (
        <MovieList key={genre?.id} title={genre?.title} data={genre?.games} />
      ))}
    </div>
  </div>
);
}
