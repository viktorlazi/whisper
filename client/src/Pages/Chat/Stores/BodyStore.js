import {makeAutoObservable} from 'mobx';

export default class BodyStore{
  name;
  constructor(name){
    this.name = name;
    makeAutoObservable(this);
  }
}