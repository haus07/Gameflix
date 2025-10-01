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
import React, { useCallback } from 'react'
import useInfoModalStore from '@/hooks/modals/useInfoModalStore'
import { useRouter } from 'next/router'
import { BsFillPlayFill, BsChevronDown, BsPlus, BsHandThumbsUp } from "react-icons/bs"

interface ContentRankCardProps {
    data: Record<string, any>
    rank: number
}

const RANK_SVGS = {
    1: Number1Svg, 2: Number2Svg, 3: Number3Svg, 4: Number4Svg, 5: Number5Svg,
    6: Number6Svg, 7: Number7Svg, 8: Number8Svg, 9: Number9Svg, 10: Number10Svg,
}

const ContentRankCard: React.FC<ContentRankCardProps> = ({ data, rank }) => {
    const router = useRouter()
    const { openModal } = useInfoModalStore()
    
    const RankSvg = RANK_SVGS[rank as keyof typeof RANK_SVGS]
    const handleModal = useCallback(() => openModal(data?.id), [openModal, data])
    const handleWatch = useCallback(() => router.push(`/watch/${data?.id}`), [router, data])

    return (
        <div className="group relative h-[12vw] min-h-[180px]">
            {/* Base Card - Split layout with rank */}
            <div className="absolute inset-0 bg-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                {/* Rank Badge - Left side */}
                <div className="absolute inset-y-0 left-0 w-1/2 z-20 flex items-center justify-center bg-gradient-to-r from-black/60 to-transparent">
                    {RankSvg && (
                        <RankSvg className="w-20 h-20 lg:w-24 lg:h-24 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] 
                            transition-opacity duration-300 sm:group-hover:opacity-0" 
                        />
                    )}
                </div>

                {/* Thumbnail - Right side */}
                <img 
                    src={data.poster} 
                    alt={data.title || "Content"} 
                    draggable={false}
                    className="absolute inset-y-0 right-0 w-1/2 h-full object-cover 
                        transition-all duration-300 cursor-pointer
                        group-hover:brightness-75 sm:group-hover:opacity-0" 
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Hover Expanded Card */}
            <div className="absolute top-0 left-0 w-full opacity-0 invisible sm:visible scale-95
    transition-all duration-300 ease-out z-30 pointer-events-none
    group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-[6vw] 
    group-hover:translate-x-[2vw] group-hover:pointer-events-auto
    drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                
                <div className="relative bg-zinc-900 rounded-xl overflow-hidden ring-2 ring-zinc-700/50">
                    {/* Hover Thumbnail with Rank */}
                    <div className="relative h-[12vw] min-h-[180px] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                        {/* Rank Badge in hover state */}
                        <div className="absolute inset-y-0 left-0 w-1/2 z-20 flex items-center justify-center">
                            {RankSvg && <RankSvg className="w-20 h-20 lg:w-24 lg:h-24 drop-shadow-2xl" />}
                        </div>
                        
                        {/* Thumbnail */}
                        <img 
                            src={data.poster} 
                            alt={data.title || "Content"} 
                            draggable={false} 
                            className="absolute inset-y-0 right-0 w-1/2 h-full object-cover cursor-pointer" 
                        />
                        
                        {/* Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 lg:p-4 
                        border-t-2 border-zinc-700 space-y-3">
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <ActionButton onClick={handleWatch} variant="play" size="lg" />
                            <ActionButton icon={BsPlus} size="lg" />
                            <ActionButton icon={BsHandThumbsUp} size="lg" iconSize="sm" />
                            <ActionButton onClick={handleModal} icon={BsChevronDown} size="lg" iconSize="sm" className="ml-auto" />
                        </div>

                        {/* Metadata */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-emerald-400 font-bold text-sm lg:text-base tracking-wide">
                                    98% Match
                                </span>
                                {data.year && <Badge>{data.year}</Badge>}
                                {data.maturityRating && <Badge>{data.maturityRating}</Badge>}
                            </div>

                            <div className="flex items-center gap-2 text-zinc-400 text-xs lg:text-sm">
                                {data.duration && <span className="font-medium">{data.duration}</span>}
                                {data.quality && (
                                    <>
                                        <span className="text-zinc-600">•</span>
                                        <Badge variant="quality">{data.quality}</Badge>
                                    </>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {data.genre && <GenreTag>{data.genre}</GenreTag>}
                                {data.secondaryGenre && <GenreTag>{data.secondaryGenre}</GenreTag>}
                            </div>

                            {data.title && (
                                <h3 className="text-white font-bold text-sm lg:text-base line-clamp-1 mt-3 tracking-wide">
                                    {data.title}
                                </h3>
                            )}
                        </div>
                    </div>

                    {/* Accent Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 via-transparent to-transparent 
                        rounded-xl pointer-events-none opacity-60" />
                </div>
            </div>
        </div>
    )
}

// Sub-components
interface ActionButtonProps {
    onClick?: () => void
    variant?: 'play'
    icon?: React.ComponentType<{ className?: string }>
    size?: 'md' | 'lg'
    iconSize?: 'sm' | 'md'
    className?: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
    onClick, 
    variant, 
    icon: Icon, 
    size = 'md',
    iconSize = 'md',
    className = '' 
}) => {
    const isPlay = variant === 'play'
    const sizeClasses = size === 'lg' ? 'w-10 h-10' : 'w-9 h-9'
    const iconSizeClasses = iconSize === 'sm' ? 'w-3.5 h-3.5 lg:w-4 lg:h-4' : 'w-4 h-4 lg:w-5 lg:h-5'
    
    return (
        <button
            onClick={onClick}
            className={`${sizeClasses} rounded-full flex items-center justify-center
                transition-all duration-200 active:scale-90 hover:scale-105
                ${isPlay 
                    ? 'bg-white hover:bg-zinc-100 shadow-lg hover:shadow-xl' 
                    : 'border-2 border-white/90 hover:border-white hover:bg-white/20 backdrop-blur-sm'
                }
                ${className}`}
        >
            {isPlay ? (
                <BsFillPlayFill className={`text-black ml-0.5 ${iconSizeClasses}`} />
            ) : Icon ? (
                <Icon className={`text-white ${iconSizeClasses}`} />
            ) : null}
        </button>
    )
}

const Badge: React.FC<{ children: React.ReactNode; variant?: 'quality' }> = ({ children, variant }) => (
    <span className={`text-xs lg:text-sm px-1.5 py-0.5 rounded border font-medium
        ${variant === 'quality' 
            ? 'border-zinc-600 text-zinc-300 bg-zinc-800/50' 
            : 'border-zinc-600 text-zinc-400'
        }`}>
        {children}
    </span>
)

const GenreTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-xs lg:text-sm px-3 py-1 rounded-full bg-zinc-700/60 text-zinc-300 
        font-medium backdrop-blur-sm border border-zinc-600/30">
        {children}
    </span>
)

export default ContentRankCard