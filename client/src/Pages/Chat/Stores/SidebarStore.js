import {makeAutoObservable} from 'mobx';
import ContactStore from './ContactStore';

export default class SidebarStore{
  contacts = [];
  socketService;
  active = null;
  changeChat;

  constructor(changeChat, socketService){
    this.socketService = socketService;
    this.changeChat = changeChat;
    makeAutoObservable(this);
    this.initContactListListener();
  }
  toggleActive = (contact) =>{
    this.active = contact;
    this.changeChat(contact);
  }
  initContactListListener = () =>{
    this.socketService.socket.on('contact list', (list)=>{
      list.forEach(e => {
        this.contacts.push(new ContactStore(e));
      });
    });
  }
}