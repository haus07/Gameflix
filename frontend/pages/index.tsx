import Billboard from "@/components/Billboard";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import ProductionHouse from "@/components/ProductionHouse";
import StreamingInterface from "@/components/GameDetail";
import MovieDetail from "@/components/GameDetail";
import InfoModal from "@/components/InfoModal";
import useInfoModalStore from "@/hooks/modals/useInfoModalStore";
import useMovieList from "@/hooks/movie/useMovieList";



export default function Home() {
   const {data,error,isLoading} = useMovieList()
  
   const {isOpen, closeModal} = useInfoModalStore();
  return (
    <>
      <div className="bg-zinc-900 min-h-screen">
         <InfoModal visible={isOpen} onClose={closeModal} />
          <Navbar />
      <Billboard />
        <div className="pb-40 ">
        <ProductionHouse/>
        <MovieList  title="Trending now" data={ data} />
          <MovieList title="Top 10" data={data} type='ranked' />
        </div>
    </div>
    </>
  );
}
