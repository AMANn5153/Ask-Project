import React from 'react'
import Animation from './Animation';
import { ask} from './Darray';
import './hum.css'

const Loading = () => {
  return (
    <>
        <div className='Hum-div-styl'>
        <div
        style={{display:"flex",
                justifyContent:"center",
                alignItems:"center"
        }}
        >
            {ask.map((val,index)=>{
                return(
                    <Animation
                        name={val}
                        key={index}
                    />
                )
            })}
        </div>
        </div>
    </>
  )
}

export default Loading