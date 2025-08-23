import React from "react"
import {isEmpty} from 'lodash'
import MovieCard from "./MovieCard";
import ContentRankCard from "./ContenrRankCard";


interface MovieListProbs { 
    data: Record<string, any>[];
    title: string
    type:string
}

const MovieList:React.FC<MovieListProbs> = ({ data,title,type}) => {
    if (isEmpty(data)) {
        return null
    }
    console.log(type)
    
    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    { title}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {data.map((movie,index) =>
                        type === 'ranked' ? (<ContentRankCard key={movie.id} data={movie} rank={ index+1} />):(
                        <MovieCard key={ movie.id} data={movie}  />
                    ))}

                </div>
            </div>
        </div>
    )
}

export default MovieList