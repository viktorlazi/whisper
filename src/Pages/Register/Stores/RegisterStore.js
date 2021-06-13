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
  login = (e) =>{
    e.preventDefault();
    this.setPassword('');
    this.setRepeatPassword('');
    if(this.password === this.repeatPassword){
      this.service.login(this.username, this.password)
      .catch(err=>{
        this.errorMessage = err;
      });
      return;
    }
    this.errorMessage = 'repeat password doesn\'t match';
  }
}