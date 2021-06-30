import Authenticated from './Authenticated';
import NotAuthenticated from './NotAuthenticated';
import TokenStore from './Stores/TokenStore';
import {observer} from 'mobx-react';
import AliceAndBob from './AliceAndBob';

const tokenStore = new TokenStore();

function LoginSystem() {
  return (
    <div className="auth">
      {
        tokenStore.token?
        <Authenticated clearToken={tokenStore.clearToken} />
        :
        [<NotAuthenticated setToken={(x)=>tokenStore.setToken(x)} />,
        <AliceAndBob />]

      }
    </div>
  )
}
export default observer(LoginSystem);