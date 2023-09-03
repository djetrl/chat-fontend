
import orderBy from 'lodash/orderBy';
import { Input, Empty } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {Dialogitem} from '../'
import './Dialogs.scss';
const Dialogs= ({items, userId, onSearch,inputValue,currentDialogId, onCloseSidebar})=>(
 <div className="dialogs">
    <div className="dialogs__search">
        <Input 
                placeholder="Поиск среди контактов" 
                onChange={e=>onSearch(e.target.value)}
                value={inputValue}  />
                <SearchOutlined className='dialogs__search-icon' />
    </div>
    {items.length ? orderBy(items,["created_at"], ['desc']).map(item=>(
        <Dialogitem   key={item._id}
                      isMe={item.author._id === userId } 
                      userId={userId}
                      currentDialogId={currentDialogId}
                      {...item} 
                      onCloseSidebar={onCloseSidebar}/>
      )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Ничего не найдено' />}
 </div>
)

export default Dialogs;