import * as Yup from "yup"

export const signUpSchema=Yup.object({
    username:Yup.string().min(2).max(25).required("please enter your name"),
    email:Yup.string().email().min(2).max(25).required("please enter your email"),
    password:Yup.string().min(6).required("please enter your password")
})