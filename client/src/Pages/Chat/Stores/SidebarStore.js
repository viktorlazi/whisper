import {makeAutoObservable} from 'mobx';

export default class SidebarStore{
  socketService;
  active = null;
  newContact = '';
  changeChat;
  getContacts;
  
  constructor(changeChat, getContacts, socketService){
    makeAutoObservable(this);
    this.getContacts = getContacts;
    this.socketService = socketService;
    this.changeChat = changeChat;
  }
  toggleActive = (contact) =>{
    this.active = contact;
    this.changeChat(contact);
  }
  setNewContact = (x) =>{
    this.newContact = x;
  }
  fetchNewContact = (e) =>{
    e.preventDefault();
    if(this.newContact && this.socketService.socket){
      this.socketService.socket.emit('fetch new contact', this.newContact);
    }
    this.newContact = '';
  }
}