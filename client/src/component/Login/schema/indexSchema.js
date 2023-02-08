import *as Yup from "yup"

export const schema=Yup.object().shape({
    password:Yup.string().required("enter new password"),
    confirmPassword:Yup.string().oneOf([Yup.ref("password"),null],"password must be same").required("enter new password")
})