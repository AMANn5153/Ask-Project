import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    
    status:"idle",
    error:"",
    message:""

}

export const postReply=createAsyncThunk("reply/postReply",async(data,{rejectWithValue})=>{
    const {commentId,message}=data
    try{
        const putReply=await fetch("/PostReply",{
           
            method:"put",
            headers:{
                "content-type":"application/json",
                "Accept":"application/json"
            },credentials:"include",
            body:JSON.stringify({
                commentId,message
            })
        })
        const result=await putReply.json();
        if(putReply.status===202){
            return result
        }else{
            return rejectWithValue(result)
        }
    }
    catch(e){
        console.log(e)
    }
})




export const Reply=createSlice({
    name:"reply",
    initialState,
    reducers:{
        cleanTheState:(state,action)=>{
            state.Reply=[];
            state.status=action.payload.status
        },
        cleanReplyState:(state,action)=>{
            state.status="idle"
            state.message=""
        }
    },
    extraReducers(builder){
        builder.addCase(postReply.pending,(state)=>{
            state.status="pending"
        })
        .addCase(postReply.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.message
        })
        .addCase(postReply.rejected,(state,action)=>{
            state.status="rejected"
            state.error=action.payload.message
        })
       
    }

})


export const {cleanTheState,cleanReplyState}=Reply.actions
export default Reply.reducer