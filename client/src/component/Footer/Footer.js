import React from 'react';
import './Footer.css'
import { NavLink } from 'react-router-dom';


const Footer=(props)=>{
    return(
        <>
            <div className="footer-cards">
                <div className='footer-heading'>
                 <h3>{props.head}</h3>
                </div>
                <div className="footer-body">
                    
                     <NavLink exact className="active_class" to="/">{props.li1}</NavLink>   
                     <NavLink exact className="active_class" to="/">{props.li2}</NavLink> 
                     <NavLink exact className="active_class" to="/">{props.li3}</NavLink> 


                
                </div>
            </div>
        </>
    )
}
export default Footer;