
import { TeamOutlined, FormOutlined, PlusOutlined, MailOutlined, UserOutlined, ArrowLeftOutlined, EditOutlined, FileOutlined } from '@ant-design/icons';
import Avatar from '../Avatar';
import { Button, Modal, Select, Input, Form, Popover, Image } from 'antd';
import { UploadFiles } from '..'
import { UploadField } from '../../utils/helpers';
import { Dialogs } from '../../containers';
import './Sidebar.scss'
const { Option } = Select;
const { TextArea } = Input;
const Sidebar = ({ user,
  users,
  lang,
  onCloseModalCreateDialog,
  onShowModalCreateDialog,
  visibleModalCreateDialog,
  onChangeInput,
  inputValue,
  contryData,
  onSearch,
  isLoading,
  onSelectLang,
  nameGroup,
  setNameGroup,
  onRemoveAvatarDialog,
  onSelectUser,
  onModalOk,
  onChangeTextArea,
  messageText,
  selectedUserId,
  visibleSettings,
  onCloseSettings,
  avatarSetting,
  onShowSettings,
  visibleSettingsEdit,
  toggleVisibleSettingsEdit,
  nameInputSetting,
  setNameInputeSetting,
  emailInputSetting,
  setEmailInputSetting,
  onSelectFiles,
  sendChangeProfile,
  onSelectTheme,
  theme,
  onSelectAvatarDialog,
  avatarDialog,
  setPasswordOld,
  passwordOld,
  passwordNew,
  setPasswordNew,
  passwordOldVerify,
  passwordVerificationFunc,
  closeAccount,
  onDeleteAccount
}) => {
  const options = users.map(user => {
    return <Option key={user._id}>{user.fullname}</Option>
  })



  return (
    <div className="chat__sidebar">
      <div className="chat__sidebar-header">
        {visibleSettings ? (
          <div >
            <Button onClick={onCloseSettings} type='link' shape='circle' icon={<ArrowLeftOutlined />} />
            <span> Настройки</span>
          </div>) : (
          <div>
            <TeamOutlined />
            <span> Список диалогов</span>
          </div>
        )}
        <div style={{ "display": 'flex' }}>
          {visibleSettings ? <Button onClick={toggleVisibleSettingsEdit} type='link' shape='circle' icon={<EditOutlined />} /> : null}
          <Popover content={
            <div className='chat__sidebar-popover'>
              <Button onClick={onShowModalCreateDialog}>Создать диалог</Button>
              <Button onClick={onShowSettings}>Настройки</Button>
              <Button onClick={closeAccount}>Выйти с аккаунта</Button>
            </div>

          } title={null} trigger={"click"}>
            <div>
              <Button type='link' shape='circle' icon={<FormOutlined />} />
            </div>
          </Popover>
        </div>
      </div>

      {visibleSettings ? (
        <>
          {visibleSettingsEdit ? (
            <div className="chat__sidebar-setting chat__sidebar-setting--editing">
              <form className="profile-form" onSubmit={sendChangeProfile}>
                <UploadField
                  name="avatar"
                  onFiles={(file) => { onSelectFiles(file) }}
                  containerProps={{
                    className: 'chat-input_actions-upload'
                  }}
                  uploadProps={{
                    accept: '.jpg,.jpeg,.png,.gif,.bmp',
                    multiple: 'multiple'
                  }}>
                  <div className='bg-active'></div>
                  <Avatar user={avatarSetting ? { fullname: nameInputSetting, avatar: avatarSetting, _id: user._id } : user} />
                  <PlusOutlined />
                </UploadField >
                <div className="input-info-container">
                  <Input type="text" name='name' value={nameInputSetting} onChange={(e) => { setNameInputeSetting(e.target.value) }} placeholder='имя' />
                  <Input type="email" name='email' value={emailInputSetting} onChange={(e) => { setEmailInputSetting(e.target.value) }} placeholder='почта' />
                </div>
                {
                  (nameInputSetting.trim() !== user.fullname.trim()) ||
                    (emailInputSetting.trim() !== user.email.trim()) ||
                    (user.avatar.length >= 1 ? (avatarSetting[0].url !== user.avatar[0].url) : avatarSetting.length === 1) ?
                    <input type="submit" className='btn-setting-submit ' value={"✓"} disabled={isLoading} /> : null
                }
              </form>
              <form className="profile-form" onSubmit={passwordVerificationFunc}>
                <div className="input-info-container" style={{ 'width': '100%' }}>
                  <h3>Смена пароля</h3>
                  <Input type="password" name='passwordOld' value={passwordOld} onChange={(e) => { setPasswordOld(e.target.value) }} placeholder='старый пароль' />
                  {passwordOldVerify && <Input type="password" name='passwordNew' value={passwordNew} onChange={(e) => { setPasswordNew(e.target.value) }} placeholder='новый пароль' />}
                </div>
                {passwordOld || passwordNew ? (<input type="submit" className='btn-setting-submit ' value={"✓"} disabled={isLoading} />) : null}
              </form>
              <form className="profile-form" >
                <Button onClick={onDeleteAccount} type='primary' danger className='deleteBtn'>Удалить аккаунта</Button>
              </form>
            </div>
          ) : (
            <div className="chat__sidebar-setting ">
              <div className="chat__sidebar-setting-chapter">
                <div className="avatar_wrapper" >
                  {user && user.avatar[0] ? <Image src={user.avatar[0].url} alt={user.avatar[0].filename} /> : <Avatar user={user} />}
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
              </div>
              <div className="chat__sidebar-setting-chapter chat__sidebar-setting-chapter-edit">



                <div className='chat__sidebar-setting-itemEdit'>
                  <h4>Theme</h4>
                  <div className="chat__sidebar-setting-item-info">
                    <label htmlFor="valueTheme1">
                      <input type="radio" name="Theme" value="light" id='valueTheme1' onChange={onSelectTheme} checked={theme === "light"} />
                      Cветлая
                    </label>

                    <label htmlFor="valueTheme2">
                      <input type="radio" name="Theme" value="dark" id='valueTheme2' onChange={onSelectTheme} checked={theme === "dark"} />
                      Темная
                    </label>
                  </div>
                </div>


                <div className='chat__sidebar-setting-itemEdit'>
                  <h4>Language for translate messages</h4>
                  <div className="chat__sidebar-setting-item-info">
                    <Select
                      defaultValue={lang}
                      style={{ color: 'white' }}
                      options={contryData}
                      onSelect={onSelectLang}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) :
        (
          <div className="chat__sidebar-dialogs">
            <Dialogs userId={user && user._id} />
          </div>
        )
      }
      <Modal title="Создать диалог"
        open={visibleModalCreateDialog}
        onOk={onModalOk}
        onCancel={onCloseModalCreateDialog}
        footer={[
          <Button key='back' onClick={onCloseModalCreateDialog}>Закрыть</Button>,
          <Button disabled={!messageText} key='submit' loading={isLoading} onClick={onModalOk}>Создать</Button>
        ]}>
        <Form className='add-dialog-form'>
          <Form.Item label="Введите имя пользователяw или E-Mail">
            <Select
              mode="multiple"
              placeholder='Введите имя или почту пользователя'
              value={inputValue}
              onSearch={onSearch}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              notFoundContent={null}
              style={{ width: '100%' }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              showSearch>
              {options}
            </Select>
          </Form.Item>
          {inputValue.length > 1 && (<Form.Item label="Аватар Группы">
            {avatarDialog.length === 0 ? (<UploadField
              onFiles={onSelectAvatarDialog}
              containerProps={{
                className: 'chat-input_actions-upload'
              }}
              uploadProps={{
                multiple: 'multiple'
              }}>
              <Button type='link' shape='circle' icon={<FileOutlined />} /> <span>Выберите файл</span>
            </UploadField >) : null}
            <UploadFiles removeAttachment={onRemoveAvatarDialog} attachments={avatarDialog} style={{ 'visibility': avatarDialog ? 'visible' : 'hidden' }} />

          </Form.Item>)}
          {inputValue.length > 1 && (<Form.Item label="Введите название группы">
            <Input onChange={element => setNameGroup(element.target.value)} value={nameGroup} />
          </Form.Item>)}
          {selectedUserId && (<Form.Item label="Введите текст Сообщения">
            <TextArea autoSize={{ minRows: 3, maxRows: 10 }} onChange={onChangeTextArea} value={messageText} />
          </Form.Item>)}
        </Form>
      </Modal>
    </div>
  )
}

Sidebar.defaultProps = {
  users: []
}
export default Sidebar;