import {makeAutoObservable} from 'mobx';
import LoginService from '../Services/LoginService';

export default class LoginStore{
  username = '';
  password = '';
  errorMessage = '';
  service = new LoginService();

  constructor(){
    makeAutoObservable(this);
  }
  setUsername = (x) =>{
    this.username = x;
  }
  setPassword = (x) =>{
    this.password = x;
  }
  login = async (e) =>{
    e.preventDefault();
    if(!this.username || !this.password){
      this.errorMessage = 'empty fields';
      return;
    }
    this.setPassword('');
    const result = await this.service.login(this.username, this.password);
    if(result.err){
      this.errorMessage = result;
      console.log(this.errorMessage)
    }
    /**
     * if(result.status){
          sessionStorage.setItem('user_token', result.token);
          sessionStorage.setItem('username', username);
          window.location.href = routes.serverApi + '/chat';
          return {success: true, err: null}
        }else{
          return {success: false, err: result.error}
        }
     */
  }
}