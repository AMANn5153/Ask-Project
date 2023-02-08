import React ,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { out } from '../../feature/Log_in_out/Login_out';
import { removeCookie } from 'react-cookie';

const Logout = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
   useEffect(()=>{
    fetch("/Logout",{
        method:"GET",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
    }).then((res)=>{
        dispatch(out({loginOrOut:false,status:"idle"}))//dispathing out action with payload to default value of initialstate
        navigate("/Login")//redirecting to /Login
    }).catch((e)=>{console.log(e)})
   })
  return (
    <>

    </>
  )
}

export default Logout