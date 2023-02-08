import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"

const initialState={
    message:"",
    status:"idle",
    edit:{
        message:"",
        status:"idle"
    }
}



export const postAddInfo=createAsyncThunk("userEdit/postAddInfo",async(data,{rejectWithValue})=>{
    try{
        const addInfo= await fetch("/AddInfo",{
            
            method:"put",
            headers:{
                "Content-type":"Application/json",
                "Accept":"Application/json"
            },credentials:"include",
            body:JSON.stringify({
                data
            })
        })
        const res= await addInfo.json()
        if(addInfo?.status===200){
            return res
        }
        else{
            return rejectWithValue(res)
        }
    }
    catch(e){
        console.log(e)
    }
})


export const postEditProfile=createAsyncThunk("userEdit/postEditProfile",async(data,{rejectWithValue})=>{
    try{
    const editProfile=await fetch("/EditProfile",{
        
        method:"Put",
        headers:{
            "Accepts":"application/json",
            "content-type":"Application/json" 
        },credentials:"include",body:JSON.stringify({
            data
        })
    }
    )
    const res=editProfile.json();
    if(editProfile?.status===200){
        return res
    }
    else{
        rejectWithValue(res)
    }}
    catch(e){
        console.log(e)
    }
})


export const editProfile=createSlice({
    name:"userEdit",
    initialState,
    reducers:{
      cleanState:(state,action)=>{
        state.message=""
        state.status="idle"
      },
      editClean:(state,action)=>{
        state.edit.message=""
        state.edit.status="idle"

      }
    },
    extraReducers(builder){
        builder.addCase(postAddInfo.pending,(state,action)=>{
            state.status="pending"
            state.message="sending user data"
        })
        .addCase(postAddInfo.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.message
        })
        .addCase(postAddInfo.rejected,(state,action)=>{
            state.status="rejected"
            state.message="some error occured"
        })
        .addCase(postEditProfile.pending,(state,action)=>{
            state.edit.status="pending"
        })
        .addCase(postEditProfile.fulfilled,(state,action)=>{
            state.edit.status="fulfilled"
            state.edit.message=action.payload
        })
        .addCase(postEditProfile.rejected,(state,action)=>{
            state.edit.status="rejected"
            state.edit.message=action.payload
        })
    }
})

export const {cleanState,editClean}=editProfile.actions

export default editProfile.reducer