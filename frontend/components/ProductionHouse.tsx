// component/ProductionHouse.js

import React from 'react';
import ProductionHouseCard from './ProductionHouseCard';
import disney from '@/public/images/kind/disney.png'
import marvel from '@/public/images/kind/marvel.png'
import nationalG from '@/public/images/kind/nationalG.png'
import pixar from '@/public/images/kind/pixar.png'
import starwar from '@/public/images/kind/starwar.png'
import assasinscreed from '@/public/images/kind/assasin.png'
import gta from '@/public/images/kind/gta.png'
import callOfDuty from '@/public/images/kind/callofduty.png'
import theWitcher from '@/public/images/kind/thewitcher.png'
import eldenRing from '@/public/images/kind/eldenring.png'
import residentEvil from '@/public/images/kind/residentevil.png'
import forza from '@/public/images/kind/forza.webp'
import dc from '@/public/images/kind/dc.png'
import redDeadRedemption from '@/public/images/kind/reddeadredemption.png'

const ProductionHouse = () => {
      const productionHouseList=[
            {
                id:1,
                image:residentEvil,
                video:'/images/kind/disney.mp4'
            },
            {
                id:2,
                image:forza,
                video:'/images/kind/pixar.mp4'
            },
            {
                id:3,
                image:marvel,
                video:'/images/kind/marvel.mp4'
            },
            {
                id:4,
                image:dc,
                video:'/images/kind/star-wars.mp4'
            },
            {
                id:5,
                image:redDeadRedemption,
                video:'/images/kind/national-geographic.mp4'
            },
            {
                id:6,
                image:assasinscreed,
                video:'/images/kind/disney.mp4'
            },
            {
                id:7,
                image:gta,
                video:'/images/kind/pixar.mp4'
            },
            {
                id:8,
                image:callOfDuty,
                video:'/images/kind/marvel.mp4'
            },
            {
                id:9,
                image:theWitcher,
                video:'/images/kind/star-wars.mp4'
            },
            {
                id:10,
                image:eldenRing,
                video:'/images/kind/national-geographic.mp4'
            },
    
    ]
    console.log(productionHouseList)
    
    return (
        <div className='px-4 md:px-12 mt-4 space-y-8'>
             <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                   Series of all time
                </p>
            <div className='grid grid-cols-5 md:grid-cols-5 gap-2 md:gap-5 p-2 px-5 md:px-16'>
            
                {productionHouseList.map((item) => (
                    <ProductionHouseCard key={item.id} item={ item} />
    ))}
    </div>
        </div>
    );
}
export default ProductionHouse
