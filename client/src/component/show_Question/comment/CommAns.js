import React,{useEffect, useMemo, useState} from 'react'
import "./comment.css"
import CommRep from './CommRep'
import  { fetchUser } from '../../../feature/UserInfo/UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { postReply,cleanReplyState} from '../../../feature/Reply/Reply'
import {  fetchDetails } from '../../../feature/Question/detail_Ques_comm'
import { toast,} from 'react-toastify'
import { useContext } from 'react'
import { locationCon } from '../OpenQues'


const CommAns = (props) => {
  const loc =useContext(locationCon)
  const [showReply,setReply]=useState({Reply:""})
  const [showLike,setLike]=useState(0)
  const dispatch=useDispatch()

  const user=useSelector((state)=>state.UserInfo)
  const replyState=useSelector((state=>state.Reply))
 

  useMemo(() => {
    dispatch(fetchUser({id:props.commenterId}))
  }, [dispatch,props.commenterId])

  
  
  const replyHandler=(e)=>{
    let value=e.target.value
    setReply({...showReply,Reply:value})
  }

  const submitReply=()=>{
    dispatch(postReply({commentId:props.id,message:showReply}))
    setReply({...showReply,Reply:""})
    dispatch(fetchDetails(loc.state.id))
  }

  const postLike=()=>{
    setLike(setLike+1)
    dispatch(postLike(showLike))
  }

  
 
  if(replyState.status==="fulfilled"){
    dispatch(cleanReplyState())
    toast(replyState.message,{
      pauseOnHover:true,
      theme:"light",
      autoClose:1000,
      position:"top-center"
    })
  }
  else if(replyState.status==="rejected"){
    toast(replyState.message,{
      pauseOnHover:true,
      theme:"light",
      autoClose:1000,
      position:"top-center"
    })
    dispatch(cleanReplyState())
  }

  return (<>
    <div className='CommAns-styl'>
      <div className="Answer">
        <h1></h1>
      </div>
      <div className='commans-content-styl'>
        <p>
        {props.comment}
        </p>
      </div>
      <div className='footer-commans'>
        <div className='timing'>
          <p></p>
        </div>
        <div  className="ans-like">
          {/* <button className='like-btn' onClick={postLike}><AiOutlineLike size={20}/></button> */}
        </div>
        <div className='comment-profile'>
          <i>posted by:-{user.userinfo}</i>
        </div>
      </div>
      <CommRep data={props.reply}/>
      <input className='comment-input' autoComplete='off' placeholder='comment' name="reply" value={showReply.Reply} onChange={replyHandler}/>
      <button className="reply-btn" onClick={submitReply} disabled={showLike?true:false}>reply</button>
    </div>
    </>
  )
}

export default CommAns