import { createSlice, current } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name:"cartSlice",
    initialState: {
        cartItems:[],
        cartTotal:0,
        tax:10,
        subTotal:0
    },
    reducers:{
        ADD_TO_CART: (state,action) => { 

             const product = action.payload.product.product
             const itemsArr = current(state.cartItems)

             if(itemsArr.length===0){
                    state.cartItems.push({...product, productQuantity:1})
             }else{
                    const itemsArr2  = []
                    itemsArr.map( item => itemsArr2.push(item) )
                    const isThere = itemsArr2.find(c => c.productName === product.productName)

                    if(!isThere){
                        state.cartItems.push({...product, productQuantity:1})
                    }else{
                        state.cartItems=[]
                        itemsArr2.map(c => c._id === product._id ?
                                    state.cartItems.push({...c , productQuantity: c.productQuantity+1} ):
                                    state.cartItems.push(c))
                    }
             }
             
             var cartTotal = 0
             state.cartItems.map(c => cartTotal+=(Number(c.productPrice) * Number(c.productQuantity)) )
             state.cartTotal = cartTotal
             state.subTotal = cartTotal + (cartTotal*state.tax/100)

             return state
             
        },
        REMOVE_FROM_CART: (state,action) => { 
          
            const product = action.payload.product
            state.cartItems = state.cartItems.filter(c => c._id !== product._id )
            var cartTotal = 0
            state.cartItems.map(c => cartTotal+=(Number(c.productPrice) * Number(c.productQuantity)) )
            state.cartTotal = cartTotal
            state.subTotal = cartTotal + (cartTotal*state.tax/100)
            return state
            
        },
        CLEAR_CART: (state) => { 

            state.cartItems = []
            state.cartTotal = 0
            state.subTotal =0
            return state
   
        },
        INCREASE_QUANTITY: (state,action) => { 

            const product = action.payload.product
            state.cartItems = state.cartItems.map(c => c._id === product._id ?
                                                       {...c , productQuantity: c.productQuantity+1} : {...c} )
            var cartTotal = 0
            state.cartItems.map(c => cartTotal+=(Number(c.productPrice) * Number(c.productQuantity)) )
            state.cartTotal = cartTotal
            state.subTotal = cartTotal + (cartTotal*state.tax/100)
            return state 

        },
        DECREASE_QUANTITY: (state,action) => { 

            const product = action.payload.product
            state.cartItems= state.cartItems.map(c => {
                if(c._id === product._id && c.productQuantity>1){
                    return {...c , productQuantity: c.productQuantity-1}
                }else{
                    return c
                }
            } )
            
            var cartTotal = 0
            state.cartItems.map(c => cartTotal+=(Number(c.productPrice) * Number(c.productQuantity)) )
            state.cartTotal = cartTotal
            state.subTotal = cartTotal + (cartTotal*state.tax/100)
            return state
        },
        CREATE_BILL: (state, action) =>{

        }
    }
})

export const {  ADD_TO_CART,
                REMOVE_FROM_CART,
                CLEAR_CART,
                INCREASE_QUANTITY, 
                DECREASE_QUANTITY,
                CREATE_BILL   } = cartSlice.actions

export default cartSlice