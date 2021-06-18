import {makeAutoObservable} from 'mobx';

export default class ContactStore{
  name;
  constructor(name){
    this.name = name;
    makeAutoObservable(this);
  }
}