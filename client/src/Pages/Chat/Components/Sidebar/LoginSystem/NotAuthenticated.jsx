import './style/style.css';
import {useState} from 'react';

function NotAuthenticated() {
  const [toggleSystem, setToggleSystem] = useState(false);
  return (
    <div className="no_auth">
      <label class="switch" checked={toggleSystem} onChange={()=>{setToggleSystem(!toggleSystem)}}>
        <input type="checkbox"/>
        <span class="slider round"></span>
      </label>
      {
        toggleSystem?
        <p>register</p>
        :<p>login</p>
      }
    </div>
  )
}
export default NotAuthenticated;