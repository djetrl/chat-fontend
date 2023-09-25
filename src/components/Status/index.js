import PropsType from 'prop-types';
import classNames from 'classnames';
import { SearchOutlined, EllipsisOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Popover,Input, Form,Modal, Select } from 'antd';
import './Status.scss';
const {Option} =Select;


const Status = ({ 
  online, 
  fullname, 
  onDeleteDialog, 
  onToggleSidebar, 
  toggleSidebarPartnerFunc, 
  nameDiaglog, 
  toggleVisibleInput, 
  visibleInput, 
  inputValue, 
  changeSearchInput,
  imAuthor,
  onModalOk,
  users,
  isLoading,
  onCloseModalCreateDialog, 
  onShowModalCreateDialog,
  visibleModalCreateDialog,
  onSearch,
  onChangeInput,
  onDeletePartnerFromDialog,
  onSelectUser,
  inputValueSearchPartner,
  partnerLength
 }) => {
  const options = users.map(user=>{
    return   <Option key={user._id}>{user.fullname}</Option>
  })

  return(
  
  <div className="chat__dialog-header">
    {window.innerWidth < 951 && <Button type='link' shape='circle' icon={<ArrowRightOutlined />} onClick={onToggleSidebar} className={'btn-sibebar-close'} />}
    <div className="chat__dialog-header-center" onClick={toggleSidebarPartnerFunc}>
      <b className="chat__dialog-header-username">{nameDiaglog ? nameDiaglog : fullname}</b>
      <div className="chat__dialog-header-status">
        {!nameDiaglog && <span className={classNames('status', { 'status--online': online })}>{online ? 'онлайн' : 'офлайн'}</span>}
      </div>
    </div>
    <div className="chat__dialog-header-action">
      <Input className={classNames({ 'hidden-input': !visibleInput })} placeholder="Поиск среди прогруженных  сообщений"
        onChange={changeSearchInput}
        value={inputValue} />

      <Button type='link' shape='circle' icon={<SearchOutlined />} onClick={toggleVisibleInput} />
      <Popover
        content={
          <div>
           {(partnerLength === 1 || imAuthor) &&  <Button onClick={onDeleteDialog}>Удалить диалог</Button>}
           {(partnerLength !== 1 && imAuthor) && <Button onClick={onShowModalCreateDialog}>Добавить пользователя</Button>}
           { (!imAuthor && partnerLength !== 1) && <Button onClick={onDeletePartnerFromDialog}>Выйти из диалога</Button>}
          </div>
        }
        trigger="click">
        <div>
          <Button type='link' shape='circle' icon={<EllipsisOutlined />} />
        </div>
      </Popover>
    </div>
    <Modal title="Добавить пользователя в диалог" 
              open={visibleModalCreateDialog} 
              onOk={onModalOk} 
              onCancel={onCloseModalCreateDialog} 
              footer={[
                <Button key='back' onClick={onCloseModalCreateDialog}>Закрыть</Button>,
                <Button key='submit' loading={isLoading} onClick={onModalOk}>Добавить</Button>
              ]}>
                <Form  className='add-dialog-form'>
                  <Form.Item label="Введите имя пользователяw или E-Mail">
                  <Select 
                        placeholder='Введите имя или почту пользователя'
                        value={inputValueSearchPartner}
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
                </Form>
      </Modal>
  </div>
)}

Status.prototype = {
  online: PropsType.bool,
}
export default Status;