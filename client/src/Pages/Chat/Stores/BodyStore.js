import {makeAutoObservable} from 'mobx';

export default class BodyStore{
  name;
  socketService;
  messages = [];
  constructor(name, socketService){
    makeAutoObservable(this);
    this.name = name;
    this.socketService = socketService;
    this.initMessageListener();
  }
  initMessageListener = () =>{
    if(this.socketService.socket){
      this.socketService.socket.emit('messages');
      this.socketService.socket.on('messages', (messages)=>{
        this.messages = messages;
      });
    }
  }
}