import Number1Svg from '@/public/images/rank/number-1.svg'
import Number2Svg from '@/public/images/rank/number-2.svg'
import Number3Svg from '@/public/images/rank/number-3.svg'
import Number4Svg from '@/public/images/rank/number-4.svg'
import Number5Svg from '@/public/images/rank/number-5.svg'
import Number6Svg from '@/public/images/rank/number-6.svg'
import Number7Svg from '@/public/images/rank/number-7.svg'
import Number8Svg from '@/public/images/rank/number-8.svg'
import Number9Svg from '@/public/images/rank/number-9.svg'
import Number10Svg from '@/public/images/rank/number-10.svg'
import React from 'react'

interface ContentRankCardProps {
    data: Record<string, any>
    rank: number
}

const ContentRankCard: React.FC<ContentRankCardProps> = ({ data, rank }) => {
    const getRankComponent = () => {
        const rankComponents = {
            1: Number1Svg,
            2: Number2Svg,
            3: Number3Svg,
            4: Number4Svg,
            5: Number5Svg,
            6: Number6Svg,
            7: Number7Svg,
            8: Number8Svg,
            9: Number9Svg,
            10: Number10Svg,
        }
        return rankComponents[rank as keyof typeof rankComponents]
    }

    const RankComponent = getRankComponent()

    return (
        <div className="group relative w-full aspect-video">
            {/* Original card */}
            <div className="bg-zinc-900 rounded-lg overflow-hidden w-full h-full">
                {/* Rank number */}
                <div className="absolute top-0 left-0 w-1/2 h-full z-20 flex items-center justify-center">
                    {RankComponent && (
                        <RankComponent className="w-20 h-20 drop-shadow-2xl opacity-100 sm:group-hover:opacity-0 transition-opacity duration-300" />
                    )}
                </div>

                {/* Thumbnail image */}
                <img 
                    className="absolute top-0 right-0 w-1/2 h-full object-cover transition-opacity duration-300 group-hover:opacity-90 sm:group-hover:opacity-0" 
                    src={data.thumbnailUrl} 
                    alt={data.title || "Content thumbnail"}
                />

                {/* Simple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>

            {/* Expanded hover card */}
            <div className="
                opacity-0
                absolute
                top-0
                transition-all
                duration-300
                z-10
                
                invisible
                sm:visible
                delay-150
                w-full
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[6vw]
                group-hover:translate-x-[1vw]
                group-hover:opacity-100
                drop-shadow-2xl
            ">
                {/* Expanded card content */}
                <div className="bg-zinc-900 rounded-lg overflow-hidden">
                    {/* Rank number and thumbnail */}
                    <div className="relative aspect-video">
                        <div className="absolute top-0 left-0 w-1/2 h-full z-20 flex items-center justify-center">
                            {RankComponent && (
                                <RankComponent className="w-20 h-20 drop-shadow-2xl" />
                            )}
                        </div>
                        <img 
                            className="absolute top-0 right-0 w-1/2 h-full object-cover" 
                            src={data.thumbnailUrl} 
                            alt={data.title || "Content thumbnail"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </div>

                    {/* Content overlay */}
                    <div className="bg-zinc-800 p-3 border-t-2 border-zinc-700">
                        {/* Action buttons */}
                        <div className="flex flex-row items-center gap-2 mb-3">
                            {/* Play button */}
                            <div className="cursor-pointer w-8 h-8 bg-white rounded-full flex justify-center items-center transition-all duration-200 hover:bg-neutral-200 hover:scale-105 shadow-lg">
                                <svg className="w-4 h-4 fill-current text-black ml-0.5" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>

                            {/* Add to list button */}
                            <div className="cursor-pointer w-8 h-8 border-white border-2 rounded-full flex justify-center items-center transition-all duration-200 hover:border-neutral-300 hover:bg-white/10 hover:scale-105">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>

                            {/* Like button */}
                            <div className="cursor-pointer w-8 h-8 border-white border-2 rounded-full flex justify-center items-center transition-all duration-200 hover:border-neutral-300 hover:bg-white/10 hover:scale-105">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                            </div>

                            {/* More info button */}
                            <div className="cursor-pointer ml-auto w-8 h-8 border-white border-2 rounded-full flex justify-center items-center transition-all duration-200 hover:border-neutral-300 hover:bg-white/10 hover:scale-105">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Movie info */}
                        <div className="space-y-2">
                            {/* Match percentage and year */}
                            <div className="flex items-center gap-2">
                                <span className="text-green-400 font-semibold text-sm">
                                    98% Match
                                </span>
                                {data.year && (
                                    <span className="text-white/70 text-xs border border-white/40 px-1 rounded">
                                        {data.year}
                                    </span>
                                )}
                                {data.maturityRating && (
                                    <span className="text-white/70 text-xs border border-white/40 px-1 rounded">
                                        {data.maturityRating}
                                    </span>
                                )}
                            </div>

                            {/* Duration and quality */}
                            <div className="flex items-center gap-2 text-white/80 text-xs">
                                {data.duration && <span>{data.duration}</span>}
                                {data.quality && (
                                    <>
                                        <span>•</span>
                                        <span className="border border-white/40 px-1 rounded text-xs">
                                            {data.quality}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Genre tags */}
                            <div className="flex flex-wrap items-center gap-1 text-white/70 text-xs">
                                {data.genre && (
                                    <span className="bg-white/10 px-2 py-0.5 rounded-full">
                                        {data.genre}
                                    </span>
                                )}
                                {data.secondaryGenre && (
                                    <span className="bg-white/10 px-2 py-0.5 rounded-full">
                                        {data.secondaryGenre}
                                    </span>
                                )}
                            </div>

                            {/* Title (if available) */}
                            {data.title && (
                                <h3 className="text-white font-semibold text-sm line-clamp-1 mt-2">
                                    {data.title}
                                </h3>
                            )}
                        </div>
                    </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent rounded-lg pointer-events-none" />
            </div>
        </div>
    )
}

export default ContentRankCard