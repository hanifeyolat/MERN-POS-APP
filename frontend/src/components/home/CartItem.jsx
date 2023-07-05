import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_FROM_CART } from '../../redux/CartSlice'

const CartItem = ({item}) => {

  const { productImg,
          productName,
          productPrice,
          productQuantity,
          _id } = item

  const dispatch = useDispatch()        
  
  const increaseQuantity = () => {
      dispatch(INCREASE_QUANTITY({product: item}))
  }

  const decreaseQuantity = () => {
    dispatch(DECREASE_QUANTITY({product: item}))
  }

  const removeFromCart = () => {
    dispatch(REMOVE_FROM_CART({product: item}))
  }


  return (
    <div className='cart-item-container' key={(Math.random()).toString()+"asdsdsada"}>
        <div className='flex items-center gap-3' >
            <div className='w-16 h-12 object-contain '>
                  <img src={productImg} alt={productName} className='w-full h-full cursor-pointer' onClick={removeFromCart} />
            </div>
            <div className='flex flex-col justify-between items-start'>
                  <h4 style={{fontSize: "14px"}} className='font-semibold '>{productName}</h4>
                  <p style={{fontSize: "14px"}} className='text-base'>₺ {productPrice}</p>
            </div>
        </div>
        <div className='flex items-center gap-2 '>
              <PlusCircleOutlined onClick={increaseQuantity} className='bg-blue-600 hover:bg-blue-400 transition ease-in p-[3px] rounded-full text-white cursor-pointer' />
              <p style={{fontSize: "14px"}}> {productQuantity} </p>
              <MinusCircleOutlined onClick={decreaseQuantity} className='bg-blue-600 hover:bg-blue-400 transition ease-in p-[3px] rounded-full text-white cursor-pointer' />
        </div>

     </div>
  )
}

export default CartItem