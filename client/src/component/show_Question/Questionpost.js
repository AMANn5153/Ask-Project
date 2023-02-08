import React, { useState,useEffect,useContext } from 'react'
import { ToastContainer, toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommHead from './comment/CommHead'
import CommCon from './comment/CommCon'
import CommAns from './comment/CommAns'
import {FaBold,FaItalic,FaUndoAlt,FaRedoAlt} from 'react-icons/fa'
import {ImListNumbered} from 'react-icons/im'
import {MdFormatListBulleted} from 'react-icons/md'
import {AiOutlineFontColors} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {  fetchDetails } from '../../feature/Question/detail_Ques_comm'
import { commentPosted,sendComment} from '../../feature/Comments/comments'
import { locationCon } from './OpenQues';
import "./Write.css"



const MemoHead=React.memo(CommHead)
const MemoCon=React.memo(CommCon)
const MemoAns=React.memo(CommAns)



const Questionpost = () => {
  const loc=useContext(locationCon)
  const dispatch=useDispatch()
  const [showAnswer,setAnswer]=useState("")
  const commentStatus=useSelector(state=>state.comment)
  const fetchComment=useSelector(state=>state.questionDetails)
  const len=fetchComment.postDetails[0].Comment[0].comment.length
  const comment=fetchComment.postDetails[0].Comment[0].comment



 
  const answerChange=(e)=>{
    setAnswer(e.target.value)
  }

  const submitAnswer=(e)=>{// dispatch  to posting comment thunk
      dispatch(sendComment({comment:showAnswer,postId:loc.state.id,userId:loc.state.userId}))  
      setAnswer("") 
      dispatch(fetchDetails(loc.state.id))
  }

  if(commentStatus.status==="fulfilled"){
//handling the messages wether its failed or success ;
    toast("posted",{
      position:"top-center",
      autoClose:1000,
      transition:Flip
    })
      dispatch(commentPosted("idle"))//cleaning the state
  }

  


  return (
  <>
    <div style={{
      margin:"10px",
    }}>
      <MemoHead
      />
      <MemoCon
      />
      <h1 style={{fontWeight:"normal"}}>{len} {len>1?"Answers":"Answer"}</h1>
      {comment.map((val)=>{
        return(
        <MemoAns
          id={val._id}
          comment={val.comment}
          commenterId={val.commenterid}
          reply={val.reply}
          
        />)
      })}
    
    </div>
   
    <h1 style={{
      margin:"10px",
      fontWeight:"normal"
    }}>Your Answer :</h1>
    <div style={{padding:"15px"}}>
    <div  className="write-div-main">
                <div className="write-div-head">
                    <div className='btn-div'>
                    <button className='btn-write' title="bold"><FaBold/></button>
                    <button className='btn-write' title='italic'><FaItalic/></button>
                    <button className='btn-write' title='numbered list'><ImListNumbered/></button>
                    <button className='btn-write' title='bullet points'><MdFormatListBulleted/></button>
                    </div>
                    <div className='btn-div'>
                    <button className='btn-write' title='undo'><FaUndoAlt/></button>
                    <button className='btn-write' title='redo' data-toggle="tooltip" ><FaRedoAlt/></button>
                    </div>
                    <div className='btn-div'>
                    <button className='btn-write' title="outline"><AiOutlineFontColors/></button>
                    </div>
                </div>
                <div className='write-div-bod'>
                    <textarea className='write-text' placeholder="Start writing the stuff from here"  name="comment" value={showAnswer} 
                    onChange={answerChange} >
                    </textarea>
                </div>
            </div>
            <div className='btn-div-post'>
                <button className='post-btn' onClick={submitAnswer}>POST</button>
            </div>
    </div>
    <ToastContainer />
 </>
  )
}

export default Questionpost






















































