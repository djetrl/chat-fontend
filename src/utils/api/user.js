import {axios} from "../../core";


export default {
  signIn: (postData)=> axios.post("/user/signin", postData),
  signUp: (postData)=> axios.post("/user/signup", postData),
  VerifyHash: hash=> axios.get("/user/verify?hash=" + hash),
  getMe: ()=> axios.get("/user/me"),
  deleteMe: ()=> axios.delete("/user/me"),
  findUsers: query=> axios.get("/user/find?query=" + query),
  recoverPassword:query=> axios.patch("/user/recover?query=" + query),
  update: (postData)=> axios.patch("/user/me",postData),
  updatePassword: (postData)=> axios.patch("/user/passwordChange",postData),
  passwordVerification: (postData)=> axios.post("/user/passwordVerification",postData),
  updateToken:  (token) => axios.post("/refresh-tokens", {refreshToken:token})
}