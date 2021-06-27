import {makeAutoObservable} from 'mobx';

export default class BodyStore{
  name;
  socketService;
  sts = 'initial';
  newMessage = '';
  getMessages;
  constructor(name, socketService, getMessages){
    makeAutoObservable(this);
    this.getMessages = getMessages;
    this.name = name;
    this.socketService = socketService;
    this.initMessageListener();
  }
  setNewMessage = (x) =>{
    this.newMessage = x;
  }
  initMessageListener = () =>{
      
  }
  sendMessage = (e) =>{
    e.preventDefault();
    if(this.newMessage){
      this.socketService.socket.emit('new message', this.newMessage, this.name, 1000);
    }
    this.newMessage = '';
  }
}