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
  encryptMessage = (msg, key) =>{

  }
  decryptMessage = (msg) =>{
    const encryptionKey = this.getSharedSecret();
    return CryptoJS.AES.decrypt(msg, encryptionKey.toString()).toString(CryptoJS.enc.Utf8);
  }
  sendMessage = (e) =>{
    e.preventDefault();
    if(this.newMessage){
      this.appendMessage({content:this.newMessage, sender:null, to:this.name, timestamp:1000});
      const encryptionKey = this.getSharedSecret();
      const encryptedMessage = CryptoJS.AES.encrypt(this.newMessage, encryptionKey.toString()).toString();
      this.socketService.socket.emit('new message', encryptedMessage, this.name, 1000);
    }
    this.newMessage = '';
  }
}