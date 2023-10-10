import { useEffect, lazy} from 'react';
import {connect } from 'react-redux';
import classNames from 'classnames';
import {Messages,Chatinput,Status,Sidebar} from '../../containers';
import { withRouter } from '../../utils/helpers';
import { dialogsActions } from '../../redux/actions';
import './Home.scss';
const ChatinputLazy = lazy(()=>import('../../containers/Chatinput'))
const SidebarPartnerLazy = lazy(()=>import('../../containers/SidebarPartner'));

const Home = (props)=>{
  const {setCurrentDialogId,user, sidebarStatus, sidebarPartnerStatus} = props;
  useEffect(()=>{
    const {pathname} =props.router.location;
    const dialogId = pathname.split('/').pop()
      setCurrentDialogId(dialogId)
  },[props.router.location.pathname])
  return (
    <section className='home'>
      <div className={classNames("chat",{
        "sidebar-open":sidebarStatus,
        "sidebar-close":!sidebarStatus,
        "sidebarPartner-open":sidebarPartnerStatus,
    })} >
          <Sidebar/>
          { user && (
            <div className="chat__dialog">
                <Status/>                    
                <Messages/>
                <div className="chat__dialog-input">
                      <ChatinputLazy/>
                </div>
          </div>
            )
          }
          <SidebarPartnerLazy/>
      </div>

    </section>
  )
      }


export default withRouter(connect(({user})=>({
  user:user.data,
  sidebarStatus:user.Sidebar,
  sidebarPartnerStatus: user.SidebarPartner,
}), dialogsActions)(Home) );
