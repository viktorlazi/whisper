import RegisterStore from './Stores/RegisterStore';
import {observer} from 'mobx-react';
import './style/register.css';
const store = new RegisterStore();

function Register() {
  return <form id="register">
    <input value={store.username} placeholder='username' onChange={e=>store.setUsername(e.target.value)} type="text" />
    <input value={store.password} placeholder='password' onChange={e=>store.setPassword(e.target.value)} type="password" />
    <input value={store.repeatPassword} placeholder='repeat password' onChange={e=>store.setPassword(e.target.value)} type="password" />
    <button onClick={e=>store.register(e)}>
      Register
    </button>
    <p id="errorMessage">
      {store.errorMessage}
    </p>
  </form>
}
export default observer(Register);
