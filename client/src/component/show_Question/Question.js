import './Question.css'
import Navbar from '../Navbar/Navbar';
import QuesPage from './QuesPage';
import { useSelector,useDispatch } from 'react-redux'
import { dataFetch } from '../../feature/Question/Question';
import { useEffect } from 'react';
import Loading from '../Extras/Loading';


const FulFilledQuestion=({data})=>{
  return(
    <>
       <div className='Question'>
            <div className='question-nav'>
            <Navbar/>
            </div>
            <div className='question-body'>
            <div className='heading-ques'><h1>Question</h1></div>
            {data.map((val,index)=>{
               return(
                      <QuesPage 
                      key={index}
                      username={val.username}
                      id={val._id}
                      heading={val.title}
                      content={val.problem}
                      userId={val.userId}
                      date={val.date}
                   />
              )   
        })}
            </div>

        </div>
    </>

  )
}

export const PendingQuestion=()=>{
  return(
   <Loading/>
  )
}


const Question = () => {
   const dispatch=useDispatch()
   const stateData = useSelector(state=>state.question)

   useEffect(() => {
    if(stateData.post.length===0){
    dispatch(dataFetch())
  }
 },[])

  return (
    <>
       {stateData.Status==="pending"?<PendingQuestion/>:<FulFilledQuestion data={stateData.post}/>}
    </>
  )
}

export default Question