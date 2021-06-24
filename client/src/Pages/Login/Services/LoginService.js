import routes from '../../../webRoutes';

export default class LoginService{
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
    .then(result => {
      console.log(result)
      return result;
    })
    .catch(err => err);
  }
}