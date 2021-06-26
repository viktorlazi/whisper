import {makeAutoObservable} from 'mobx';
import RegisterService from '../Services/RegisterService';

export default class RegisterStore{
  username = '';
  password = '';
  repeatPassword = '';
  errorMessage = '';
  service = new RegisterService();

  constructor(){
    makeAutoObservable(this);
  }
  setUsername = (x) =>{
    this.username = x;
  }
  setPassword = (x) =>{
    this.password = x;
  }
  setRepeatPassword = (x) =>{
    this.repeatPassword = x;
  }
  register = async () =>{
    if(!this.username || !this.password || !this.repeatPassword){
      this.errorMessage = 'empty fields';
      return;
    }
    if(this.password === this.repeatPassword){
      const result = await this.service.register(this.username, this.password);
      if(result.status){
        sessionStorage.setItem('user_token', result.token);
        this.setPassword('');
        this.setRepeatPassword('');
        return {success: true, err: null, token:result.token}
      }else{
        this.setPassword('');
        this.setRepeatPassword('');
        return {success: false, err: result.error}
      }
    }
    this.errorMessage = 'repeat password doesn\'t match';
  }
  setToken = async (e, send) =>{
    e.preventDefault();
    const result = await this.register(); 
    if(result){
      send(result.token);
    }
  }
}