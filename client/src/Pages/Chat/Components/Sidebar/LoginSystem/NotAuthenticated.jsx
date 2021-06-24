import './style/style.css';
import {useState} from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

function NotAuthenticated({getToken}) {
  const [toggleSystem, setToggleSystem] = useState(false);
  return (
    <div className="no_auth">
      <label className="switch" checked={toggleSystem} onChange={()=>{setToggleSystem(!toggleSystem)}}>
        <input type="checkbox"/>
        <span className="slider round"></span>
      </label>
      {
        toggleSystem?
        <Register />
        :<Login getToken={getToken} />
      }
    </div>
  )
}
export default NotAuthenticated;