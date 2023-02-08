import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";



const initialState={
    post:[],
    Status:"idle",
    error:"",
    Like:{
      error:false,
      status:"idle",
      message:"",
      Likes:[]
    }

}





export const dataFetch=createAsyncThunk("question/dataFetch",async(rejectWithValue)=>{
    try{
     const res=await fetch("/Question",{
      
     method:"GET",
     headers:{
       "Accept":"application/json",
       "Content-type":"application/json"
     },credentials:"include"
   })
   const result= await res.json()
   if(res.status===202){
     return result
   }
   else{
    return rejectWithValue(result)
   }
  }
   catch(e){
      console.log(e)
     }
 }
    
)

export const getLikes=createAsyncThunk("question/getLikes",async(data,{rejectWithValue})=>{
  try{
    const getLikeApi=await fetch("/getLikes",{
      
      method:"Post",
      headers:{
        "Accept":"application/json",
        "Content-type":"application/json"
      },credentials:"include",
      body:JSON.stringify({
        data
      })      
    })
    const result=await getLikeApi.json();
    if(result){
      return result
    }
    else{
      return rejectWithValue(result)
    }
  }
  catch(e)
  {
    console.log(e)
  }
})



export const Post=createAsyncThunk("question/Post",async (like,{rejectWithValue})=>{
  const {userId,postId}=like
  console.log(like)
  try{
   const res=await fetch("/PostLike",{
    
   method:"Post",
   headers:{
     "Accept":"application/json",
     "Content-type":"application/json"
   },credentials:"include",
   body:JSON.stringify({
       userId,postId
   })
 })
 const result= await res.json()
 if(res.status===200){
   return result
 }
 else {
   return rejectWithValue(result)
 }
}
 catch(e){
    console.log(e)
   }
}
  
)



export const Question=createSlice({
    name:"question",
    initialState,
    reducers:{
    postedLike:(state,action)=>{
      state.Like.status=action.payload.status

    },
    reDeclareError:(state,action)=>{
      state.Like.status=action.payload.status
      state.Like.message=action.payload.message
      state.Like.error=action.payload.error

    }
    },
    extraReducers(builder){
        builder.addCase(dataFetch.pending,(state)=>{
            state.Status="pending"
        })
        .addCase(dataFetch.fulfilled,(state,action)=>{
            state.Status="succeded"
            state.post=state.post.concat(action.payload)
        })
        .addCase(dataFetch.rejected,(state,action)=>{
          state.Status="reject"
          state.error=action.payload
        })
        .addCase(Post.pending,(state)=>{
          state.Like.status="pending"
        })
        .addCase(Post.fulfilled,(state,action)=>{
            state.Like.status="fulfilled"
            state.message=action.payload
            }
        )  
        .addCase(Post.rejected,(state,action)=>{
          state.Like.status="rejected"
          state.Like.message=action.payload.error
        })
        .addCase(getLikes.fulfilled,(state,action)=>{
          state.status="fulfilled"
          if(action.payload.length!==0){//if there is no Likes
          state.Like.Likes=action.payload[0].Post[0].Likes
          }
        })
        .addCase(getLikes.rejected,(state,action)=>{
          state.status="rejected"
          state.message=action.payload.error
        })
    }
})

export const {postedLike,reDeclareError}=Question.actions;
export default Question.reducer;
