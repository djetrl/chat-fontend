import { ArrowLeftOutlined, MailOutlined, UserOutlined, DownloadOutlined, CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Video } from '../';
import { Image, Button } from 'antd';
import { Form, Input, Modal } from 'antd';
import classNames from 'classnames';
import format from 'date-fns/format';
import { formBytes, getMessageTime } from '../../utils/helpers';
import { UploadField } from '../../utils/helpers';
import './SidebarPartner.scss';
const SidebarPartner = (
  { user,
    attachments,
    sectionSelect,
    allMembers,
    onSelectDialogThisMember,
    setVisibleModalCreateDialogPartner,
    visibleModalCreateDialogPartner,
    onModalOk,
    onSelectFiles,
    onChangeTextArea,
    isLoading,
    imAuthor,
    setDialogsName,
    onDeletePartnerFromDialog,
    messageText,
    onSelectSection,
    visibleSettingsEdit,
    onToogleVisibleSettingsEdit,
    toggleSidebarPartner,
    SidebarPartnerRedux,
    sendChangeDialog,
    dialogsAvatar,
    name,
    avatar,
    dialogsName }) => {
  const { TextArea } = Input;

  return (
    <div className={classNames("chat__sidebar", { 'chat__sidebar-hidden': !SidebarPartnerRedux })} style={{ 'borderLeft': '1px solid var(--background-secondaryСolor)' }}>
      <div className="chat__sidebar-header" style={{ 'padding': "0" }}>
        <div style={{ "display": "flex", "alignItems": "center" }}>
          <Button onClick={() => { toggleSidebarPartner(false) }} type='link' shape='circle' icon={<ArrowLeftOutlined />} />
          <span>информация о пользователе</span>
        </div>
        {allMembers.length > 2 && <Button onClick={onToogleVisibleSettingsEdit} type='link' shape='circle' icon={<EditOutlined />} style={{ "margin": " 0 10px" }} />}
      </div>
      <div className="chat__sidebar-setting chat__sidebarPartner-setting ">
        {!visibleSettingsEdit ? (
          <>
            <div className="chat__sidebar-setting-chapter">
              <div className="avatar_wrapper">
                {dialogsAvatar.length >= 1 && dialogsName && name && avatar ? 
                      (dialogsAvatar && dialogsAvatar[0] ? <Image src={avatar[0].url} alt={name} /> : 
                      <Avatar user={{ avatar: dialogsAvatar[0], fullname: dialogsName }} />) :
                  user && user.avatar[0] ? <Image src={user.avatar[0].url} alt={user.avatar[0].filename} /> : <Avatar user={user} />}
              </div>

              <div className='chat__sidebar-setting-item'>
                <UserOutlined />
                <div className="chat__sidebar-setting-item-info">
                  {!dialogsName ? (
                    <>
                      <p>{user && user.fullname}</p>
                      <p>userName</p>
                    </>
                  ) : (
                    <>
                      <p>{name}</p>
                      <p>dialog name</p>
                    </>
                  )}
                </div>
              </div >

              {!dialogsName && (
                <div className='chat__sidebar-setting-item'>
                  <MailOutlined />
                  <div className="chat__sidebar-setting-item-info">
                    <p>{user && user.email}</p>
                    <p>email</p>
                  </div>
                </div>
              )}
            </div>

            <div className="chat__sidebar-setting-chapter chat__sidebar-setting-chapter-edit chat__sidebar-setting-chapter-gallery">
              <div className='chat__sidebar-setting-item chat__sidebar-setting-sections'>
                {dialogsName && <p className={sectionSelect === 'members' ? 'active' : null} id={"members"} onClick={onSelectSection}>Участники</p>}
                <p className={sectionSelect === 'photo' ? 'active' : null} id={"photo"} onClick={onSelectSection}>фото</p>
                <p className={sectionSelect === 'video' ? 'active' : null} id={"video"} onClick={onSelectSection} >Видео</p>
                <p className={sectionSelect === 'other' ? 'active' : null} id={"other"} onClick={onSelectSection} >прочее</p>

              </div>
              <div className="chat__sidebarPartner--list-container">
                {sectionSelect === 'photo' ? (
                  <Image.PreviewGroup
                    items={() => {
                      attachments.map(attachments => (
                        attachments.url
                      ))
                    }}>
                    {
                      attachments.map(attachment => {
                        if (attachment.ext.split('/')[0] === 'image') {
                          return (
                            <Image
                              id={attachment._id}
                              className='chat__sidebar-setting-chapter-gallery-item'
                              width={`${(((2.4 / attachments.length) * 100))}%`}
                              height={100}
                              key={attachment._id}
                              src={attachment.url}
                              alt={`image ${attachment._id}`}
                            />
                          )
                        }
                      })
                    }
                  </Image.PreviewGroup>

                ) : sectionSelect === 'video' ? (
                  <div className="chat__sidebarPartner--video_container">{
                    attachments.map(attachment => {
                      if (attachment.ext.split('/')[0] !== 'image' && attachment.ext.split('/')[0] === 'video') {
                        return (
                          <Video id={attachment._id} key={attachment._id} data={attachment} />
                        )
                      }
                    })
                  }
                  </div>
                ) : sectionSelect === 'members' ? (
                  <div className="chat__sidebarPartner--members">{
                    allMembers.map(members => {
                      return (
                        <div className="chat__sidebarPartner--members--item" key={members._id} onClick={(event) => onSelectDialogThisMember(event, members._id)}>
                          {members && members.avatar[0] ? <Image src={members.avatar[0].url} alt={members.avatar[0].filename} /> : <Avatar user={members} />}
                          <div className="chat__sidebarPartner--members--item-content">
                            <p>{members.fullname}</p>
                            <span>{getMessageTime(members.last_seen)}</span>
                          </div>
                          {imAuthor && (members._id !== allMembers[0]._id) && <Button onClick={() => { onDeletePartnerFromDialog(members._id) }} type='link' shape='circle' icon={<CloseOutlined />} />}
                        </div>
                      )
                    })
                  }
                  </div>
                )
                  : (
                    <div className="chat__sidebarPartner--file_container">{
                      attachments.map(attachment => {
                        if (attachment.ext.split('/')[0] !== 'image' && attachment.ext.split('/')[0] !== 'video' && attachment.url.split('.')[1] !== 'webm') {
                          return (

                            <div className="chat__sidebarPartner--file_container--item" key={attachment._id} >
                              <div className="chat__sidebarPartner--file_container--item--section">
                                <a className="File-Icon" href={attachment.url}>
                                  <p>{attachment.url.split('.')[1]}</p>
                                  <Button type='link' shape='circle' icon={<DownloadOutlined />} />
                                </a>
                                <div className='chat__sidebarPartner--file_container--item--section--info' >
                                  <p className='chat__sidebarPartner--file_container--item--section--info--name' >{attachment.filename}</p>
                                  <span><p>{formBytes(attachment.size)}</p> <p>{format(new Date(attachment.createdAt), "dd.MM.yyyy")}</p> </span>
                                </div>
                              </div>
                              <div className="chat__sidebarPartner--file_container--item--section"> </div>
                            </div>
                          )
                        }
                      })
                    }
                    </div>
                  )}

              </div>


            </div>
          </>
        ) : (
          <>
            <form className="profile-form  sidebarPartner-form-setting" name='setting' onSubmit={sendChangeDialog}>
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
                <Avatar user={dialogsAvatar ? { fullname: dialogsName, avatar: dialogsAvatar, _id: user._id } : user} />
                <PlusOutlined />
              </UploadField >
              <div className="input-info-container">
                <Input type="text" name='name' value={dialogsName} onChange={(e) => { setDialogsName(e.target.value) }} placeholder='Название группы' />

              </div>
              {
                (dialogsName.trim() !== name.trim()) ||
                  (dialogsAvatar.length >= 1 ? (dialogsAvatar[0].url !== avatar[0].url) : dialogsAvatar.length === 1) ?
                  <input type="submit" className='btn-setting-submit ' value={"✓"} disabled={isLoading} placeholder='✓' /> : null
              }
            </form>
          </>
        )}
      </div>
      <Modal
        title="Создать диалог"
        open={visibleModalCreateDialogPartner}
        onOk={onModalOk}
        onCancel={() => setVisibleModalCreateDialogPartner(false)}
        footer={[
          <Button key='back' onClick={() => setVisibleModalCreateDialogPartner(false)}>Закрыть</Button>,
          <Button disabled={!messageText} key='submit' loading={isLoading} onClick={onModalOk}>Создать</Button>
        ]}>
        <Form className='add-dialog-form'>
          <TextArea autoSize={{ minRows: 3, maxRows: 10 }} onChange={onChangeTextArea} value={messageText} />
        </Form>
      </Modal>
    </div>
  )

}

SidebarPartner.defaultProps = {
  users: []
}
export default SidebarPartner;