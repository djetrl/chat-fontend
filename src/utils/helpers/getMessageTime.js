import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
export default  createdAt =>{
  if(isToday(new Date(createdAt))){
    return format(
      new Date(createdAt),
      "HH:mm"
    )
  }else{
    return format(
      new Date(createdAt),
      "dd.MM.yyyy HH:mm "
    )
  }}