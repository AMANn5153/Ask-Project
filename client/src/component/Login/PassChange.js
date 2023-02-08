import React,{useState} from 'react'
import Animation from '../Extras/Animation';
import { ask } from '../Extras/Darray';
import { sendEmail,resetState } from '../../feature/Log_in_out/passwordChange';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const VerifyEmail=()=>{
    const [email,setEmail]=useState("");
    const dispatch=useDispatch()
    const passChangeState=useSelector(state=>state.passChange)
    const navigate =useNavigate;

    const change=(e)=>{
        setEmail(e.target.value);
    }
    const submit=()=>{
        dispatch(sendEmail(email))
        setEmail("")
        navigate("/Login")
    }

    if(passChangeState.status==="fulfilled"){
        toast(passChangeState.message,{
            position:"top-center",
            pauseOnHover:false,
            theme:"light", 
        }) 
        dispatch(resetState())
    }
    else if(passChangeState.status==="rejected"){
        toast(passChangeState.message,{
        position:"top-center",
        pauseOnHover:false,
        theme:"light",
        })
        dispatch(resetState())
    }

    return(
        <>
            <div style={{
                width:"40rem",
                height:"45%",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                boxShadow:"5px 0px 3px orange",
                borderRadius:"10px"
            }}>
                <div>
                    <input className='input' placeholder='Email' value={email} onChange={change} name="email" autoComplete="off"></input>
                </div>
                <div>
                    <button className='btn' onClick={submit}>click me!</button>
                </div>
            </div>
            <ToastContainer/>
        </>
    )

}


const PassChange = () => {
  return (
    <div style={{
        width:"!00%",
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    }}>
    <div style={{display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        margin:"15px"
        
        ,}}>  
      {ask.map((val)=>{
        return (
            <Animation name={val}/>
        )
      })}
    </div>
    <VerifyEmail/>
    </div>
  )
}

export default PassChange;