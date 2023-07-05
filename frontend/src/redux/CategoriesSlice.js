import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
    try {
      const response = await fetch("http://localhost:5000/category/all", {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
  
      const data = await response.json(); // Yanıt verilerini JSON olarak okuyun
      return data;
    } catch (error) {
      console.log("Kategoriler alınamadı. Hata:", error);
    }
  });
  fetchCategories()
export const categoriesSlice = createSlice({
    name:"categories",
    initialState: {    
        categories:[],
        categoriesLoading:false,
        categoriesError:"",
    },
    reducers:{
        ADD_A_CATEGORY: (state,action) => {
            const category = action.payload.category
            const findCt = current(state.categories).find( c => c.categoryName.toLowerCase() === category.categoryName.toLowerCase())
            if(!findCt) {
              state.categories.push({...category})
            }
            
        },
        EDIT_THE_CATEGORY: (state, action) => {
          const { categoryId, categoryName } = action.payload;
          state.categories = state.categories.map((item) =>
            item._id === categoryId ? { ...item, categoryName: categoryName } : item
          );
        },
        DELETE_THE_CATEGORY: (state, action) => {
          const { categoryId, categoryName } = action.payload;
          state.categories = state.categories.filter((item) => item._id !== categoryId);
        },

       
    },
    extraReducers:(builder) => {
        builder.addCase(fetchCategories.pending , (state,action) => {
            state.categoriesLoading=true
        })
        builder.addCase(fetchCategories.fulfilled , (state,action) => {
            state.categories=action.payload
            state.categoriesLoading=false
        })
        builder.addCase(fetchCategories.rejected , (state,action) => {
            state.categoriesError="There is an error in Products Fetching..."
        })
    }
})

export const {
               STORE_CATEGORIES,  
               ADD_A_CATEGORY, 
               EDIT_THE_CATEGORY,
               DELETE_THE_CATEGORY } = categoriesSlice.actions

export default categoriesSlice