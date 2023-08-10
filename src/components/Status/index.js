import PropsType from 'prop-types';
import classNames from 'classnames';
import {SearchOutlined} from '@ant-design/icons';
import {EllipsisOutlined} from '@ant-design/icons';
import { Button, Popover,Input } from 'antd';

import './Status.scss';
const Status= ({online, fullname, onDeleteDialog,toggleSidebarPartnerFunc,toggleVisibleInput, visibleInput,inputValue,changeSearchInput}) =>(
  <div className="chat__dialog-header">
    <div className="chat__dialog-header-center" onClick={toggleSidebarPartnerFunc}>    
        <b className="chat__dialog-header-username">{fullname}</b>
        <div className="chat__dialog-header-status">
          <span className={classNames('status',{'status--online':online})}>{online ? 'онлайн':'офлайн'}</span>
        </div>
    </div>
    <div className="chat__dialog-header-action">
         <Input className={classNames({'hidden-input':!visibleInput})} placeholder="Поиск среди прогруженных  сообщений" 
                onChange={changeSearchInput}
                value={inputValue}  />

        <Button type='link' shape='circle' icon={<SearchOutlined />} onClick={toggleVisibleInput}/>
        <Popover
          content={
            <div>
              <Button onClick={onDeleteDialog}>Удалить диалог</Button>
            </div>
          }
          trigger="click">
          <div>
          <Button type='link' shape='circle' icon={<EllipsisOutlined />}/>
          </div>
        </Popover>
    </div>
</div>
)

Status.prototype={
  online: PropsType.bool,
}
export default Status;