import { Avatar } from '@material-ui/core'
import './style/contact.css'

function Contact({name, activate, active, online}) {
  return (
    <div onClick={online?activate:null} className={`contact ${active?" active":""}`}>
      <div className="contact_left">
        <h4>{name}</h4>
        <p className="online" style={online?{color:'green'}:{color:'red'}}>{online?'online':'offline'}</p>
      </div>
      <Avatar/>
    </div>
  )
}

export default Contact
