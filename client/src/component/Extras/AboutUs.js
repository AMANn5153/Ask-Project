import React from 'react';
import './AboutUs.css';


const AboutUs=(props)=>{
    return(
        <>
        <div className='AboutUs-div-styl' >
         <div className='head'>{props.head}</div>
         <div className='abus-con'>
            <div className='back'>
            <h2 >Explore and Ask your doubts.<br/><br/>
            Website is hub for seekers who wants to ask question <br/><br/>
            discuss the question and help others....
            </h2>
        </div>
        </div>
        </div>
        </>
    )

}
export default  AboutUs;