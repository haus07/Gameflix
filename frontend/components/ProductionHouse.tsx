// component/ProductionHouse.js

import React from 'react';
import ProductionHouseCard from './ProductionHouseCard';
import { useSeries } from '@/hooks/series/useSeries';


const ProductionHouse = () => {
    const { data, error, isLoading } = useSeries()
    console.log(data)
      if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading series</p>;
      
    
    return (
        <div className='px-4 md:px-12 mt-4 space-y-8'>
             <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                   Series of all time
                </p>
            <div className='grid grid-cols-5 md:grid-cols-5 gap-2 md:gap-5 p-2 px-5 md:px-16'>
            
                {data?.map((item) => (
                    <ProductionHouseCard key={item.id} item={ item} />
    ))}
    </div>
        </div>
    );
}
export default ProductionHouse
