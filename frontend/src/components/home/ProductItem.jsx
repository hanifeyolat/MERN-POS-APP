
import { useDispatch} from "react-redux"
import { ADD_TO_CART } from '../../redux/CartSlice'

const ProductItem = ({product}) => {

  const dispatch = useDispatch()

  const addToCart = (product) => {
      dispatch(ADD_TO_CART({product}))
  }  

  return (
    <li className='product-item' key={Math.random()*100} onClick={() => addToCart({product})}>
        <div className='w-full h-2/3 bg-white overflow-hidden '>
             <img src={product.productImg} 
                  alt={product.productName} 
                  className='object-cover w-full h-full' />
        </div>
        <div className='flex justify-between items-center gap-[2px] px-2 h-1/3 leading-[14px] '>
            <p className='font-normal '>{product.productName}</p>
            <p className='font-normal'>₺{product.productPrice}</p>
        </div>
    </li>
  )
}

export default ProductItem