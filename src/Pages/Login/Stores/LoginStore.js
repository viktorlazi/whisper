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
  login = (e) =>{
    e.preventDefault();
    this.setPassword('');
    this.service.login(this.username, this.password)
    .catch(err=>{
      this.errorMessage = err;
    });
  }
}