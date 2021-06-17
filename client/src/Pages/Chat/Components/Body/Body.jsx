import {Avatar, IconButton} from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import BlockIcon from '@material-ui/icons/Block';
import './chatBody.css'
import Message from './Message'
import NoChat from './NoChat'

function ChatBody({socket, activeChat, encryptionKey, contacts, setContacts, closeChat}) {
  const [messages, setMessages] = useState([])
  const[input, setInput] = useState("")

 
  if(activeChat){
    return (
      <div className="chat_body">
        <div className="chat_header">
          <div className="chat_headerInfo">
            <Avatar />
            <h2>{activeChat}</h2>
          </div>
          <div className="chat_headerRight">
            <IconButton onClick={burnContact}>
              <WhatshotIcon/>
            </IconButton>
            <IconButton onClick={blockContact}>
              <BlockIcon/>
            </IconButton>
          </div>
        </div>
        <div className="chat_meat">
          {
            messages.map(
              (obj) =>{
                return <Message 
                  message={obj.msg}
                  timestamp={obj.timestamp}
                  sender={obj.receiver === activeChat || obj.sender === activeChat}
                  receiver={obj.receiver !== sessionStorage.getItem('username')}/>
              }
            )
          }
        </div>
        
        <div className="chat_footer">
          <form>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message" type="text" />
            <button onClick={sendMessage}>Send a message</button>
          </form>
        </div>
      </div>
    )
  }
  return(<NoChat/>);
}

export default ChatBody
