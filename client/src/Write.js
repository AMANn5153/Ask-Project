import React from 'react'
import {FaBold,FaItalic,FaUndoAlt,FaRedoAlt} from 'react-icons/fa'
import {ImListNumbered} from 'react-icons/im'
import {MdAllInclusive, MdFormatListBulleted} from 'react-icons/md'
import {AiOutlineFontColors} from 'react-icons/ai'
import './Write.css'




const Write=()=>{
    return(
    <>
           
                <div  style={{width:"500px",
                    height:"250px",
                    display:"grid",
                    gridTemplateRows: "1fr 5fr",
                    border: "3px solid orange"}} >
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
                </div>
                <div className='write-div-bod'>
                    <textarea className='write-text' placeholder="Start writing the stuff from here" id="text" >

                    </textarea>
                </div>
            </div>
            <div className='btn-div-post'>
                <button className='post-btn'>POST</button>
            </div>
    </>)
}

export default Write;