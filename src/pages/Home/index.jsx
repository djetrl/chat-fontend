import { useEffect } from 'react';
import {connect } from 'react-redux';
import {Messages,Chatinput,Status,Sidebar,SidebarPartner} from '../../containers';
import { withRouter } from '../../utils/helpers';
import { dialogsActions } from '../../redux/actions';

import './Home.scss';
const Home = (props)=>{
  const {setCurrentDialogId,user} = props;
  useEffect(()=>{
    const {pathname} =props.router.location;
    const dialogId = pathname.split('/').pop()
      setCurrentDialogId(dialogId)
  },[props.router.location.pathname])
  return (
    <section className='home'>
      <div className="chat">
          <Sidebar/>
          { user && (
            <div className="chat__dialog">
                <Status/>                    
                <Messages/>
                <div className="chat__dialog-input">
                      <Chatinput/>
                </div>
          </div>
            )
          }
          <SidebarPartner/>
      </div>

    </section>
  )
      }


export default withRouter(connect(({ user})=>({
  user:user.data
}), dialogsActions)(Home) );
