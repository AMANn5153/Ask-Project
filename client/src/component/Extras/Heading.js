import React from 'react';
import './Heading.css';

const Heading=(props)=>{
    return(
        <div className='heading-card'>
            <h1>
                {props.name}
            </h1>
        </div>
    )
}

export default Heading;