import {makeAutoObservable, runInAction, toJS} from 'mobx';
import SidebarStore from './SidebarStore';
import BodyStore from './BodyStore';
import SocketService from '../Services/SocketService';
import ContactStore from './ContactStore';

export default class ChatStore{
  contacts = [];
  messages = [];
  sts = 'initial';
  contactErr = '';
  socketService = new SocketService();
  bodyStore = new BodyStore(null, this.socketService, this.getMessages);
  sidebarStore = new SidebarStore(cont => this.changeChat(cont),()=>{return this.getContacts()}, this.socketService, ()=>{return this.getContactErrMsg()});  

  constructor(){
    makeAutoObservable(this);
    this.connectionInterval();
    this.updateInterval();
  }
  getMessages = () =>{
    return this.messages;
  }
  getContactErrMsg = () =>{
    return this.contactErr;
  }
  updateInterval = () =>{
    const interval = setInterval(()=>{
      if(this.socketService.socket){
        this.socketService.socket.emit('who is online');
      }
    }, 2000);
  }
  connectionInterval = () =>{
    console.log(this.sts);
    const interval = setInterval(()=>{
      if(this.sts === 'initial' && this.socketService.socket){
        this.initListeners();
      }
      if(!sessionStorage.getItem('token') && this.socketService.socket){
        this.socketService.socket.disconnect();
        runInAction(()=>{
          this.bodyStore = new BodyStore(null, this.socketService, this.getMessages);
          this.sts = 'initial';
        });
      }
    }, 1000);
    
  }
  getContacts = () =>{
    return this.contacts;
  }
  changeChat = (contact) =>{
    this.bodyStore = null;
    this.bodyStore = new BodyStore(contact, this.socketService, this.getMessages);
  }
  initListeners = () =>{
    if(this.socketService.socket.connected){
      runInAction(()=>{
        this.sts = 'initialised';
      });
      console.log('init listeners');
      this.socketService.socket.emit('my public key', this.socketService.cryptoStore.publicKey);
      this.socketService.socket.emit('contact list');
      this.socketService.socket.on('disconnect', ()=>{
        runInAction(()=>{
          this.contacts = [];
        });
      });
      this.socketService.socket.on('online is', (online)=>{
        runInAction(()=>{
          this.contacts.forEach(e => {
            if(online.includes(e.name)){
              this.contacts[this.contacts.indexOf(e)].online = true;
            }else{
              this.contacts[this.contacts.indexOf(e)].online = false;
            }
          });
        });
      });
      this.socketService.socket.on('incoming message', (msg)=>{
        runInAction(()=>{
          this.messages.push(msg);
          console.log(toJS(this.messages));
        });
      });
      this.socketService.socket.on('contact nonexistent', ()=>{
        runInAction(()=>{
          this.contactErr = 'contact nonexistent';
          setTimeout(()=>{
            runInAction(()=>{
              this.contactErr = '';
            });
          },1000);
        });
      });
      this.socketService.socket.on('contact list', (list)=>{
        runInAction(()=>{
          this.sts = 'contacts fetched';
          this.contacts = [];
        });
        
        list.forEach(e => {
          runInAction(()=>{
            this.contacts.push(new ContactStore(e));
          });
      });
    });
  }
  }
}