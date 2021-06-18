import {makeAutoObservable} from 'mobx';
import ContactStore from './ContactStore';

export default class SidebarStore{
  contacts = [];
  active = null;
  changeChat;

  constructor(changeChat){
    this.changeChat = changeChat;
    makeAutoObservable(this);
    this.contacts.push(new ContactStore('viktor'));
    this.contacts.push(new ContactStore('filip'));
    this.contacts.push(new ContactStore('marko'));
  }
  toggleActive = (contact) =>{
    this.active = contact;
    this.changeChat(contact);
  }
}