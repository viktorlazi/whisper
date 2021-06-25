import routes from '../../../../../../../webRoutes';

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
    return fetch(routes.serverApi + "/register", post)
    .then(response => response.json())
    .then(result => result)
    .catch(err => err);
  }
}