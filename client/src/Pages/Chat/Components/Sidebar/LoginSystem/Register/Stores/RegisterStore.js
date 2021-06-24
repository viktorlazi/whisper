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
  register = async (e) =>{
    e.preventDefault();

    if(!this.username || !this.password || !this.repeatPassword){
      this.errorMessage = 'empty fields';
      return;
    }
    if(this.password === this.repeatPassword){
      const result = await this.service.register(this.username, this.password);
      console.log(result);
      if(result.status){
        sessionStorage.setItem('user_token', result.token);
        sessionStorage.setItem('username', this.username);
        //window.location.href = routes.serverApi + '/chat';
        this.setPassword('');
        this.setRepeatPassword('');
        return {success: true, err: null}
      }else{
        this.setPassword('');
        this.setRepeatPassword('');
        return {success: false, err: result.error}
      }
    }
    this.errorMessage = 'repeat password doesn\'t match';
  }
}