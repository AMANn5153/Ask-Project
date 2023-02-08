import React,{useContext} from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import { storeData,storeCodeSnip,postQuestion,reset} from '../../feature/ASK/Ask'
import "./Preview.css"
import { previewCon } from './Ask'
import { toast, ToastContainer } from 'react-toastify'

const Preview = () => {
    const data=useContext(previewCon)
    const {text,askText,input}=data
    const dispatch=useDispatch()

    // dispatching the text to global state
    const handleChange=useCallback(()=>{dispatch(storeData({text,askText,input}))},[dispatch,text,askText,input])
    
    if(data?.triggerSubmit?.current===true)//dispatching the image to global state
    {
        const imageUrl=window.URL.createObjectURL(data.image)
        dispatch(storeCodeSnip(imageUrl))
        data.triggerSubmit.current=false
    }

    const stateAsk=useSelector(state=>state.ask)//accessing the state global

    const submitPost=()=>{// submitting all the the data by appending data to formData
        const formData=new FormData()
        // appending data in form data object
        formData.append("codeSnip",data.image)
        formData.append("title",stateAsk.title)
        formData.append("problem",stateAsk.questionDes)
        formData.append("problemExpec",stateAsk.questionExpec)
        dispatch(postQuestion(formData))
        data.setInput({...input,input:""})
        data.setAskText({...askText,askText:''})
        data.setText({...text,text:""})
    }


       // handling the the message after posting the  question
   
    if(stateAsk.status==="fulfilled"){
        toast(stateAsk.message,{
            pauseOnHover:true,
            theme:"light",
            position:"top-center"
        })
        dispatch(reset())
    }
    else if(stateAsk.status==="rejected"){
        toast(stateAsk.message,{
            pauseOnHover:true,
            theme:"light",
            position:"top-center"
        })
        dispatch(reset())
    }


  return (
    <>
        <Popup trigger={<button className="Ask-preview-btn" disabled={data?.disablingButton?false:true}>Preview</button>} onOpen={()=>{handleChange()}}  modal nested>
        {close=>(
            <div className='Ask-preview'>
            <button className="close-btn" onClick={close}>&times;</button>
                <div className="Ask-preview-title">
                    <h1>{stateAsk.title}</h1>
                </div>
                <div className='Ask-preview-problem'>
                    <p>{stateAsk.questionDes}</p>
                    {stateAsk.askImages?<img src={stateAsk.askImages} width="300px" height="300px"></img>:""}
                </div>
                <div className='Ask-preview-expec'>
                    <p>{stateAsk.questionExpec}</p>
                </div>
                <div className='Ask-preview-post'>
                <button className='ask-post-btn' onClick={submitPost}>Post</button>
                </div>
            </div>
        )}
        </Popup>
        <ToastContainer/>
    </>
  )
}

export default Preview