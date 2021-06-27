import {makeAutoObservable} from 'mobx';

export default class ContactStore{
  name;
  online;
  constructor(name){
    this.name = name;
    this.online = false;
    makeAutoObservable(this);
  }
}