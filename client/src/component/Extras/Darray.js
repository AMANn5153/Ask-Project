import {FaFacebookSquare,FaInstagram,FaTwitter} from 'react-icons/fa';

const Darray=[
    {   key:1,
        head:"ASK",
        color:"#FA7605"
    },
    {   key:2,
        head:"WRITE",
        color:"#D47A2D"
    },
    {   key:3,
        head:"READ",
        color:"#E8A368 "
    }
]
const ask=["A","S","K"]
const comingSoon=["W","O","R","K","I","N","G"]
const footer=[
    {
        head:"social media",
        li1:<FaFacebookSquare size={25}/>,
        li2:<FaInstagram size={25} />,
        li3: <FaTwitter size={25}/>
    },
    {
        head:"Ask",
        li1:"About",
        li2:" Cantact US",
        li3:"Refernces"

     }
]

export default Darray;
export {ask,footer,comingSoon};