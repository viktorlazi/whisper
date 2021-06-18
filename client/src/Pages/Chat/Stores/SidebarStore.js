import {makeAutoObservable} from 'mobx';
import ContactStore from './ContactStore';

export default class SidebarStore{
  contacts = [];

  constructor(){
    makeAutoObservable(this);
    this.contacts.push(new ContactStore('viktor'));
  }
}