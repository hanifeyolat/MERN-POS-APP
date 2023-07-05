import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    try {
      const response = await fetch("http://localhost:5000/product/all", {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
  
      const data = await response.json(); // Yanıt verilerini JSON olarak okuyun
      return data;
    } catch (error) {
      console.log("Ürünler alınamadı. Hata:", error);
    }
  });

  fetchProducts()

export const productsSlice = createSlice({
    name:"products",
    initialState: {
        products:[],
        currentRecord:null,
        category:"",
        search:"",
        filteredProducts:[],
        productsLoading:false,
        productsError:"",
    },
    reducers:{
        ADD_A_PRODUCT: (state,action) => {
            const product = action.payload.product
            const findPr = current(state.products)?.find( p => p.productName.toLowerCase() === product.productName.toLowerCase())
            if(!findPr) {
            state.products.push({...product})
            }
        },
        EDIT_THE_PRODUCT: (state,action) => {
            const { _id, productName, productPrice, productImg, productCategory} = action.payload
            state.products =  state.products?.map( item => item._id === _id ? 
                                      { _id, productName, productPrice, productImg, productCategory} : item )
        },
        DELETE_THE_PRODUCT: (state,action) => {
            const { productId } = action.payload
            state.products = state.products?.filter( item => item.productId !== productId)
        },
        FILTER_BY_SEARCH: (state,action) => { 
            state.search = action.payload.search
            state.filteredProducts=state.products?.filter( item => item.productName.toLowerCase().includes(state.search.trim()))
        },
        FILTER_BY_CATEGORY: (state,action) => {
            state.category = action.payload.category.categoryName
            state.filteredProducts = state.products?.filter( item => item.productCategory === action.payload.category.categoryName)
        },
        CLEAR_CATEGORY_FILTER:  (state) => {
            state.category = ""
            state.filteredProducts = []
        },
        CURRENT_RECORD: (state,action) => {
            state.currentRecord = action.payload.record
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending , (state,action) => { // FETCH İŞLEMİ BAŞLADIĞINDA
            state.productsLoading = true 
        })
        builder.addCase(fetchProducts.fulfilled , (state,action) => { // FETCH İŞLEMİ BİTTİĞİNDE
            state.products = action.payload
            state.productsLoading = false
        })
        builder.addCase(fetchProducts.rejected , (state,action) => { // FETCH İŞLEMİ HATA VERDİĞİNDE
            state.productsError = "There is an error in Products Fetching..."
        })
    }
})

export const { STORE_PRODUCTS,
               ADD_A_PRODUCT,
               EDIT_THE_PRODUCT,
               DELETE_THE_PRODUCT,
               FILTER_BY_SEARCH,
               FILTER_BY_CATEGORY,
               CLEAR_CATEGORY_FILTER,
               CURRENT_RECORD } = productsSlice.actions

export default productsSlice