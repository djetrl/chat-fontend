import {Form, Input } from 'antd';
import {MailOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {Button, Block} from '../../../components';
import { validateField } from '../../../utils/helpers';

const RecoveryForm = (props)=>{
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
        <h2>Восстановления доступа к аккаунту</h2>
        <p>Пожалуйста, введите свой E-Mail</p>
      </div>
      <Block>
      <Form
               className="recovery-form"
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
               <Form.Item>
                { isSubmitting && !isValid && <span>Ошибка</span>}
                 <Button  
                        disabled={isSubmitting} 
                        onClick={handleSubmit} 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button" 
                        size='large'>
                  Восстановить аккаунт
                 </Button>
               
               </Form.Item>
               <Link className='auth__register-link' to='/signin'>Вернуться </Link>
             </Form>
        </Block>
    </div>
  )
}

export default RecoveryForm;