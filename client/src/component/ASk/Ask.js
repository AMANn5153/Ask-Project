import React, {useState,createContext} from 'react'
import './Ask.css'
import {FaBold,FaItalic,FaUndoAlt,FaRedoAlt} from 'react-icons/fa'
import {ImListNumbered} from 'react-icons/im'
import {MdFormatListBulleted} from 'react-icons/md'
import {AiOutlineFontColors,AiOutlineFileImage} from 'react-icons/ai'
import NavBar from '../Navbar/Navbar'
import Preview from './Preview'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'



const QuesArea=(props)=>{
  const dispatch=useDispatch()

  const handleChangeText=(e)=>{
    let value=e.target.value
    props.setText({...props.text,text:value})
  }
  const handleChangeAsk=(e)=>{
    let value=e.target.value
    props.setAskText({...props.askText,askText:value})
  }

  const onChangeAsk=(e)=>{
    props.triggerSubmit.current=true
    props.setImage(e.target.files[0])
  }
    

  return(
    <>
       <div className="write-div-head">
                    <div className='btn-div'>
                    <button className='btn-write' title="bold"><FaBold/></button>
                    <button className='btn-write' title='italic'><FaItalic/></button>
                    <button className='btn-write' title='numbered list'><ImListNumbered/></button>
                    <button className='btn-write' title='bullet points'><MdFormatListBulleted/></button>
                    </div>
                    <div className='btn-div'>
                    <button className='btn-write' title='undo'><FaUndoAlt/></button>
                    <button className='btn-write' title='redo' data-toggle="tooltip" ><FaRedoAlt/></button>
                    </div>
                    <div className='btn-div'>
                    <button className='btn-write' title="outline"><AiOutlineFontColors/></button>
                    </div>
                    <div className='btn-div'>
                    <button className='btn-write'title="image"><AiOutlineFileImage/>
                    <input type="file" onChange={onChangeAsk}></input></button>
                    </div>
                </div>
                <div className='write-div-bod'>
                  <textarea className='write-text' placeholder="Start writing the stuff from here" 
                  name="text" onChange={props.switch==="false"?handleChangeAsk:handleChangeText}
                  value={props.switch==="false"?props.askText.askText:props.text.text}>
                  </textarea>
                </div>
    </>
  )
}
 export const previewCon=createContext()
const Ask= () => {
  
const [text,setText]=useState({text:""})
const [askText,setAskText]=useState({askText:""})
const [input,setInput]=useState({askInput:""})
const [image,setImage]=useState()
const triggerSubmit=useRef(false)


const handleChange=(e)=>{
let value=e.target.value
setInput({...input,askInput:value})
}

const disablingButton=text?.text&&askText?.askText&&input?.askInput
  return (
  <>
    <div className="ask">
      <div className="ask-navbar">
        <NavBar/>
      </div>
      <div className="ask-body">
        <div className='ask-body-title'>
          <h2>Title</h2>
          <input className="ask-input" placeholder="Enter The Title" onChange={handleChange} value={input.askInput} autoComplete='off'></input>
        </div>
        <div className="ask-body-text">
        <p style={{padding:"20px"}}>describe what is the problem that you are facing and if you have code snippet share </p>
          <QuesArea text={text} setText={setText} setImage={setImage} image={image} triggerSubmit={triggerSubmit} switch="true" />
        </div>
        <div className='ask-body-text1'>
        <p style={{margin:"5px",padding:"20px"}}>describe what result do you want </p>
          <QuesArea askText={askText} setAskText={setAskText} switch="false"/>
        </div>
        <previewCon.Provider value={{text,askText,input,disablingButton,image,triggerSubmit,
        setText,setAskText,setInput}}>
        <Preview/>
        </previewCon.Provider>
      </div>
      <div className="ask-footer">

      </div>
    </div>
  </>
  )
}

export default Ask