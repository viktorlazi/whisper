import './style/style.css';
import {useState} from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

function NotAuthenticated({setToken}) {
  const [toggleSystem, setToggleSystem] = useState(false);
  return (
    <div className="no_auth">
      <label className="switch" checked={toggleSystem} onChange={()=>{setToggleSystem(!toggleSystem)}}>
        <input type="checkbox"/>
        <span className="slider round"></span>
      </label>
      {
        toggleSystem?
        <Register setToken={(x)=>setToken(x)} />
        :<Login setToken={(x)=>{setToken(x)}} />
      }
    </div>
  )
}
export default NotAuthenticated;