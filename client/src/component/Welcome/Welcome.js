import React from 'react';
import './Welcome.css';
import Design from '../Extras/Design';
import Darray ,{footer,ask} from '../Extras/Darray';
import Animation from '../Extras/Animation';
import Heading from '../Extras/Heading';
import NavBar from '../Navbar/Navbar';
import AboutUs from '../Extras/AboutUs'; 
import Footer from '../Footer/Footer';


const Welcome=()=>{

    return(
        <>
            <div className="welcome-div-main-styl">
            <div className='animation-main-div'>
                <div className='nav-styl'>
                <NavBar/>
                </div>
                <div className="animation-Ask">
                {ask.map((val)=>{return(
                    <Animation name={val}/>)
                })}
                </div>        
            </div>
            <div className="cards-div-styl">
               <Heading name="Lets! Explore" />
                <div className='crd-div'>
                   {
                    Darray.map((val)=>{return(
                        <Design
                        key={val.key} 
                        head={<Heading name={val.head}/>}
                        color={val.color}
                        />)
                    })
                    } 
                </div>   
            </div>
            <div className="about-div-styl">
                <AboutUs head={<Heading name="About Us"/>}/>
            </div>
                    <div className='read-div'>
                   
                    </div>
                <div className='footer'>
                <div className='footer-content'>
                    {footer.map((val)=>{
                        return(
                            <Footer head={val.head}
                                li1={val.li1}
                                li2={val.li2}
                                li3={val.li3}
                            />
                        )
                    })}
                </div>
                    <div className='copy'>
                    <p> @2022AmanNegi</p>
                    </div>
                </div>
            
            </div>

        </>

    )
}
export default Welcome;