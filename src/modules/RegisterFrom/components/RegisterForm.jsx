import {Form } from 'antd';
import { LockOutlined, UserOutlined,MailOutlined ,InfoCircleTwoTone  } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {Button, Block,FormField} from '../../../components';


const success = false;
const RegisterForm = (props)=>{

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
        <h2>Регистрация</h2>
        <p>Для входа в чат, вам нужно Зарегистрироваться</p>
      </div>
      <Block>
         {!success ? (
            <Form
               className="login-form"
               onSubmit={handleSubmit}>
              <FormField name='email'  
                         touched={touched} 
                         errors={errors}  
                         Icon={MailOutlined} 
                         placeholder="E-Mail"
                         handleChange={handleChange} 
                         handleBlur={handleBlur}
                         values={values}/>

              <FormField name='fullname'  
                         touched={touched} 
                         errors={errors}  
                         Icon={UserOutlined} 
                         placeholder="Ваше имя и фамилия"
                         handleChange={handleChange} 
                         handleBlur={handleBlur}
                         values={values}/>

              <FormField name='password'  
                         touched={touched} 
                         errors={errors}  
                         type='password'
                         Icon={LockOutlined} 
                         placeholder="Пароль"
                         handleChange={handleChange} 
                         handleBlur={handleBlur}
                         values={values}/>    

              <FormField name='password_2'  
                         touched={touched} 
                         errors={errors}  
                         type='password'
                         Icon={LockOutlined} 
                         placeholder="Повторите пароль"
                         handleChange={handleChange} 
                         handleBlur={handleBlur}
                         values={values}/>                         
               <Form.Item>
                { isSubmitting && !isValid && <span>Ошибка</span>}
                 <Button  
                        disabled={isSubmitting} 
                        onClick={handleSubmit} 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button" 
                        size='large'>
                  Зарегистрироваться
                 </Button>
               
               </Form.Item>
               <Link className='auth__register-link' to='/signin'>Войти в аккаунт</Link>
             </Form>
         ):(
         <div className='auth_success-block'>
            <InfoCircleTwoTone  width='50px'/>
            <h2>Подтвердите свой аккаунт</h2>
            <p>На Вашу почту отправленно письмо с ссылкой на подтверждение аккаунта</p>
         </div>
         )}
        </Block>
    </div>
  )
}

export default RegisterForm ;