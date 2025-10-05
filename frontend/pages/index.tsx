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
  console.log(genres)

  return (
    <div className="bg-zinc-900 min-h-screen">
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <ProductionHouse />
        {/* 2 cái cứng */}
        <MovieList title="Nổi bật hiện tại" data={data?.data} />
        {/* Render thêm theo genre */}
        {genres?.map((genre) => (
          <MovieList key={genre?.id} title={genre?.title} data={genre?.games} />
        ))}
      </div>
    </div>
  );
}
