import { configureStore } from "@reduxjs/toolkit";
import Question from "../feature/Question/Question"
import Comment from "../feature/Comments/comments"
import UserInfo from "../feature/UserInfo/UserInfo";
import Login from "../feature/Log_in_out/Login_out";
import Reply from "../feature/Reply/Reply";
import editProfile  from "../feature/UserInfo/EditProfile";
import ask from "../feature/ASK/Ask";
import  questionDetails  from "../feature/Question/detail_Ques_comm";
import regis  from "../feature/Log_in_out/registration";
import passChange from "../feature/Log_in_out/passwordChange";

export const Store=configureStore({
    reducer:{
        question:Question,
        comment:Comment,
        UserInfo:UserInfo,
        Login,
        Reply,
        editProfile,
        ask,
        questionDetails,
        regis,
        passChange
    }
})

