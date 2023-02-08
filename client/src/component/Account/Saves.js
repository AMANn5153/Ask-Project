import React from 'react'
import { comingSoon } from '../Extras/Darray'
import Animation from '../Extras/Animation'

const Saves = () => {
  return (
    <div
    style={{    
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100%"
    }}>
    {comingSoon.map((val)=>{return(
    <Animation name={val}/>)
     })}
    </div>
  )
}

export default Saves




