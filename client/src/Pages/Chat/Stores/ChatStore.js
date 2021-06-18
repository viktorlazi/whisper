import {makeAutoObservable} from 'mobx';
import SidebarStore from './SidebarStore';
import BodyStore from './BodyStore';
import ChatService from '../Services/ChatService';

export default class ChatStore{
  active = null;
  contacts = [];
  socket;
  service = new ChatService;
  bodyStore = new BodyStore();
  sidebarStore = new SidebarStore();  

  constructor(){
    makeAutoObservable(this);

  }
}