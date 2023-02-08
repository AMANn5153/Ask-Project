
import Login from "./component/Login/Login"
import Registration from "./component/Registration/Registration"
import Question from './component/show_Question/Question';
import OpenQues from './component/show_Question/OpenQues';
import Welcome from './component/Welcome/Welcome';
import {BrowserRouter} from 'react-router-dom';
import { Route, Routes,} from 'react-router-dom';
import Logout from './component/Login/Logout';
import Ask from "./component/ASk/Ask";
import UserInfo from "./component/Account/UserInfo";
import PassChange from "./component/Login/PassChange";
import EnterPassChange from "./component/Login/EnterPassChange";

const Rout=()=>{
    return(
        <>
    <BrowserRouter>
        <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/Question" element={<Question/>}/>
                <Route  path='/Login' element={<Login/>}/>
                <Route  path='/Register' element={<Registration/>}/>
                <Route  path='/Logout' element={<Logout/>}/>
                <Route  path='/OpenQues' element={<OpenQues/>}/>    
                <Route  path='/Ask' element={<Ask/>}/>     
                <Route path="/UserInfo" element={<UserInfo/>}/>  
                <Route path="/Login/PasswordChange" element={<PassChange/>}/>   
                <Route path="/Login/EnterPassChange" element={<EnterPassChange/>}/>   
        </Routes>
    </BrowserRouter>
        </>
    )
}


const App=()=>{

    return(
        <>
        <Rout></Rout>
        </>
    )
}
export default App;