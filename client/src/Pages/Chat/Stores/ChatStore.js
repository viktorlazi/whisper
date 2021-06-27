import {action, makeAutoObservable, runInAction} from 'mobx';
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
  bodyStore = new BodyStore(null, this.socketService);
  sidebarStore = new SidebarStore(cont => this.changeChat(cont),()=>{return this.getContacts()}, this.socketService, ()=>{return this.getContactErrMsg()});  

  constructor(){
    makeAutoObservable(this);
    this.connectionInterval();
  }
  getContactErrMsg = () =>{
    return this.contactErr;
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
    this.bodyStore = new BodyStore(contact, this.socketService);
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