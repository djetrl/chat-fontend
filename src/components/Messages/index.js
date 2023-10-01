import { Modal } from 'antd';
import classNames from 'classnames';
import PropsType from 'prop-types';
import { Spin } from 'antd';
import { Empty } from 'antd';
import { Message } from '../';
import './Messages.scss';
const Messages = ({
  blockRef,
  isLoading,
  items,
  user,
  onRemoveMessage,
  previewImage,
  setPreviewImage,
  blockHeight,
  messageLength,
  currentDialog,
  isTyping,
  partner,
  lang,
  handleLoadNewMessage,
  loadingNewMessage,
  toggleSidebarPartnerFunc,
  addEmbeddedMessage,
  scrollByElemnt
}) => {
  return (
    <div className="chat__dialog-messages" style={{ height: `calc(100% - ${blockHeight}%)` }}>
      {(loadingNewMessage || (isLoading && user)) && <Spin size='large' tip="Загрузка сообщений..." className='SpinLoadingOldMessages'> </Spin>}
      <div ref={blockRef} onScroll={(e) => { handleLoadNewMessage(e, messageLength, currentDialog, items) }} className={classNames('messages', { 'messages--loading': isLoading })}>
        {items && !isLoading ? (
          items.length > 0 ? (
            items.map(item => (
              <Message
                {...item}
                toggleSidebarPartnerFunc={user && user._id !== item.user._id ? toggleSidebarPartnerFunc : () => { }}
                isMe={user._id === item.user._id}
                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                addEmbeddedMessage={addEmbeddedMessage.bind(this, item)}
                setPreviewImage={setPreviewImage}
                lang={lang}
                key={item._id}
                scrollByElemnt={scrollByElemnt}
              />
            ))
          ) : (
            <Empty description="Диалог пуст" />
          )
        ) : (
          <Empty description="Откройте диалог" />
        )}
        {isTyping && <Message isTyping={true} user={partner} />}
        <Modal open={!!previewImage} onCancel={() => setPreviewImage(null)} footer={null}>
          <img src={previewImage} style={{ width: '100%' }} alt="Preview" />
        </Modal>
      </div>
    </div>
  )
}

Messages.prototype = {
  items: PropsType.array
}
export default Messages;