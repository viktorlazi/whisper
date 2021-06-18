import {makeAutoObservable} from 'mobx';

export default class SidebarStore{
    

  constructor(){
    makeAutoObservable(this);
  }
}