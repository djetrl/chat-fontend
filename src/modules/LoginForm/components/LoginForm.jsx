import {Form, Input } from 'antd';
import { LockOutlined,MailOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {Button, Block} from '../../../components';
import { validateField } from '../../../utils/helpers';

const LoginForm = (props)=>{
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting
  } = props;
  return(     
    <div>
       <div className="auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>
      <Block>
      <Form
               className="login-form"
               onSubmit={handleSubmit}>
              <Form.Item
                 validateStatus={
                  validateField('email', touched,errors)
                }
                help={!touched.email ? '':errors.email}
                 hasFeedback>
                 <Input 
                        placeholder="E-Mail"  
                        size='large' 
                        prefix={<MailOutlined className="site-form-item-icon"/>} 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id='email'/>
               </Form.Item>
               <Form.Item
                    validateStatus={
                      validateField('password', touched,errors)
                    }
                    help={!touched.password ? '':errors.password}
                     hasFeedback>
                 <Input
                   type="password"
                   id='password'
                   placeholder="Пароль"
                   size='large'
                   value={values.password}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   prefix={<LockOutlined className="site-form-item-icon" />}
 
                 />
               </Form.Item>
               <Form.Item>
                { isSubmitting && !isValid && <span>Ошибка</span>}
                 <Button  
                        disabled={isSubmitting} 
                        onClick={handleSubmit} 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button" 
                        size='large'>
                  Войти в аккаунт
                 </Button>
               
               </Form.Item>
               <Link className='auth__register-link' to='/signup'>Зарегистрироваться </Link>
             </Form>
        </Block>
    </div>
  )
}

export default LoginForm;