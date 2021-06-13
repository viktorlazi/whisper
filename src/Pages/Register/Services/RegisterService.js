import routes from '../../../apiRoutes';

export default class RegisterService{
  register = (username, password) =>{
    return new Promise = (res, rej) =>{
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
            redirect.push('/chat');
            res();
          }else{
            rej(result.error);
          }
        }
      )
      .catch(serviceError=>{
        rej(serviceError);
      });
    }
  }
}