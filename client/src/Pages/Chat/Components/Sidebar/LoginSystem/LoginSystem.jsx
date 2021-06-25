import Authenticated from './Authenticated';
import NotAuthenticated from './NotAuthenticated';
import TokenStore from './Stores/TokenStore';
import {observer} from 'mobx-react';

const tokenStore = new TokenStore();

function LoginSystem() {
  return (
    <div className="auth">
      {
        tokenStore.token?
        <Authenticated clearToken={tokenStore.clearToken} />
        :<NotAuthenticated setToken={(x)=>tokenStore.setToken(x)} />
      }
    </div>
  )
}
export default observer(LoginSystem);