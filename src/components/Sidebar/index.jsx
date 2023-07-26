
import {TeamOutlined, FormOutlined,PlusOutlined ,MailOutlined ,UserOutlined,ArrowLeftOutlined,EditOutlined} from '@ant-design/icons';
import Avatar from '../Avatar';
import { Button,Modal , Select,Input,Form,Popover } from 'antd';
import { UploadField } from '../../utils/helpers';
import {Dialogs} from '../../containers';
import './Sidebar.scss'
const {Option} =Select;
const {TextArea} = Input;
const Sidebar = ({user,
                  users,
                  onCloseModalCreateDialog, 
                  onShowModalCreateDialog,
                  visibleModalCreateDialog,
                  onChangeInput,
                  inputValue,
                  onSearch,
                  onSelectUser,
                  isLoading, 
                  onModalOk, 
                  onChangeTextArea,
                  messageText,
                  selectedUserId,
                  visibleModalSettings,
                  onCloseModalSettings,
                  previewImage,
                  avatarSetting,
                  setPreviewImage,
                  onShowModalSettings,
                  visibleSettingsEdit,
                  toggleVisibleSettingsEdit,
                  nameInputSetting,
                  setNameInputeSetting,
                  emailInputSetting,
                  setEmailInputSetting,
                  onSelectFiles,
                  sendChangeProfile
                })=>{
  const options = users.map(user=>{
    return   <Option key={user._id}>{user.fullname}</Option>
  })
  return(
    <div className="chat__sidebar">
    <div className="chat__sidebar-header">
    { visibleModalSettings ? (
        <div >
        <ArrowLeftOutlined onClick={onCloseModalSettings} style={{'cursor':'pointer'}} />
        <span> Настройки</span>
    </div> ):(
        <div>
          <TeamOutlined />
          <span> Список диалогов</span>
        </div>
    )}
        <div style={{"display":'flex'}}>
        {visibleModalSettings ? <Button  onClick={toggleVisibleSettingsEdit} type='link' shape='circle' icon={<EditOutlined />}/>  :null}
        <Popover content={
        <div className='chat__sidebar-popover'> 
          <Button onClick={onShowModalCreateDialog}>Создать диалог</Button>
          <Button onClick={onShowModalSettings}>Настройки</Button>
         </div>
        
        } title={null} trigger={"click"}>
          <div>
           <Button  type='link' shape='circle' icon={<FormOutlined />}/> 
          </div>
        </Popover>
        </div>
    </div>

{visibleModalSettings ? (
    <div  className="chat__sidebar-setting chat__sidebar-setting--editing">
        {visibleSettingsEdit ? (
            <form  className="profile-form" onSubmit={sendChangeProfile}>
                      <UploadField
                          name="avatar"
                        onFiles={(file)=>{onSelectFiles(file)}}
                        containerProps={{
                          className: 'chat-input_actions-upload'
                        }}
                        uploadProps={{
                          accept: '.jpg,.jpeg,.png,.gif,.bmp',
                          multiple:'multiple'
                        }}>
                            <div className='bg-active'></div>
                          <Avatar user={avatarSetting && {fullname:nameInputSetting, avatar:avatarSetting, _id:user._id}}/>
                          <PlusOutlined/>
                      </UploadField >
                    <Input type="text" name='name' value={nameInputSetting}  onChange={(e)=>{setNameInputeSetting(e.target.value)}} placeholder='имя'/>
                    <Input type="email" name='email' value={emailInputSetting} onChange={(e)=>{setEmailInputSetting(e.target.value)}}  placeholder='почта' />
                  {
                  (nameInputSetting !== user.fullname) ||
                  (emailInputSetting !== user.email) ||
                  (avatarSetting[0].url !== user.avatar[0].url) ? 
                  <input type="submit" />:null
                  }
            </form>
          
        ):(
          <>
            <div className="avatar_wrapper" onClick={()=>{setPreviewImage(user.avatar)}}>
                <Avatar user={user}/>
            </div>

               <div className='chat__sidebar-setting-item'>
                  <UserOutlined />
                  <div className="chat__sidebar-setting-item-info">
                    <p>{user.fullname}</p>
                    <p>userName</p>
                  </div>
               </div >

               <div className='chat__sidebar-setting-item'>
                <MailOutlined />
                <div className="chat__sidebar-setting-item-info">
                  <p>{user.email}</p>
                  <p>email</p>
                </div>
               </div>
          </>
        ) }
    </div>
) :
    (   
    <div  className="chat__sidebar-dialogs">
      <Dialogs userId={user && user._id}/>
    </div>
    )
}
      <Modal open={!!previewImage} onCancel={() => setPreviewImage(null)} footer={null} className={'chat__sidebar-setting-modal-avatar'}>
        {  
          <img src={user? user.avatar[0].url :null} style={{ width: '100%' }} alt="Preview" />
        }
      </Modal>
      <Modal title="Создать диалог" 
              open={visibleModalCreateDialog} 
              onOk={onModalOk} 
              onCancel={onCloseModalCreateDialog} 
              footer={[
                <Button key='back' onClick={onCloseModalCreateDialog}>Закрыть</Button>,
                <Button disabled={!messageText } key='submit' loading={isLoading} onClick={onModalOk}>Создать</Button>
              ]}>
                <Form  className='add-dialog-form'>
                  <Form.Item label="Введите имя пользователяw или E-Mail">
                  <Select 
                        placeholder='Введите имя или почту пользователя'
                        value={inputValue}
                        onSearch={onSearch}
                        onChange={onChangeInput}
                        notFoundContent={null} 
                        onSelect={onSelectUser}
                        style={{width:'100%'}}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        showSearch>
                          {options}
                  </Select>
                  </Form.Item>

                  {selectedUserId && (<Form.Item label="Введите текст Сообщения">
                   <TextArea autoSize={{minRows:3, maxRows:10}} onChange={onChangeTextArea} value={messageText}/>
                  </Form.Item>)}
                </Form>
      </Modal>
  </div>
  )
}

Sidebar.defaultProps ={
  users:[]
}
export default Sidebar;