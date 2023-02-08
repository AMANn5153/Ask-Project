import React, { useState,useContext} from 'react'
import Popup from "reactjs-popup"
import './UserInfo.css'
import "./Edit.css"
import { TabContent, TabNav } from './UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { postAddInfo,cleanState,postEditProfile,editClean} from '../../feature/UserInfo/EditProfile'
import { ToastContainer, toast } from 'react-toastify';
import {editCompCon} from "./UserInfo"



const AddInfo=()=>{
  const dispatch=useDispatch()
  const stateAddInfo=useSelector(state=>state.editProfile)// getting all the state values from the editProfile
  console.log(stateAddInfo)
  const [newInfo,setNewInfo]=useState({// local state to store all the values
    mobile:"",profession:"",college:"",company:""
  })

  let name,value

  const handleEditChanges=(e)=>{// chandleing the changes in input feilds
    name=e.target.name
    value=e.target.value
    setNewInfo({...newInfo,[name]:value})
  }
  const addInfoSub=(e)=>{// submitting the form data
    e.preventDefault();
    dispatch(postAddInfo(newInfo))// dispatching an action postAddInfo 
    setNewInfo({...newInfo,mobile:"",profession:"",college:"",company:""})// setting all the input to empty string
  }
  if(stateAddInfo.status==="pending"){// pending status of action waiting for the responnse from the backend
    toast(stateAddInfo.message,{
      position:'top-center',// alert by toast
      pauseOnHover:false,
      theme:"light"
    })
  }
  else if(stateAddInfo.status==="fulfilled"){
    toast(stateAddInfo.message,{
      position:'top-center',
      pauseOnHover:false,
      theme:"light"
    })
    dispatch(cleanState())
  }
  else if(stateAddInfo.status==="rejected"){
    toast(stateAddInfo.message,{
      position:'top-center',
      pauseOnHover:false,
      theme:"light"
    })
    dispatch(cleanState())
  }

  return(
    <>
        <form>
          <input autoComplete='off' placeholder="Mobile Number" name="mobile" value={newInfo.mobile} onChange={handleEditChanges}/>
          <input autoComplete='off' placeholder="profession" name="profession" value={newInfo.profession} onChange={handleEditChanges}/>
          <input autoComplete='off' placeholder="college" name="college" value={newInfo.college} onChange={handleEditChanges}/>
          <input autoComplete='off' placeholder="company" name="company" value={newInfo.company} onChange={handleEditChanges}/>
          <div className='editingProfile-btn'>
          <button className="btn" onClick={addInfoSub}>submit </button>
          </div>
        </form>    
      <ToastContainer/>
    </>
  )
}

const EditingProfile=()=>{
  const userInfo=useContext(editCompCon)
  const dispatch=useDispatch()
  const state=useSelector(state=>state.editProfile.edit)
  const [data,setData]=new useState({
    username:userInfo.username, email:userInfo.email,mobile:userInfo.mobile,profession:userInfo.profession,
    college:userInfo.college,company:userInfo.company
  })

  let name,value

  const handleChange=(e)=>{
    name=e.target.name
    value=e.target.value
    setData({...data,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(postEditProfile(data));
    setData({...data,username:userInfo.username,
      email:userInfo.email,mobile:userInfo.mobile,profession:userInfo.profession,
      college:userInfo.college,company:userInfo.company})
  }

  if(state.status==="pending"){
    toast(state.message,{
      position:"top-center",
      pauseOnHover:true,
      theme:"light"
    })
  }
  if(state.status==="fufilled"){
    toast(state.message,{
      position:"top-center",
      pauseOnHover:true,
      theme:"colored"
    })
    dispatch(editClean())
  }
  if(state.status==="rejected"){
    toast(state.message,{
      position:"top-center",
      pauseOnHover:true,
      theme:"dark"
    })
    dispatch(editClean())
  }

  return(
    <>
      <input placeholder={userInfo.username} name='username' autoComplete='off' onChange={handleChange} value={data.username}/>
      <input placeholder={userInfo.email} name='email'  autoComplete='off' onChange={handleChange} value={data.email}/>
      <input placeholder={userInfo?.mobile!=undefined?userInfo.mobile:"mobile No"} name='mobile'  autoComplete='off' onChange={handleChange} value={data.mobile}/>
      <input placeholder={userInfo?.profession!=undefined?userInfo.profession:"profession"} name='profession'  autoComplete='off' onChange={handleChange} value={data.profession}/>
      <input placeholder={userInfo?.college!=undefined?userInfo.college:"college"} name='college' autoComplete='off' onChange={handleChange} value={data.college}/>
      <input placeholder={userInfo?.company!=undefined?userInfo.company:"comapny"} name='company'  autoComplete='off' onChange={handleChange} value={data.company}/>
      <div className='editingProfile-btn'>
      <button className="btn" onClick={handleSubmit}>submit </button>
      </div>
    </>
  )
}

const Edit = () => {
  const userInfo=useContext(editCompCon)
  const [showActive,setActive]=useState("Edit")
  const tabsBool=userInfo.mobile===undefined||userInfo.profession===undefined||userInfo.college===undefined||userInfo.comapny===undefined
  console.log("tabBool",tabsBool)
  return (
    <>
    <div>
        <Popup trigger={<button className='userInfo-btn'>Edit Profile</button>}
        modal
        nested
        >
        {close=>(        
          <div className='modal'>
          <button className="close-btn" onClick={close}>&times;</button>
            <ul className='nav'>
            <TabNav title="Edit" showActive={showActive} setActive={setActive}/>
             {tabsBool?"":<TabNav title="Add Info" showActive={showActive} setActive={setActive}/>}
            </ul>
              <div style={{display:"flex",flexDirection:"column"}}>
              <TabContent title="Edit" showActive={showActive}><EditingProfile/></TabContent>
              <TabContent title="Add Info" showActive={showActive}><AddInfo/></TabContent>
              </div>            
          </div>)}
        </Popup>
    </div>
    </>
  )
}

export default Edit