import LoginStore from './Stores/LoginStore';
import {useHistory} from 'react-router-dom';
const store = new LoginStore();
const redirect = useHistory();

function Register() {
  return <form>
    <h1>Register <p onClick={()=>{redirect.push('/register')}}>or register</p></h1>
    <p>username:</p>
    <input value={store.username} onChange={e=>store.setUsername(e.target.value)} type="text" />
    <p>password:</p>
    <input value={store.password} onChange={e=>store.setPassword(e.target.value)} type="password" />
    <p>repeat password:</p>
    <input value={store.repeatPassword} onChange={e=>store.setRepeatPassword(e.target.value)} type="password" />
    <button onClick={e=>store.register(e)}>
      Submit
    </button>
    <p id="errorMessage">
      {store.errorMessage}
    </p>
  </form>
}
export default Register;
