import Authenticated from './Authenticated';
import NotAuthenticated from './NotAuthenticated';

function LoginSystem() {
  return (
    <div className="auth">
      {
        sessionStorage.getItem('token')?
        <Authenticated />
        :<NotAuthenticated />
      }
    </div>
  )
}
export default LoginSystem;