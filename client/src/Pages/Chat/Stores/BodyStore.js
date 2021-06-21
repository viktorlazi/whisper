import {makeAutoObservable} from 'mobx';

export default class BodyStore{
  name;
  socket;
  messages = [{
    content:'alo',
    timestamp:'danas',
    sender:'viktor'
  }];
  constructor(name){
    this.name = name;
    makeAutoObservable(this);
  }
}