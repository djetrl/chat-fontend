import {ArrowLeftOutlined,MailOutlined ,UserOutlined} from '@ant-design/icons';
import Avatar from '../Avatar';
import { Image,Modal,Button } from 'antd';
import classNames from 'classnames';
import './Sidebar.scss'
const SidebarPartner = ({user, setPreviewImage,attachments,previewImage,toggleSidebarPartner,SidebarPartnerRedux})=>{
  return(
    <div className={classNames("chat__sidebar", {'chat__sidebar-hidden':!SidebarPartnerRedux})}>
    <div className="chat__sidebar-header" style={{'padding':"0"}}>

        <div style={{    "display": "flex","alignItems": "center"}}>
          <Button  onClick={()=>{toggleSidebarPartner(false)}} type='link' shape='circle' icon={<ArrowLeftOutlined />}/>
          <span>информация о пользователе</span>
        </div>
    </div>
          <div  className="chat__sidebar-setting ">
            <div className="chat__sidebar-setting-chapter">
                <div className="avatar_wrapper" onClick={()=>{
                    if(user.avatar[0]){
                      setPreviewImage(user.avatar[0].url)
                    }
                  }}>
                    <Avatar user={user &&  user}/>
                </div>

                  <div className='chat__sidebar-setting-item'>
                      <UserOutlined />
                      <div className="chat__sidebar-setting-item-info">
                        <p>{user  &&  user.fullname}</p>
                        <p>userName</p>
                      </div>
                  </div >

                  <div className='chat__sidebar-setting-item'>
                    <MailOutlined />
                    <div className="chat__sidebar-setting-item-info">
                      <p>{ user &&  user.email}</p>
                      <p>email</p>
                    </div>
                  </div>
            </div>
            <div className="chat__sidebar-setting-chapter chat__sidebar-setting-chapter-edit chat__sidebar-setting-chapter-gallery"> 
                      <Image.PreviewGroup
                      items={()=>{
                        attachments.map(attachments=>(
                          attachments.url
                        ))
                      }}>
                    {
                      attachments.map(attachment=>{
                        if(attachment.ext !== 'webm'){
                          return(
                            <Image
                            className='chat__sidebar-setting-chapter-gallery-item'
                            width={`${(((2.4/attachments.length)*100))}%`}
                            height={100}
                            key={attachment._id }
                            src={attachment.url}
                          />
                          )
                        }
                      })
                    }
                    </Image.PreviewGroup>

                  
            </div>
         </div>
      <Modal open={!!previewImage} onCancel={() => setPreviewImage(null)} footer={null} className={'chat__sidebar-setting-modal-avatar'}>
        {  
         <img src={previewImage} style={{ width: '100%' }} alt="Preview" />
        }
      </Modal>
  </div>
  )
  
}

SidebarPartner.defaultProps ={
  users:[]
}
export default SidebarPartner;