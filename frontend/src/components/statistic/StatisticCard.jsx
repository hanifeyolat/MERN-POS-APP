import React from 'react'

const StatisticCard = ({img,title,desc}) => {
  return (
    <div className='w-full bg-slate-950 text-white rounded-md p-5 flex flex-wrap items-center justify-center gap-5'>
        <div className='rounded-full bg-white w-20 h-20 p-4'>
            <img src={img} alt={title}/>
        </div>
        <div className='flex flex-col gap-1'>
            <h1 className='font-bold text-slate-500'>{title}</h1>
            <h1 className='font-bold text-xl'>{desc}</h1>
        </div>
    </div>
  )
}

export default StatisticCard