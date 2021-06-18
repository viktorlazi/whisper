import Contact from './Contact';
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton} from '@material-ui/core'
import './style/sidebar.css';
import {observer} from 'mobx-react';

function Sidebar({store}) {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar/>
        <div className="sidebar_headerRight">
          <IconButton>
            <WhatshotIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>
      </div>
      <div className="sidebar_chats">
        {
          store.contacts.map(
            (contact) =>{
              return (
                <Contact 
                  name={contact.name}
                  activate={()=>store.toggleActive(contact.name)}
                  active={contact.name === store.active}
                  key={Math.random()}
                />
              )
          })
        }
      </div>
      <form className="sidebar_add_new">
        <input type="text" placeholder={'type a name and press enter'}></input>
        <p id="add_contact_error_message">{}</p>
        <button id="addContact" type="submit"></button>
      </form>
      <div className="sidebar_logout">
        <button id="logout" type="submit">Log out</button>
      </div>
    </div>
  )
}

export default observer(Sidebar);
