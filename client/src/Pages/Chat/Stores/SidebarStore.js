import {makeAutoObservable} from 'mobx';
import ContactStore from './ContactStore';

export default class SidebarStore{
  contacts = [];
  socketService;
  active = null;
  newContact = '';
  changeChat;
  
  constructor(changeChat, socketService){
    makeAutoObservable(this);
    this.socketService = socketService;
    this.changeChat = changeChat;
    this.initContactListListener();
  }
  toggleActive = (contact) =>{
    this.active = contact;
    this.changeChat(contact);
  }
  setNewContact = (x) =>{
    this.newContact = x;
  }
  initContactListListener = () =>{
    this.socketService.socket.on('contact list', (list)=>{
      this.contacts = [];
      list.forEach(e => {
        this.contacts.push(new ContactStore(e));
      });
    });
  }
  fetchNewContact = (e) =>{
    e.preventDefault();
    if(this.newContact){
      this.socketService.socket.emit('fetch new contact', this.newContact);
    }
    this.newContact = '';
  }
}