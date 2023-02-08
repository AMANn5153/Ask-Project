import React from 'react'
import Animation from '../Extras/Animation';
import { ask } from '../Extras/Darray';
import { sendNewPassword,resetState } from '../../feature/Log_in_out/passwordChange';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate} from 'react-router';
import { useFormik } from 'formik';
import { schema } from './schema/indexSchema';

const NewPassword = () => {
    const dispatch=useDispatch()
    const passChangeState=useSelector(state=>state.passChange)
    const navigate =useNavigate;
    
    const query=new URLSearchParams(window.location.search)
 
    const token=query.get("token")
    const email=query.get("email")

    const initialValues={password:"",confirmPassword:""}    
    const {values,errors,handleSubmit,touched,handleChange,handleBlur}=useFormik(
        {
            initialValues:initialValues,
            validationSchema:schema,
            onSubmit:(values,action)=>{
             dispatch(sendNewPassword({token,email,password:values.password}))
             action.resetForm()
            }
        }
    )
    
    

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
            <form method="post" onSubmit={handleSubmit}>
                <div>
                <input placeholder="Password" name="password" autoComplete='off'
                value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                </div>
                {errors.password&&touched.password?<span style={{color:"red"}}>{errors.password}</span>:""}
                <div>
                <input placeholder="Confirm Password" name="confirmPassword" autoComplete='off'
                value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}/>
                </div>
               {errors.confirmPassword&&touched.confirmPassword?<span style={{color:"red"}}>{errors.confirmPassword}</span>:""}
                <div>
                    <button className='btn' type="submit">click me!</button>
                </div>
            </form>
            </div>
            <ToastContainer/>
        </>
    )
}

const EnterPassChange = () => {
    return (
      <div style={{
          width:"100%",
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
      <NewPassword/>
      </div>
    )
  }

export default EnterPassChange
