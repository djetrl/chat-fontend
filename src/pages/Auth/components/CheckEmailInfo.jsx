import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";

import { Block } from "../../../components";
import { userApi } from "../../../utils/api";
const renderTextInfo =(hash, verified)=>{
  if(hash){
    if(verified){
      return {
        status:'success',
        message:'Аккаунт успешно подтвержден!'
      }
    }else{
      return{
        status:'error',
        message:'Ошибка при подтверждении аккаунта'
      } 
    }
  }else{
    return{
      status:'success',
      message:'Ссылка с подтверждением аккаунта отправленна на E-Mail.'
    }  
  }
}

const CheckEmailInfo = ({location,navigate})=>{
  const [verified, setVerified ] = useState();
  const  hash = location.search.split('hash=')[1]; 
  const info = renderTextInfo(hash, verified);
  useEffect(()=>{
    if(hash){
      userApi.VerifyHash(hash).then(({data})=>{
        if(data.status === 'success'){
          setVerified(true)
        }
      }).catch(()=>{})
    }
  },[])
  return (
    <Block>
          <Result
                status={info.status}
                title={info.status === 'success'?'Готово!':'Ошибка'}
                subTitle={
                 info.message
                }
                extra={
                  info.status === 'success' && verified? <Button type="primary" onClick={()=>{navigate('/signin')}}>Войти</Button>: null
                }/>
    </Block>
  )
}

export default CheckEmailInfo;