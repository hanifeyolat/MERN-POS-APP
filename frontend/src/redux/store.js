import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from "./CartSlice"
import productReducer from "./ProductsSlice"
import categoryReducer from "./CategoriesSlice"
import userReducer from "./UserSlice"
import billReducer from "./BillSlice"


const rootReducer = combineReducers({
                              cart: cartReducer.reducer,
                              user: userReducer.reducer,
                              products: productReducer.reducer,
                              categories: categoryReducer.reducer,
                              bills: billReducer.reducer
                            })

export const store = configureStore({ reducer: rootReducer })

