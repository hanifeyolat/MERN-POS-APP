import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchBills = createAsyncThunk("fetchBills", async () => {
    try {
      const response = await fetch("http://localhost:5000/bill/all", {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
  
      const data = await response.json(); // Yanıt verilerini JSON olarak okuyun
      return data;
    } catch (error) {
      console.log("Faturalar alınamadı. Hata:", error);
    }
  });

  fetchBills()
  
export let backendCreateBill = createAsyncThunk(
    "billSlice/backendCreateBill",
    async (payload) => {
        // let res=  await fetch("http://localhost:5000/bill/create", {
        //         method:"POST",
        //         body: JSON.stringify(payload),
        //         headers: { "Content-type": "application/json; charset=UTF-8" }
        // })
        let res = await axios.post("http://localhost:5000/bill/create", {...payload});
        let data = await res.data;
        return data;
    }
  );

export const billSlice = createSlice({
    name:"bills",
    initialState: {
        bills:[],
        currentBill:{},
        billsLoading: false,
        billsError: "",
    },
    reducers:{
        SAVE_BILL: (state,action) => { 
            state.bills.push(action.payload.bill)
        },
        SET_CURRENT_BILL: (state,action) => {
            state.currentBill=action.payload.bill
        },
        CLEAR_CURRENT_BILL: (state) => {
            state.currentBill={}
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchBills.pending , (state,action) => {
            state.billsLoading=true
        })
        builder.addCase(fetchBills.fulfilled , (state,action) => {
            state.bills=action.payload
            state.billsLoading=false
        })
        builder.addCase(fetchBills.rejected , (state,action) => {
            state.billsError="There is an error in Bills Fetching..."
        }) 
        builder.addCase(backendCreateBill.pending , (state,action) => {
            
            state.billsLoading=true
        })
        builder.addCase(backendCreateBill.fulfilled , (state,action) => {
            console.log("extra reducer action.payload: ", action.payload)
            state.billsLoading=false
        })
        builder.addCase(backendCreateBill.rejected , (state,action) => {
            state.billsError="There is an error in Bills Fetching..."
        })
    }
})

export const { FIRST_LOAD,
               SAVE_BILL,  
               SET_CURRENT_BILL, 
               CLEAR_CURRENT_BILL } = billSlice.actions              

export default billSlice