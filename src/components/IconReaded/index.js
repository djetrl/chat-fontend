import classNames from 'classnames';
import PropsType from 'prop-types';
import readedSvg from '../../assets/img/readed.svg'
import noReadedSvg from '../../assets/img/noreaded.svg'
const IconReaded= ({isMe , isReaded }) =>(
  isMe && (isReaded ? 
                      (<img className='message__icon-readed' src={readedSvg} alt="readed icon" />) : 
                      (<img 
                        className='message__icon-readed message__icon-readed--no ' 
                        src={noReadedSvg} alt="noreaded icon" />
                        )))||null

IconReaded.prototype={
  isMe: PropsType.bool,
  isReaded:PropsType.bool
}
export default IconReaded;