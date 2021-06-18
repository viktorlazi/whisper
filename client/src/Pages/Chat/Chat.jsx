import Sidebar from './Components/Sidebar/Sidebar';
import Body from './Components/Body/Body';
import './style/chat.css';

function Chat() {
  return (
    <div className="chat">
      <Sidebar />
      <Body />
    </div>
  )
}

export default Chat;
