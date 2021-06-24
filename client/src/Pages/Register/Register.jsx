import RegisterStore from './Stores/RegisterStore';
import routes from '../../webRoutes';
import {observer} from 'mobx-react';
import './style/register.css';
const store = new RegisterStore();

function Register() {
  return <form id="register">
    <h1>Register <p onClick={()=>{window.location.href = routes.app + '/login';}}>or login</p></h1>
    <p>username:</p>
    <input value={store.username} onChange={e=>store.setUsername(e.target.value)} type="text" />
    <p>password:</p>
    <input value={store.password} onChange={e=>store.setPassword(e.target.value)} type="password" />
    <p>repeat password:</p>
    <input value={store.repeatPassword} onChange={e=>store.setRepeatPassword(e.target.value)} type="password" />
    <br/>
    <button onClick={e=>store.register(e)}>
      Submit
    </button>
    <p id="errorMessage">
      {store.errorMessage}
    </p>
  </form>
}
export default observer(Register);
