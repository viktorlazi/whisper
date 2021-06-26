import Contact from './Contact';
import WhatshotIcon from '@material-ui/icons/WhatshotOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar, IconButton} from '@material-ui/core'
import './style/sidebar.css';
import {observer} from 'mobx-react';
import LoginSystem from './LoginSystem/LoginSystem';

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
          store.getContacts().map(
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
        <input type="text" value={store.newContact} onChange={e=>store.setNewContact(e.target.value)} placeholder="type a name and press enter"></input>
        <p id="add_contact_error_message">{}</p>
        <button onClick={store.fetchNewContact} id="addContact" type="submit"></button>
      </form>
      <LoginSystem />
    </div>
  )
}

export default observer(Sidebar);
