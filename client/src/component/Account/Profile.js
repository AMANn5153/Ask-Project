import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { accountUpdates,getStats } from '../../feature/UserInfo/UserInfo';
import {AiOutlineDelete,AiOutlineEdit} from "react-icons/ai"
import { delQues } from '../../feature/UserInfo/UserInfo';
import  "./Profile.css";

const style={
  txt:{
    ouline:"none",
    resize:"none",
    width:"100%",
    height:"50%",
    border:"none",
    padding:"10px",
    fontSize:"large",
    margin:"3px",
    textTransform:"capitalize",
  },
  about:{
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  padding:"10px"
  },
  msg:{
    padding:"10px"
  },
  btn:{
    border:"none",
    margin:"5px",
    cursor:"pointer",
    backgroundColor:"White"
  }
}
const About=()=>{
  const [showAbout,setAbout]=useState("")
  const dispatch=useDispatch()

  const handleChange=(e)=>{
    setAbout(e.target.value)
  }
  
  const submitAbout=()=>{
    dispatch(accountUpdates(showAbout))
    setAbout("")
  }

  return(
    <>
      <p>write about your self what are your interests and what kind of work you do</p>
      <textarea style={style.txt} onChange={handleChange} name="about" value={showAbout} >
        </textarea>
        <button style={style.btn} onClick={submitAbout}>Post</button>
    </>
  )

}

const AboutMessage=(props)=>{
  return(
      <p>{props.msg}</p>
  )
}

const Profile = (props) => {
  const {info}=props
  const stats=useSelector(state=>state.UserInfo.stats)  
  const dispatch=useDispatch()
 

  useEffect(() => {
    dispatch(getStats())
  }, [dispatch])
  
  //deleting the post 
  const delPost=(quesId)=>{
    dispatch(delQues(quesId))
  }

  return (
    <>
        <div className='profile'>
            <div className='profile-stats'>
                <h1 style={{fontWeight:"normal"}}>Stats</h1>
                <div className='stats'>
                  <div><h1 style={{fontWeight:"normal"}}>{stats.Likes}</h1><h3>Likes</h3></div>  
                   <div><h1 style={{fontWeight:"normal"}}>{stats.answer}</h1><h3>answer</h3></div> 
                   <div><h1 style={{fontWeight:"normal"}}>{stats.question}</h1><h3>question</h3></div> 
                </div>
            </div>
            <div className='profile-about-post'>
                <h1>About</h1>
                <div style={info?.about===""?style.about:style.msg}>
                  {info?.about===""||info?.about===undefined?<About />:<AboutMessage msg={info.about}/>}
                </div>
                <h1>Posts</h1>
                <div className='profile-post'>
                 {info.post.map((val)=>{
                  return(
                    <div className="profile-post-crud">
                      <h2>
                        {val.title}
                      </h2>
                      <div>
                      <button style={style.btn} onClick={()=>delPost(val._id)}>
                        <AiOutlineDelete/>
                      </button>
                      <button style={style.btn}>
                        <AiOutlineEdit/>
                      </button>
                      </div>
                    </div>
                  )
                 })}
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile