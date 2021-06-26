import {makeAutoObservable, runInAction} from 'mobx';
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
  login = async () =>{
    if(!this.username || !this.password){
      this.errorMessage = 'empty fields';
      return;
    }
    const result = await this.service.login(this.username, this.password);
    runInAction(()=>{
      this.errorMessage = result.error;
    });
    this.setPassword('');
    if(result){
      if(result.token){
        return {success: true, err: null, token:result.token}
      }
    }else{
      return {success: false, err: result.error}
    }
  }
  setToken = async (e, send) =>{
    e.preventDefault();
    const result = await this.login(); 
    if(result){
      send(result.token);
    }
  }
}