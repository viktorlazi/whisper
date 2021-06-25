import {makeAutoObservable, action} from 'mobx';

export default class TokenStore{
  token = '';
  constructor(){
    makeAutoObservable(this);
    this.initTokenListener();
  }
  initTokenListener = () =>{
    setInterval(action(()=>{
      if(sessionStorage.getItem('token')){
        this.token = sessionStorage.getItem('token');
      }else{
        this.token = null;
      }
    }), 1000);
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