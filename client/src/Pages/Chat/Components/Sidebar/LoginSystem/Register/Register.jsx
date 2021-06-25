import RegisterStore from './Stores/RegisterStore';
import {observer} from 'mobx-react';
import './style/register.css';
const store = new RegisterStore();

function Register({setToken}) {
  return <form id="register">
    <input value={store.username} placeholder='register username' onChange={e=>store.setUsername(e.target.value)} type="text" />
    <input value={store.password} placeholder='password' onChange={e=>store.setPassword(e.target.value)} type="password" />
    <input value={store.repeatPassword} placeholder='repeat password' onChange={e=>store.setRepeatPassword(e.target.value)} type="password" />
    <button onClick={e=>setToken(store.register(e).token)}>
      Register
    </button>
    <p id="errorMessage">
      {store.errorMessage}
    </p>
  </form>
}
export default observer(Register);
