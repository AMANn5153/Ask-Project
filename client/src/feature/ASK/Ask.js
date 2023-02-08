import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    status:"idle",
    message:"",
    title:"",
    questionDes:"",
    questionExpec:"",
    askImages:""
}

export const ask=createSlice({
    name:"Ask",
    initialState,
    reducers:{
        storeData:(state,action)=>{
            state.title=action.payload.input.askInput
            state.questionDes=action.payload.text.text
            state.questionExpec=action.payload.askText.askText
        },
        storeCodeSnip:(state,action)=>{
            state.askImages=action.payload
        },
        reset:(state,action)=>{
            state.status="idle"
            state.message=""
        }
    },
    extraReducers(builder){
        builder.addCase(postQuestion.pending,(state,action)=>{
            state.status="pending"
            state.message="posting..."
        })
        .addCase(postQuestion.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.message
        })
        .addCase(postQuestion.rejected,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.error
        })

    }
})


export const postQuestion=createAsyncThunk("Ask/postQuestion",async(data)=>{
 
    try{
       const res = await  fetch("/Ask",{
        method:"Post",
        credentials:"include",
        body:data
       })
       const result=await res.json()
    }
    catch(e){
        console.log(e)
    }
})



export const {storeData,storeCodeSnip,reset}=ask.actions
export default ask.reducer
