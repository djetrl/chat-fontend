import PropsType from 'prop-types';
import { Button as BaseButton } from "antd"
import classNames from 'classnames';

import './Button.scss';

const Button = (props)=>{
  return(
  <BaseButton 
      {...props} 
      className={classNames('button', props.className, {
        "button--large":props.size === 'large'
      })} />
  )
}
Button.prototype={
  className:PropsType.string
}
export default Button