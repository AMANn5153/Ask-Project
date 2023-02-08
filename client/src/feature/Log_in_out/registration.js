import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState={
    message:"",
    error:"",
    status:""
}
export const register = createAsyncThunk("regis/register",async(data,{rejectWithValue})=>{
    const{username,email,password}=data
    console.log(data)
    const res=await fetch("/register",{
        
        method:"post",
        headers:{
           "Content-Type": "application/json"
            },credentials:"include",
        body:JSON.stringify({
             username,email,password
        })
    })
    const result= await res.json()
    if(res.status===201){
        return result
    }
    else{
        return rejectWithValue(result)
    }
})

export const regis=createSlice({
    name:"regis",
    initialState,
    reducers:{
        clean:(state)=>{
            state.message=""
            state.status="idle"
            state.error=""
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.message
        })
        .addCase(register.rejected,(state,action)=>{
            state.status="rejected"
            state.error=action.payload.error
        })

    }
})

export const {clean}=regis.actions
export default regis.reducer