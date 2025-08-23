import React from 'react'
import Image, {StaticImageData } from 'next/image'
import { useState } from 'react'
 

interface ProductionHouseItem {
  id: number;
  image: StaticImageData|string; // hoặc StaticImageData nếu import từ next/image
  video: string;
}

interface ProductionHouseCardProps {
  item: ProductionHouseItem;
}

const ProductionHouseCard: React.FC<ProductionHouseCardProps> = ({ item})=> {
      const [isVideoVisible, setIsVideoVisible] = useState(false);
  return (
    
    <div
    onMouseEnter={() => setIsVideoVisible(true)}
    onMouseLeave={() => setIsVideoVisible(false)}
    
    className="relative aspect-video border-[2px] border-gray-600 rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer shadow-xl shadow-gray-800">
                {
                  isVideoVisible && (<video 
                    
                    src={item?.video} 
                    autoPlay 
                    loop 
                    playsInline 
                    muted 
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md hover:opacity-35 "
                    /> )
                  }
  <Image 
    src={item.image} 
    width={1000} 
    height={500} 
    className="z-[1] opacity-100 w-full h-full object-contain rounded-md" 
  />
</div>
  )
}

export default ProductionHouseCard