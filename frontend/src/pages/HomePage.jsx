import React from 'react'
import HomeShoppingCart from '../components/home/HomeShoppingCart'
import Products from '../components/home/Products'
import Categories from '../components/home/Categories'
import { useSelector } from 'react-redux'

const HomePage = () => {

  const cartItems = useSelector((state) => state.cart.cartItems)

  return (
    <div className='home-page-container  '>
          <div className='flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-5 xl:w-[74vw] lg:w-[68vw] md:w-full sm:w-full xs:w-full'>
                <Categories />
                <Products />
          </div>
          <div className='xl:w-1/4 lg:w-3/12 md:w-full sm:w-full xs:w-full xl:absolute lg:absolute md:static sm:static xs:static top-[58px] right-0 xl:border-l-[1px] lg:border-l-[1px] md:border-l-0 sm:border-l-0 xs:border-l-0 mb-0 md:mb-16 sm:mb-16 xs:mb-16'>
                <HomeShoppingCart cartItems={cartItems} />
          </div>
    </div>
  )
}

export default HomePage