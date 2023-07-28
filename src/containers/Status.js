import { Status as StatusBase } from "../components";
import { connect } from "react-redux";
import { dialogsApi } from '../utils/api';
import { dialogsActions } from "../redux/actions";
import { useNavigate } from "react-router-dom";
const Status = ({ currentDialogId,user, dialogs,setCurrentDialogId,deleteDialogs })=>{

  const navigate = new useNavigate();

  if(!dialogs.length   || !currentDialogId){
    return null;
  }
  const currentDialogObj = dialogs.filter(dialog=> dialog._id === currentDialogId )[0];

  let partner = {};

  if(currentDialogObj.author._id === user._id){
    partner = currentDialogObj.partner;
  }else{
    partner = currentDialogObj.author;
  }
  const onDeleteDialog = ()=>{
    if(window.confirm(
      'Вы действительно хотите удалить диалог? при удалении все сообщения удаляются у всех участников диалога без возможности возврата'
      )){
    dialogsApi.delete(currentDialogId)
    .then(()=>{
      deleteDialogs(currentDialogId);
      setCurrentDialogId('');
      navigate('/')
    })
  }
  }
    return <StatusBase online={partner.isOnline} fullname = {partner.fullname} onDeleteDialog={onDeleteDialog}/>
}

export default connect(
                        ({dialogs,user})=>({
                          dialogs:dialogs.items,
                          currentDialogId:dialogs.currentDialogId,
                          user:user.data
                        }), dialogsActions)(Status);