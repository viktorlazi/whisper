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
    this.token = null;
    sessionStorage.clear();
  }
  setToken = (x) =>{
    this.token = x;
  }
}