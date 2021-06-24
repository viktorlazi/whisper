import './style/style.css';
import {useState} from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

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
        <Register />
        :<Login />
      }
    </div>
  )
}
export default NotAuthenticated;