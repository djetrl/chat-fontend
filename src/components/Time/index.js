import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from'date-fns/locale/ru';
import PropsType from 'prop-types';
const Time= ({date}) =>(
  formatDistanceToNow(new Date(date), {addSuffix:true, locale: ruLocale})
);
Time.PropsType={
  date: PropsType.string
}
export default Time;