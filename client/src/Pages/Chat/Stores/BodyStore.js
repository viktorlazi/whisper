import {makeAutoObservable} from 'mobx';
import CryptoJS from 'crypto-js';

export default class BodyStore{
  name;
  socketService;
  newMessage = '';
  getMessages;
  getSharedSecret;
  appendMessage;
  constructor(name, getSharedSecret, socketService, getMessages, appendMessage){
    makeAutoObservable(this);
    this.appendMessage = appendMessage;
    this.getMessages = getMessages;
    this.getSharedSecret = getSharedSecret;
    this.name = name;
    this.socketService = socketService;
  }
  setNewMessage = (x) =>{
    this.newMessage = x;
  }
  encryptMessage = () =>{
    const encryptionKey = this.getSharedSecret();
    return CryptoJS.AES.encrypt(this.newMessage, encryptionKey.toString()).toString();
  }
  decryptMessage = (msg) =>{
    const encryptionKey = this.getSharedSecret();
    return CryptoJS.AES.decrypt(msg, encryptionKey.toString()).toString(CryptoJS.enc.Utf8);
  }
  sendMessage = (e) =>{
    e.preventDefault();
    if(this.newMessage){
      const encryptedMessage = this.encryptMessage();
      this.appendMessage({content:encryptedMessage, sender:null, to:this.name, timestamp:1000});
      this.socketService.socket.emit('new message', encryptedMessage, this.name, 1000);
    }
    this.newMessage = '';
  }
}