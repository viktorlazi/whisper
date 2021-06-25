import LoginStore from './Stores/LoginStore';
import {observer} from 'mobx-react';
import './style/login.css';
const store = new LoginStore();

function Login({setToken}) {
  return <form id="login">
    <input value={store.username} placeholder='login username' onChange={e=>store.setUsername(e.target.value)} type="text" />
    <input value={store.password} placeholder='password' onChange={e=>store.setPassword(e.target.value)} type="password" />
    <button onClick={e=>setToken(store.login(e).token)}>
      Log in
    </button>
    <p id="errorMessage">
      {store.errorMessage}
    </p>
  </form>
}
export default observer(Login);
