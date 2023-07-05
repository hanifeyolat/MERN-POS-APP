import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

import axios from "axios"

// export const fetchUsers =createAsyncThunk("fetchUsers" , async () => {
//     const userResponse = await axios.get("http://localhost:5000/user/all")
//     return userResponse.data   

// })


export const UserSlice = createSlice({
    name:"user",
    initialState: {
        users:[],
        currentUser:{},
        userLogin: false,
        accessToken: "",
        refreshToken: ""
    },
    reducers:{
        REGISTER_USER: (state,action) => {
           state.currentUser.userName = action.payload.userName
           state.currentUser.userEmail = action.payload.userEmail
           state.accessToken = action.payload.accessToken
           state.refreshToken = action.payload.refreshToken
           state.userLogin = true
        },
        USER_LOGOUT: (state) => {
            state.currentUser = {}
            state.accessToken = ""
            state.refreshToken = ""
            state.userLogin = false
         },
 

    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchUsers.pending , (state,action) => { // FETCH İŞLEMİ BAŞLADIĞINDA
          
    //     })
    //     builder.addCase(fetchUsers.fulfilled , (state,action) => { // FETCH İŞLEMİ BİTTİĞİNDE
         
    //     })
    //     builder.addCase(fetchUsers.rejected , (state,action) => { // FETCH İŞLEMİ HATA VERDİĞİNDE
    //         state.productsError="There is an error in Users Fetching..."
    //     })
    // }
})

export const { REGISTER_USER, USER_LOGOUT } = UserSlice.actions
export const storeRefreshToken = state => state.user.refreshToken
export default UserSlice