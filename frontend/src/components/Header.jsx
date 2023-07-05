import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Input } from 'antd';
import {
    BarChartOutlined,
    CopyOutlined,
    HomeOutlined,
    LogoutOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH } from '../redux/ProductsSlice';
import { USER_LOGOUT } from '../redux/UserSlice';
//import { useDispatch } from 'react-redux';

const Header = () => {

    const [search, setSearch]=useState("")
    const [cartBadge, setCartBadge]=useState(0)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()
    const tokenRef = useSelector(state => state.user.refreshToken)

    useEffect(() => {
        var badge = 0
        cartItems.map(c=> badge=badge + c.productQuantity)
        setCartBadge(badge)
    },[cartItems])

    useEffect(() => {
        dispatch(FILTER_BY_SEARCH({search}))
    },[search])

    const userLogout = async () => {


        await fetch("http://localhost:5000/user/logout", {
                    method: "POST",
                    headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    },
                    credentials: "include" 
              }).then(() => dispatch(USER_LOGOUT()) )
                .catch((error) => console.log("USER NOT LOG OUT " + error))
                
                

    }

    return (
    <>
        <div className='z-50 overflow-y-hidden w-full h-[10vh] px-10 bg-white border-b-[1px] border-b-[#e3e3e3] flex gap-6 items-center justify-between mb-4 fixed top-0 right-0'>
            <Link to="/" className='text-3xl font-bold'>HNF</Link>
            <Input placeholder="Ürün Ara..." size="large" prefix={<SearchOutlined />} className="rounded-full w-full"
                onChange={(e) => setSearch(e.target.value.toLowerCase().trim())} style={{ fontSize: '12px' }} />

            <div className='w-auto h-[10vh] flex gap-3'>
                    <Link to="/" className='flex flex-col gap-[2px] items-center justify-center'> 
                        <HomeOutlined style={{ fontSize: '20px' }}/>
                        <span className='text-xs font-thin'>Anasayfa</span>
                    </Link>
                    <Link to="/cart"  className='flex items-center justify-center top-2 right-5'> 
                        <Badge count={cartBadge} className='flex flex-col gap-[2px] items-center justify-center'>
                            <ShoppingCartOutlined style={{ fontSize: '20px' }}/>
                            <span className='text-xs font-thin'>Sepetim</span>
                        </Badge>
                    </Link>
                    <Link to="/bills" className='flex flex-col gap-[2px] items-center justify-center'> 
                        <CopyOutlined style={{ fontSize: '20px' }}/>
                        <span className='text-xs font-thin'>Siparişlerim</span>
                    </Link>
                    <Link to="/customer" className='flex flex-col gap-[2px] items-center justify-center'> 
                        <UserOutlined style={{ fontSize: '20px' }}/>
                        <span className='text-xs font-thin'>Profilim</span>
                    </Link>
                    <Link to="/statistic" className='flex flex-col gap-[2px] items-center justify-center'> 
                        <BarChartOutlined style={{ fontSize: '20px' }}/>
                        <span className='text-xs font-thin'>İstatistikler</span>
                    </Link>
                    <Link to="/login" onClick={userLogout} className='flex flex-col gap-[2px] items-center justify-center'> 
                        <LogoutOutlined style={{ fontSize: '20px' }}/>
                        <span className='text-xs font-thin'>Logout</span>
                    </Link>
            </div>
        </div>
        <div className='z-50 overflow-y-hidden w-full h-[10vh] px-10 border-b-[1px] border-b-[#e3e3e3] xl:hidden lg:hidden md:flex sm:flex xs:flex gap-6 items-center justify-between mb-4 fixed top-0 right-0 bg-white'>

            <Link to="/" className='text-3xl font-bold'>HNF</Link>
            <Input placeholder="Ürün Ara..." size="large" prefix={<SearchOutlined />} style={{ fontSize: '12px' }}
                className="rounded-full w-full"
                onChange={(e) => setSearch(e.target.value.toLowerCase().trim())} />
            <Link to="/cart"  className=''> 
                <Badge count={cartBadge} className='flex flex-col gap-[2px] items-center justify-center'>
                    <ShoppingCartOutlined style={{ fontSize: '20px' }}/>
                    <span className='text-xs font-thin'>Sepetim</span>
                </Badge>
            </Link>

        </div>
        <div className='z-50 w-full h-[10vh] xl:hidden lg:hidden md:flex sm:flex xs:flex items-center justify-between px-10 bg-white fixed bottom-0 left-0 border-t-[1px] border-t-[#e2e2e2] text-base'>
                <Link to="/" className='flex flex-col gap-[2px] items-center justify-center'> 
                    <HomeOutlined style={{ fontSize: '20px' }}/>
                    <span className='text-xs font-thin'>Anasayfa</span>
                </Link>
                <Link to="/bills" className='flex flex-col gap-[2px] items-center justify-center'> 
                    <CopyOutlined style={{ fontSize: '20px' }}/>
                    <span className='text-xs font-thin'>Siparişlerim</span>
                </Link>
                <Link to="/customer" className='flex flex-col gap-[2px] items-center justify-center'> 
                    <UserOutlined style={{ fontSize: '20px' }}/>
                    <span className='text-xs font-thin'>Profilim</span>
                </Link>
                <Link to="/statistic" className='flex flex-col gap-[2px] items-center justify-center'> 
                    <BarChartOutlined style={{ fontSize: '20px' }}/>
                    <span className='text-xs font-thin'>İstatistikler</span>
                </Link>
                <Link to="/login" onClick={userLogout} className='flex flex-col gap-[2px] items-center justify-center'> 
                    <LogoutOutlined style={{ fontSize: '20px' }}/>
                    <span className='text-xs font-thin'>Logout</span>
                </Link>
        </div>
    </>
    )

}

export default Header