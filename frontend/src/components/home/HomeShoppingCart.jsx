
import CartItem from './CartItem'
import { Button, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_CART } from '../../redux/CartSlice'
import { useNavigate } from 'react-router-dom'



const HomeShoppingCart = ({cartItems}) => {

  const cartTotal = useSelector((state) => state.cart.cartTotal) 
  const tax = useSelector((state) => state.cart.tax) 
  const subTotal = useSelector((state) => state.cart.subTotal) 
  const dispatch = useDispatch()  
  const navigate = useNavigate()  

  const clearCart = () => {
     dispatch(CLEAR_CART())
  }
 
  return (
    <div className='home-shopping-cart  ' >
       <div className='flex flex-col'>
                <div className='cart-banner '>
                   Sepetteki Ürünler
                </div>
                <div className=' overflow-y-auto pr-3 xl:h-[47vh] lg:h-[47vh] md:h-[47vh] h-auto '>
                    {
                      cartItems && cartItems?.map(item=>(
                        <CartItem item={item}/>
                      ))
                    }
                </div>
              </div>
        <div className=' flex flex-col justify-end border-t-[1px] py-4 xl:h-[33vh] lg:h-[33vh] md:h-[33vh] h-auto'>
            <div className=' border-b-[1px] flex flex-col w-full h-full px-4 '>
                  <div style={{fontSize: "14px"}} className='w-full flex items-center justify-between'>
                    <b> Ara Toplam</b> 
                    <p> ₺{cartTotal.toFixed(2)}</p> 
                  </div>
                  <div style={{fontSize: "14px"}} className='w-full flex items-center justify-between'>
                    <b>KDV %{tax}</b> 
                    <p> + ₺{((cartTotal/100)*10).toFixed(2)}</p> 
                  </div>
            </div>
            <div className=' border-b-[1px] text-md px-4 '>
              <div style={{fontSize: "18px"}} className='flex items-center justify-between font-bold py-2'>
                <b className='text-green-600'> Genel Toplam</b> 
                <b className='text-red-600'> ₺{subTotal.toFixed(2)}</b> 
              </div>
            
            </div>
            <div className='mx-4 mt-2 cursor-pointer '>
                <Button type="primary" size="normal" className='w-full my-1' style={{ fontSize: '14px' }}  onClick={() => navigate("/bill-address")}>
                    Sipariş Oluştur
                </Button>
                <Button onClick={clearCart} type="primary" danger size="normal" style={{ fontSize: '14px' }}  className='w-full flex items-center gap-2  ' >
                    <div className='flex items-center gap-2 mx-auto'>
                      <DeleteOutlined className='' />
                      <p>Sepeti Temizle</p>
                    </div>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default HomeShoppingCart