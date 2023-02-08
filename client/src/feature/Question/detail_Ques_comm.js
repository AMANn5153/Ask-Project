import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const initialState={
    postDetails:[],
    status:"idle",
    codeSnip:""
}


// called from OpenQues components in Question folder of component folder
export const getCodeSnip=createAsyncThunk("Details/getCodeSnip",async(id,{rejectWithValue})=>{
    try{
        const res=await fetch("/getCodeSnip",{
            
            method:"post",
            headers:{
                "Accepts":"Application/Json",
                "Content-Type":"Application/Json"
            },credentials:"include",
            body:JSON.stringify({
                id
            })
        })
        if(res?.status===200){
        const result=await res.blob()//blob() returns blob constructor storing files data that with res in byte form
        const codeSnip_URL=URL.createObjectURL(result)//creating a url for blob object 
        return codeSnip_URL
        }
        else{
            return rejectWithValue(undefined)// if there is no codeSnip then just return undefined as rejectedValue
        }
    }
    catch(e){
        console.log(e)
    }
})

export const fetchDetails=createAsyncThunk("Details/fetchDetails",async(id)=>{
    try{
        const res=await fetch("/QuestionInfo",{
            
            method:"Post",
            headers:{
                "Content-type":"Application/json"
            },credentials:"include",
            body:JSON.stringify({
                id
            })
        })
        const result=await res.json()
        if(res.status===200){
            return result
        }     
    }
    catch(e){
        console.log(e)
    }
})

export const questionDetails=createSlice({
    name:"Details",
    initialState,
    reducers:{cleanUpState:(state,action)=>{
        state.codeSnip=""
    }
    },
    extraReducers(builder){
        builder.addCase(fetchDetails.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(fetchDetails.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.postDetails=action.payload
        })
        .addCase(fetchDetails.rejected,(state,action)=>{
            state.status="rejected"
        })
        .addCase(getCodeSnip.fulfilled,(state,action)=>{
            state.codeSnip=action.payload
        })
        .addCase(getCodeSnip.rejected,(state,action)=>{
            state.codeSnip=action.payload
        })
    }
})

export const {cleanUpState}=questionDetails.actions

export default questionDetails.reducer