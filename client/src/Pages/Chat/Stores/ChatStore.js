import {makeAutoObservable} from 'mobx';
import SidebarStore from './SidebarStore';
import BodyStore from './BodyStore';
import HttpService from '../Services/HttpService';
import SocketService from '../Services/SocketService';

export default class ChatStore{
  contacts = [];
  httpService = new HttpService();
  socketService = new SocketService();
  bodyStore = new BodyStore();
  sidebarStore = new SidebarStore(cont => this.changeChat(cont), this.socketService);  

  constructor(){
    makeAutoObservable(this);
  }
  changeChat = (contact) =>{
    this.bodyStore = null;
    this.bodyStore = new BodyStore(contact);
  }
}