import Sidebar from './Components/Sidebar/Sidebar';
import Body from './Components/Body/Body';
import './style/chat.css';
import ChatStore from './Stores/ChatStore';
import {observer} from 'mobx-react';

const store = new ChatStore(); 

function Chat() {
  return (
    <div className="chat">
      <Sidebar store={store.sidebarStore} active={store.active} />
      <Body store={store.bodyStore} active={store.active} />
    </div>
  )
}

export default observer(Chat);
