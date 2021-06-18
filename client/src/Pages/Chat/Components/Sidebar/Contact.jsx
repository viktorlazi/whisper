import { Avatar } from '@material-ui/core'
import './style/contact.css'

function Contact({name, activate, active}) {
  return (
    <div onClick={activate} className={`contact ${active?" active":""}`}>
      <div className="contact_left">
        <h4>{name}</h4>
      </div>
      <Avatar/>
    </div>
  )
}

export default Contact
