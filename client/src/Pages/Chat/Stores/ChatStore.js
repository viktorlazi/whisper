import {makeAutoObservable, autorun} from 'mobx';
import SidebarStore from './SidebarStore';
import BodyStore from './BodyStore';
import SocketService from '../Services/SocketService';
import CryptoStore from './CryptoStore';

export default class ChatStore{
  contacts = [];
  messages = [];
  status = 'initial';
  socketService = new SocketService();
  bodyStore = new BodyStore(null, this.socketService);
  sidebarStore = new SidebarStore(cont => this.changeChat(cont), this.socketService);  
  cryptoStore = new CryptoStore();

  constructor(){
    makeAutoObservable(this);
    const initialInterval = setInterval(()=>{
      console.log('initial interval');
      if(this.status !== 'initial'){
        clearInterval(initialInterval);
        return;
      }
      if(this.socketService.socket){
        this.initListeners();
      }
    }, 500);

  }
  changeChat = (contact) =>{
    this.bodyStore = null;
    this.bodyStore = new BodyStore(contact, this.socketService);
  }
  initListeners = () =>{
    if(this.socketService.socket.connected){
      this.socketService.socket.emit('my public key', this.cryptoStore.publicKey);
      this.status = 'public key';
    }
  }
}