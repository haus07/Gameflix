import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayBtnProbs{
    movieId:string
}

const PlayButton: ReactFC<PlayBtnProbs> = ({movieId}) => {
    return (
        <button className="bg-white
                        rounded-md
                        py-1 md:py-2
                        px-2 md:px-4
                        w-auto
                        text-xs
                        lg:text-xl
                        font-semibold
                        flex
                        flex-row
                        items-center
                        hover:bg-neutral-300
                        transition">
            <BsFillPlayFill size={25} className="mr-1" />
            Play
        </button>
    )
    
}

export default PlayButton