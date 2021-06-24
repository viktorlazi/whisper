import LoginStore from './Stores/LoginStore';
import routes from '../../webRoutes';
import {observer} from 'mobx-react';
import './style/login.css';
const store = new LoginStore();

function Login() {
  return <form id="login">
    <h1>Login <p onClick={()=>{window.location.href = routes.app + '/register';}}>or register</p></h1>
    <br/>
    <p>username:</p>
    <input value={store.username} onChange={e=>store.setUsername(e.target.value)} type="text" />
    <p>password:</p>
    <input value={store.password} onChange={e=>store.setPassword(e.target.value)} type="password" />
    <br/>
    <button onClick={e=>store.login(e)}>
      Submit
    </button>
    <p id="errorMessage">
      {store.errorMessage}
    </p>
  </form>
}
export default observer(Login);
