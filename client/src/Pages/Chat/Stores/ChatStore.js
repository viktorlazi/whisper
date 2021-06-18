import {makeAutoObservable} from 'mobx';
import SidebarStore from './SidebarStore';
import BodyStore from './BodyStore';
import ChatService from '../Services/ChatService';

export default class ChatStore{
  contacts = [];
  socket;
  service = new ChatService;
  bodyStore = new BodyStore;
  sidebarStore = new SidebarStore(cont => this.changeChat(cont));  

  constructor(){
    makeAutoObservable(this);
  }
  changeChat = (contact) =>{
    this.bodyStore = null;
    this.bodyStore = new BodyStore(contact);
  }
}