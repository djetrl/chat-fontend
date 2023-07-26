import PropsType from 'prop-types';
import classNames from 'classnames';

import {EllipsisOutlined} from '@ant-design/icons';
import { Button, Popover } from 'antd';

import './Status.scss';
const Status= ({online, fullname}) =>(
  <div className="chat__dialog-header">
    <div className="chat__dialog-header-center">     
        <b className="chat__dialog-header-username">{fullname}</b>
        <div className="chat__dialog-header-status">
          <span className={classNames('status',{'status--online':online})}>{online ? 'онлайн':'офлайн'}</span>
        </div>
    </div>
    <Popover
      className="chat__dialog-header-action"
      content={
        <div>
          <Button>Удалить диалог</Button>
        </div>
      }
      trigger="click">
      <div>
       <Button type='link' shape='circle' icon={<EllipsisOutlined />}/>
      </div>
    </Popover>
</div>
)

Status.prototype={
  online: PropsType.bool,
}
export default Status;