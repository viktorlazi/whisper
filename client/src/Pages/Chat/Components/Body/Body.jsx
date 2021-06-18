import {Avatar, IconButton} from '@material-ui/core'
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import BlockIcon from '@material-ui/icons/Block';
import './style/chatBody.css'
import Message from './Message'
import NoChat from './NoChat'

function ChatBody() { 
  if(true){
    return (
      <div className="chat_body">
        <div className="chat_header">
          <div className="chat_headerInfo">
            <Avatar />
            <h2>{}</h2>
          </div>
          <div className="chat_headerRight">
            <IconButton >
              <WhatshotIcon/>
            </IconButton>
            <IconButton >
              <BlockIcon/>
            </IconButton>
          </div>
        </div>
        <div className="chat_meat">
          
        </div>
        
        <div className="chat_footer">
          <form>
            <input placeholder="Type a message" type="text" />
            <button>Send a message</button>
          </form>
        </div>
      </div>
    )
  }
  return(<NoChat/>);
}

export default ChatBody
