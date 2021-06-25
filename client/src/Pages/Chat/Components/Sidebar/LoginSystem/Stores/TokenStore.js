import {makeAutoObservable} from 'mobx';

export default class TokenStore{
  token = '';
  constructor(){
    makeAutoObservable(this);
  }
  clearToken = () =>{
    sessionStorage.clear();
    this.token = null;
  }
  setToken = (x) =>{
    if(x){
      sessionStorage.setItem('token', x);
      this.token = x;
    }
  }
}