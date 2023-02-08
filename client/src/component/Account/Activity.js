import React from 'react'
import "./Activity.css"
import {CChart} from "@coreui/react-chartjs"


const Activity = () => {
  return (
    <>
        <div className='activity'>
            <div className='activity-Likes'>
            <h2 style={{fontWeight:"normal",
                marginLeft:"10px"}}>Stats Of Likes</h2>
                <div>
                    <CChart/>
                </div>
            </div>
            <div className='activity-body'>
            <h2 style={{fontWeight:"normal",
                marginLeft:"10px"}}>Answered</h2>
            <div></div>
            <h2 style={{fontWeight:"normal",
                marginLeft:"10px"}}>Question</h2>
            <div></div>
            </div>
        </div>
    </>
  )
}

export default Activity