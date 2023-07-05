import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { BarChartOutlined,
         CopyOutlined,
         HomeOutlined,
         LogoutOutlined,
         SearchOutlined,
         ShoppingCartOutlined,
         UserOutlined } from "@ant-design/icons";
import { Badge, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH } from '../redux/ProductsSlice';
import { USER_LOGOUT } from '../redux/UserSlice';
import axios from 'axios';
//import { useDispatch } from 'react-redux';

const Header = () => {

    const [search, setSearch]=useState("")
    const [cartBadge, setCartBadge]=useState(0)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()
    const tokenRef= useSelector(state => state.user.refreshToken)

    console.log("token ref: ", tokenRef)

    useEffect(() => {
        var badge = 0
        cartItems.map(c=> badge=badge + c.productQuantity)
        setCartBadge(badge)
    },[cartItems])

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({search}))
    },[search])

    const userLogout = async () => {
        await axios.post("http://localhost:5000/user/logout",{token : tokenRef})
        dispatch(USER_LOGOUT())
    }

    return (
        <div className='z-50 overflow-y-hidden w-screen h-[10vh] px-10 bg-white border-b-[1px] border-b-[#e3e3e3] flex gap-6 items-center justify-between mb-4 fixed top-0 right-0'>
            <Link to="/" className='text-4xl font-bold'>HNF</Link>
            <Input placeholder="Ürün Ara..." size="large" 
                prefix={<SearchOutlined />}
                className="rounded-full max-w-[800px] xl:max-w-[800px] lg:max-w-[800px] xl:mr-12 lg:mr-12 md:mr-10 md:w-2/3 sm:w-2/3 sm:mr-16 xs:w-2/3 xs:mr-16"
                onChange={(e) => setSearch(e.target.value.toLowerCase().trim())} />

            <div className='flex justify-between xl:w-auto lg:w-auto xl:static lg:static xl:px-0 xl:py-4 xl:border-0 lg:px-0 lg:py-4 lg:border-0 z-50  bg-white
                                        md:gap-4 md:fixed md:w-full md:bottom-0 md:left-0 md:px-10 md:py-3 md:border-t-[1px] md:border-t-[#e3e3e3] md:h-[10vh]   
                                        sm:gap-4 sm:fixed sm:w-full sm:bottom-0 sm:left-0 sm:px-10 sm:py-3 sm:border-t-[1px] sm:border-t-[#e3e3e3] sm:h-[10vh] 
                                        xs:gap-4 xs:fixed xs:w-full xs:bottom-0 xs:left-0 xs:px-10 xs:py-3 xs:border-t-[1px] xs:border-t-[#e3e3e3] xs:h-[10vh] '>
                <Link to="/" className='flex flex-col gap-[2px] items-center justify-center'> 
                    <HomeOutlined style={{ fontSize: '25px' }}/>
                    <span className='text-xs font-thin'>Anasayfa</span>
                </Link>
                <Link to="/cart"  className='flex items-center justify-center xl:static lg:static fixed md:top-4 md:right-10 sm:top-4 sm:right-10 xs:top-4 xs:right-10 top-0 right-0'> 
                    <Badge count={cartBadge} className='flex flex-col gap-[2px] items-center justify-center'>
                        <ShoppingCartOutlined style={{ fontSize: '25px' }}/>
                        <span className='text-xs font-thin'>Sepetim</span>
                    </Badge>
                </Link>
                <Link to="/bills" className='flex flex-col gap-[2px] items-center justify-center'> 
                    <CopyOutlined style={{ fontSize: '25px' }}/>
                    <span className='text-xs font-thin'>Siparişlerim</span>
                </Link>
                <Link to="/customer" className='flex flex-col gap-[2px] items-center justify-center'> 
                    <UserOutlined style={{ fontSize: '25px' }}/>
                    <span className='text-xs font-thin'>Profilim</span>
                </Link>
                <Link to="/statistic" className='flex flex-col gap-[2px] items-center justify-center'> 
                    <BarChartOutlined style={{ fontSize: '25px' }}/>
                    <span className='text-xs font-thin'>İstatistikler</span>
                </Link>
                <Link to="/login" onClick={userLogout} className='flex flex-col gap-[2px] items-center justify-center'> 
                    <LogoutOutlined style={{ fontSize: '25px' }}/>
                    <span className='text-xs font-thin'>Logout</span>
                </Link>
            </div>
        </div>
    )

}

export default Header