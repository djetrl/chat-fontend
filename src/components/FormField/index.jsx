import {Form, Input } from 'antd';
import { validateField } from '../../utils/helpers';

const FormField = ({name, placeholder ,Icon,handleChange,handleBlur,touched, errors,values,type })=>(
  <Form.Item
  validateStatus={validateField(name, touched,errors)}
  help={!touched[name] ? '':errors[name]}
   hasFeedback>
   <Input 
          placeholder={placeholder}  
          size='large' 
          prefix={<Icon className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />} 
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          id={name}
          type={type}/>
</Form.Item>
)

export default FormField;