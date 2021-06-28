import {makeAutoObservable} from 'mobx';

export default class ContactStore{
  name;
  sharedSecret;
  online;
  constructor(name){
    this.name = name;
    this.online = false;
    makeAutoObservable(this);
  }
}