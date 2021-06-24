import {makeAutoObservable} from 'mobx';
import SidebarStore from './SidebarStore';
import BodyStore from './BodyStore';
import SocketService from '../Services/SocketService';

export default class ChatStore{
  jwt;
  contacts = [];
  messages = [];
  socketService = new SocketService();
  bodyStore = new BodyStore(null, this.socketService);
  sidebarStore = new SidebarStore(cont => this.changeChat(cont), this.socketService);  

  constructor(){
    makeAutoObservable(this);
  }
  changeChat = (contact) =>{
    this.bodyStore = null;
    this.bodyStore = new BodyStore(contact, this.socketService);
  }
}