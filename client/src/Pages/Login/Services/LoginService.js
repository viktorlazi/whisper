import routes from '../../../webRoutes';

export default class LoginService{as
  login = async (username, password) =>{
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
    return fetch(routes.serverApi + "/login", post)
    .then(response => response.json())
    .then(result => result.json())
  }
}