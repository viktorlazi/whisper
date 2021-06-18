import {makeAutoObservable} from 'mobx';

export default class BodyStore{
  
  

  constructor(){
    makeAutoObservable(this);
  }
}