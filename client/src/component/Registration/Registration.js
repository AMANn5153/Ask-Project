import React, { useState } from 'react';
import NavBar from '../Navbar/Navbar';
import Heading from '../Extras/Heading';
import regisimg from './regisimg.svg'
import {ImUser} from "react-icons/im"
import {AiOutlineMail} from "react-icons/ai"
import { MdPassword} from "react-icons/md"
import {FaHouseUser} from "react-icons/fa"
import "./Registration.css"
import { Navigate, NavLink } from 'react-router-dom';
import  {useFormik} from "formik"
import { signUpSchema } from './Schema';
import { useDispatch, useSelector } from 'react-redux';
import { clean, register } from '../../feature/Log_in_out/registration';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration=()=>{
    const initialValues={username:"",email:"",password:""}
    const dispatch= useDispatch()
    const {values,errors,handleBlur,handleChange,touched,handleSubmit}=useFormik({
        initialValues,
        validationSchema:signUpSchema,
        onSubmit:(values,action)=>{
        dispatch(register(values))
        action.resetForm()
        }   
    })

    const stateRegis=useSelector(state=>state.regis)

    if(stateRegis.status==="fulfilled"){
        toast(stateRegis.message,{
            position:"top-center",
            pauseOnHover:false,
            theme:"light",
          })
          dispatch(clean())
          Navigate("/Login")
    }  else if(stateRegis.status==="rejected"){
        toast(stateRegis.error,{
            position:"top-center",
            pauseOnHover:false,
            theme:"light",
          })
          dispatch(clean())
    }

    return(
        <>
            <div className='regis-page'>
                <div className='nav-regis'>
                    <NavBar/>
                </div>
                <div className="regis-page-box">
                <div className='regis-box'>
                    <div className='form-group'>
                        <div className='form-grouhead'><Heading name="Sign Up"/></div>
                    
                        <div className='fields'>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className='fields-div'>
                              <p className="fields-p">UserName</p>
                                <ImUser/>
                                <input placeholder="UserName" name="username" autoComplete='off'
                                 value={values.username} onChange={handleChange} onBlur={handleBlur}
                                 / >
                               {errors.username&&touched.username?<p>{errors.username}</p>:""}
                            </div>
                        
                            <div className='fields-div'>
                             <p className="fields-p">E-MAIL</p>
                                <AiOutlineMail/>
                                <input placeholder="E-MAIL" name="email" autoComplete='off'  
                                value={values.email} onChange={handleChange} onBlur={handleBlur}
                                / >
                               {errors.email&&touched.email?<p>{errors.email}</p>:""}
                            </div>  
                            <div className='fields-div'>
                              <p className="fields-p">Password</p>
                                <MdPassword/>
                                <input placeholder="Password" name="password" autoComplete='off'
                                  value={values.password} onChange={handleChange} onBlur={handleBlur}
                                / >
                               {errors.password&&touched.password?<p>{errors.password}</p>:""}
                            </div>
                            <div className='fields-div'>
                           <button className='btn-regis' type='submit'>Sign Up</button>
                            </div>
                           </form>
                         </div>
                    </div>
                    <div className='img-svg'>
                        <img src={regisimg} alt="regisimg"/>
                        <NavLink exact className="img-regis-hover"  to="/Login"><FaHouseUser style={{position:"absolute",
                        bottom:"20%",
                        right:"40%",
                        color:"red",
                        boxShadow:"1px 1px 1px  rgb(197, 196, 196)",
                        border:"none"
                        }} size={25} /><span>already a user</span></NavLink>
                    </div>
                </div>
                
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}
export default Registration