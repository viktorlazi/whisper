import {makeAutoObservable, runInAction} from 'mobx';
import SidebarStore from './SidebarStore';
import BodyStore from './BodyStore';
import SocketService from '../Services/SocketService';
import ContactStore from './ContactStore';

export default class ChatStore{
  contacts = [];
  messages = [];
  status = 'initial';
  socketService = new SocketService();
  bodyStore = new BodyStore(null, this.socketService);
  sidebarStore = new SidebarStore(cont => this.changeChat(cont),()=>{return this.getContacts()}, this.socketService);  

  constructor(){
    makeAutoObservable(this);
    this.initialInterval();
  }
  initialInterval = () =>{
    const interval = setInterval(()=>{
      if(this.status !== 'initial'){
        clearInterval(interval);
        return;
      }
      if(this.socketService.socket){
        this.initListeners();
      }
    }, 500);
  }
  getContacts = () =>{
    return this.contacts;
  }
  changeChat = (contact) =>{
    this.bodyStore = null;
    this.bodyStore = new BodyStore(contact, this.socketService);
  }
  initListeners = () =>{
    if(this.socketService.socket.connected){
      this.socketService.socket.emit('my public key', this.socketService.cryptoStore.publicKey);
      this.socketService.socket.emit('contact list');
      this.status = 'public key';
      
      this.socketService.socket.on('contact list', (list)=>{
        runInAction(()=>{
          this.contacts = [];
        });
        
        list.forEach(e => {
          runInAction(()=>{
            this.contacts.push(new ContactStore(e));
          });
      });
    });
  }
  }
}