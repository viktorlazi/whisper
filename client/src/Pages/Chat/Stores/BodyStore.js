import {makeAutoObservable} from 'mobx';

export default class BodyStore{
  name;
  socketService;
  sts = 'initial';
  newMessage = '';
  getMessages;
  appendMessage;
  constructor(name, socketService, getMessages, appendMessage){
    makeAutoObservable(this);
    this.appendMessage = appendMessage;
    this.getMessages = getMessages;
    this.name = name;
    this.socketService = socketService;
  }
  setNewMessage = (x) =>{
    this.newMessage = x;
  }
  sendMessage = (e) =>{
    e.preventDefault();
    if(this.newMessage){
      this.appendMessage({content:this.newMessage, sender:null, to:this.name, timestamp:1000});
      this.socketService.socket.emit('new message', this.newMessage, this.name, 1000);
    }
    this.newMessage = '';
  }
}