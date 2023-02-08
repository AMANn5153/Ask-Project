import React, {useState,useEffect,useRef, createContext } from 'react'
import "./UserInfo.css"
import NavBar from "../Navbar/Navbar"
import Profile from "./Profile"
import Activity from "./Activity"
import Saves from "./Saves"
import { useSelector, useDispatch } from 'react-redux'
import { accountFetchUser,clearTheInfo,profilePic,getProfilePic} from '../../feature/UserInfo/UserInfo'
import Edit from './Edit'
import Footer from '../Footer/Footer'



export const TabNav=(props)=>{
 
  const onActiveHandle=()=>{
    props.setActive(props.title)
  }
  return(
    <li onClick={onActiveHandle} className={props.showActive===props.title?"userInfo-active":" "}>{props.title}</li>
  )
}

export const TabContent=(props)=>{
  return(
    props.showActive===props.title?props.children:null
  )
}

export const editCompCon=createContext()


const UserInfo = () => {
  const dispatch=useDispatch()
  const [Active,setActive]=useState("profile");
  const [pic,setPic]=useState()
  const [info,setInfo]=useState({
    username:"",email:"",profilePic:"" ,about:"",post:[],mobile:"",profession:"",company:"",college:""
  })
  const stateInfo =useSelector(state=>state.UserInfo.accountUserInfo)

  useEffect(() => {// fethcing all the information of user 
    dispatch(accountFetchUser())
    dispatch(getProfilePic())                                         
  }, [dispatch])
  
  useEffect(() => {
    if(stateInfo[0].status==="fulfilled"){
      setInfo({...info,username:stateInfo[1].username,email:stateInfo[1].email,
        profilePic:stateInfo[0].proPicURL,about:stateInfo[1]?.About,post:stateInfo[1].Post,mobile:stateInfo[1]?.mobile,
         profession:stateInfo[1]?.profession,company:stateInfo[1]?.company,college:stateInfo[1]?.college
      })
      dispatch(clearTheInfo())
    }
  }, [dispatch,info,stateInfo])
  
   
  const triggerSubmit = useRef(false)//it is a refernce to trigger the submiation of profile picture that is uploaded

  const handleTheChange=(e)=>{/// hadeling the the pic by turning the triggersubmit to true 
    triggerSubmit.current=true;
    setPic(e.target.files[0])   
  }

 // checking if triggersubmit  is true,then dispatching the action with payload as formdata object 
    if(triggerSubmit.current===true){
      const formData=new FormData()// creating a object of FormData object 
      formData.append("pic",pic)
      dispatch(profilePic(formData))
      triggerSubmit.current=false
    }
  

  return (
    <>
    <div className='account-page'>
        <div className='account-navbar'>
          <NavBar/>
        </div>
        <div className='account-body-layout'>
        <div className='account-body-header'>
        <div className='account-body-image'>
          <div className='account-image-div' >
              <img src={info.profilePic} width="150px" height="150px" alt="pic"/>
          </div>
          <div ><button className='userInfo-btn'>upload<input type="file" onChange={handleTheChange}></input></button></div>
        </div>
            <div className='account-body-info'>
              <i className='account-heading'>{info.username}</i><br/><br/>
              <i className='account-heading'>{info.email}</i><br/><br/>
              <i className='account-heading'>{info.about}</i><br/><br/>
              <p></p>
            </div>
            <div className='account-body-button'>
            <editCompCon.Provider value={info}>
            <Edit />   
            </editCompCon.Provider>    
            </div>
        </div>
        <div className='account-body'>
        <div className='account-body-tabs '>
        <ul className='nav'>
          <TabNav title="profile" showActive={Active} setActive={setActive}/>
          <TabNav title="activity" showActive={Active} setActive={setActive}/>
          <TabNav title="saves" showActive={Active} setActive={setActive}/>
        </ul>
          <div>
            <TabContent title="profile" showActive={Active}><Profile info={info}/></TabContent>
            <TabContent title="activity" showActive={Active}><Activity/></TabContent>            
            <TabContent title="saves" showActive={Active}><Saves/></TabContent>            
          </div>
        </div>
        </div>
        </div>
        <div className="account-footer">
          <h1><Footer/></h1>
        </div>
    </div>
        
    </>
  )
}

export default UserInfo