import React from 'react'
import NavBar from '../Navbar/Navbar'
import { useLocation } from 'react-router'
import Questionpost from './Questionpost'
import "./Question.css"
import "./OpenQues.css"
import { createContext,useEffect } from 'react'
import { cleanUpState, fetchDetails } from '../../feature/Question/detail_Ques_comm'
import { getCodeSnip } from '../../feature/Question/detail_Ques_comm'
import { PendingQuestion } from './Question'
import { useSelector,useDispatch } from 'react-redux'

export const locationCon=createContext()

const OpenQues=()=>{
  const dispatch=useDispatch()
  const location=useLocation();

  useEffect(() => {//getting all the comments for the question
    dispatch(fetchDetails(location.state.id))
    dispatch(getCodeSnip(location.state.id))
    return()=>{
      dispatch(cleanUpState())
    }
  }, [dispatch,location.state.id])

  const QuestionInfo=useSelector(state=>state.questionDetails)
  return(
    QuestionInfo.status!=="fulfilled"?<PendingQuestion/>:<RenderQuestion state={location.state}/>
    )
}


const RenderQuestion = (props) => {
  return (
    <div className='OpenQues'>
      <div className='OpenQues-nav'>
        <NavBar/>
      </div>
      <div className='OpenQues-body'>
        <div className='OpenQues-body-display'>
        <locationCon.Provider value={props}> 
        <Questionpost/>
        </locationCon.Provider>
        </div>
        <div className='OpenQues-body-news'>

        </div>
      </div>
      <div className=''></div>
    </div>
  )
}

export default OpenQues