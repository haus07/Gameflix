import { useMovie } from "@/hooks/movie/useMovie";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsPlay, BsPause } from "react-icons/bs";

const Watch = () => {
    const router = useRouter();
    const { movieId } = router.query;
    const movieData = useMovie(movieId as number);
    const data = movieData.movie;
    console.log(movieData.movie)
    
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showControls, setShowControls] = useState(false);

    // Auto-hide navigation after 3 seconds of inactivity
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        
        const resetTimeout = () => {
            clearTimeout(timeout);
            setIsNavVisible(true);
            timeout = setTimeout(() => {
                setIsNavVisible(false);
            }, 3000);
        };

        const handleMouseMove = () => resetTimeout();
        const handleKeyPress = () => resetTimeout();

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('keydown', handleKeyPress);
        
        resetTimeout();

        return () => {
            clearTimeout(timeout);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleGoBack = () => {
        router.back();
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    if (movieData.isLoading) {
        return (
            <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <AiOutlineLoading3Quarters 
                        className="text-red-500 animate-spin mx-auto mb-4" 
                        size={60} 
                    />
                    <p className="text-white text-xl font-light">Loading movie...</p>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="relative h-screen w-screen bg-black overflow-hidden group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/40 z-0" />
            
            {/* Navigation Header */}
            <nav className={`
                fixed top-0 left-0 right-0
                p-6 z-50
                flex flex-row items-center gap-6
                bg-gradient-to-b from-black/80 via-black/60 to-transparent
                backdrop-blur-sm
                transition-all duration-500 ease-in-out
                ${isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
            `}>
                <button
                    onClick={handleGoBack}
                    className="
                        flex items-center justify-center
                        w-12 h-12 rounded-full
                        bg-white/10 backdrop-blur-md
                        border border-white/20
                        text-white hover:text-red-400
                        hover:bg-white/20 hover:border-red-400/50
                        transition-all duration-300 ease-out
                        hover:scale-110 active:scale-95
                        group/button
                    "
                >
                    <AiOutlineArrowLeft 
                        className="transition-transform duration-300 group-hover/button:-translate-x-0.5" 
                        size={24} 
                    />
                </button>
                
                <div className="flex flex-col">
                    <p className="text-white/60 text-sm font-light tracking-wider uppercase">
                        Now Watching
                    </p>
                    <h1 className="text-white text-xl md:text-3xl font-bold tracking-tight">
                        {data?.title || "Loading..."}
                    </h1>
                </div>
            </nav>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-40 bg-black flex items-center justify-center">
                    <div className="text-center">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-pulse"></div>
                            <BsPlay 
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500" 
                                size={32} 
                            />
                        </div>
                        <p className="text-white/80 text-lg font-light mt-4 animate-pulse">
                            Preparing your movie experience...
                        </p>
                    </div>
                </div>
            )}

            {/* Video Player */}
            <iframe 
                className="absolute inset-0 w-full h-full z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                src={data?.mainSource}
                onLoad={handleIframeLoad}
                title={data?.title || "Movie Player"}
            />

            {/* Bottom Control Hints */}
            <div className={`
                fixed bottom-0 left-0 right-0
                p-6 z-50
                bg-gradient-to-t from-black/80 via-black/40 to-transparent
                transition-all duration-500 ease-in-out
                ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
            `}>
              
            </div>

            {/* Ambient lighting effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
        </div>
    );
};

export default Watch;