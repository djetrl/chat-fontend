import { translateApi } from "../api"

export default (text, lang)=>{
   return translateApi.translate({text:text,lang:lang})
}