import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { filesApi } from '../utils/api';
import { SidebarPartner } from "../components";
import {userActions } from '../redux/actions';

const SidebarPartnerContainer = ({ user, dialogs, currentDialogId, toggleSidebarPartner, SidebarPartnerRedux }) => {
  const [currentDialog, setCurrentDialog] = useState(null)
  const [userPartner, setUserPartner] = useState(null)
  const [attachments, setAttachments] = useState([])
  const [sectionSelect, setSectionSelect] = useState('photo');
  useEffect(() => {
    setCurrentDialog(dialogs.filter(item => item._id === currentDialogId))
  }, [dialogs, currentDialogId])

  useEffect(() => {
    if (currentDialog && currentDialog[0]) {
      if (currentDialog[0].author._id !== user._id) {
        setUserPartner(currentDialog[0].author)
      }
      else {
        setUserPartner(currentDialog[0].partner)
      }
    }
  }, [currentDialog])
  useEffect(() => {
    if (currentDialogId && SidebarPartnerRedux) {
      filesApi.getAllByDialogId(currentDialogId).then(({ data }) => {
        let newAttachments = [];
        if (data) {
          data.map(item => {
            if (item.attachments.length !== 0) {
              newAttachments.push(...item.attachments);
            }
          })
          if (newAttachments.length > 0) {
            setAttachments(newAttachments)
          }
        }

      })
    }
  }, [currentDialogId,SidebarPartnerRedux])
  const onSelectSection = (event) => {
    setSectionSelect(event.target.id);
  }
  if (!currentDialogId) {
    return null
  }
  return <SidebarPartner
    user={userPartner}
    currentDialog={currentDialog}
    attachments={attachments}
    sectionSelect={sectionSelect}
    onSelectSection={onSelectSection}
    toggleSidebarPartner={toggleSidebarPartner}
    SidebarPartnerRedux={SidebarPartnerRedux} />
}


export default connect(({ user, dialogs }) => ({
  user: user.data,
  dialogs: dialogs.items,
  currentDialogId: dialogs.currentDialogId,
  SidebarPartnerRedux: user.SidebarPartner,
}), {...userActions})(SidebarPartnerContainer);