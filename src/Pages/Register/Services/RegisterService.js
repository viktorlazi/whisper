import routes from '../../../routes';

export default class RegisterService{
  register = async (username, password) =>{
    const post = {
      method: 'POST',
      body:JSON.stringify({
        username,
        password
      }),
      headers:{
        "Content-Type": "application/json"
      }
    };
    fetch(routes.serverApi + "/register", post)
    .then(response => response.json())
    .then(result => {
        if(result.status){
          sessionStorage.setItem('user_token', result.token);
          sessionStorage.setItem('username', username);
          window.location.href = routes.serverApi + '/chat';
          return {success: true, err: null}
        }else{
          return {success: false, err: result.error}
        }
      }
    )
    .catch(serviceError=>{
      return {success: false, err: serviceError}
    });
  }
}