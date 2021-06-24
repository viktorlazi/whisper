import {makeAutoObservable, runInAction} from 'mobx';
import LoginService from '../Services/LoginService';
import routes from '../../../webRoutes';

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
    const result = await this.service.login(this.username, this.password);
    runInAction(()=>{
      this.errorMessage = result.toString();
    });
    this.setPassword('');
    if(result.status){
      console.log(result)
      sessionStorage.setItem('token', result.token);
      window.location.href = routes.app + '/chat';
      return {success: true, err: null}
    }else{
      return {success: false, err: result.error}
    }
  }
}