export default (text)=>{
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));

}