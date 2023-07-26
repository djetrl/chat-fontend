import {axios} from "../../core";


export default {
  signIn: (postData)=> axios.post("/user/signin", postData),
  signUp: (postData)=> axios.post("/user/signup", postData),
  VerifyHash: hash=> axios.get("/user/verify?hash=" + hash),
  getMe: ()=> axios.get("/user/me"),
  findUsers: query=> axios.get("/user/find?query=" + query),
  update: (postData)=> axios.patch("/user/me",postData)
}