import { ArrowLeftOutlined, MailOutlined, UserOutlined, DownloadOutlined } from '@ant-design/icons';
import { Avatar, Video } from '../';
import { Image, Button } from 'antd';
import classNames from 'classnames';
import format from 'date-fns/format';
import { formBytes } from '../../utils/helpers';
import './Sidebar.scss'
const SidebarPartner = ({ user, attachments, sectionSelect, onSelectSection, toggleSidebarPartner, SidebarPartnerRedux }) => {
  return (
    <div className={classNames("chat__sidebar", { 'chat__sidebar-hidden': !SidebarPartnerRedux })}>
      <div className="chat__sidebar-header" style={{ 'padding': "0" }}>

        <div style={{ "display": "flex", "alignItems": "center" }}>
          <Button onClick={() => { toggleSidebarPartner(false) }} type='link' shape='circle' icon={<ArrowLeftOutlined />} />
          <span>информация о пользователе</span>
        </div>
      </div>
      <div className="chat__sidebar-setting chat__sidebarPartner-setting ">
        <div className="chat__sidebar-setting-chapter">
          <div className="avatar_wrapper">
            {user && user.avatar[0] ? <Image src={user.avatar[0].url} alt={user.avatar[0].filename} /> : <Avatar user={user} />}
          </div>

          <div className='chat__sidebar-setting-item'>
            <UserOutlined />
            <div className="chat__sidebar-setting-item-info">
              <p>{user && user.fullname}</p>
              <p>userName</p>
            </div>
          </div >

          <div className='chat__sidebar-setting-item'>
            <MailOutlined />
            <div className="chat__sidebar-setting-item-info">
              <p>{user && user.email}</p>
              <p>email</p>
            </div>
          </div>
        </div>
        <div className="chat__sidebar-setting-chapter chat__sidebar-setting-chapter-edit chat__sidebar-setting-chapter-gallery">
          <div className='chat__sidebar-setting-item chat__sidebar-setting-sections'>
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
                          className='chat__sidebar-setting-chapter-gallery-item'
                          width={`${(((2.4 / attachments.length) * 100))}%`}
                          height={100}
                          key={attachment._id}
                          src={attachment.url}
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
                      <Video key={attachment._id} data={attachment} />
                    )
                  }
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
                              <p className='chat__sidebarPartner--file_container--item--section--info--name'>{attachment.filename}</p>
                              <span><p>{formBytes(attachment.size)}</p> <p>{format(new Date(attachment.createdAt), "dd.MM.yyyy")}</p> </span>
                            </div>
                          </div>
                          <div className="chat__sidebarPartner--file_container--item--section">
                          </div>
                        </div>
                      )
                    }
                  })
                }
                </div>
              )}

          </div>


        </div>
      </div>
    </div>
  )

}

SidebarPartner.defaultProps = {
  users: []
}
export default SidebarPartner;