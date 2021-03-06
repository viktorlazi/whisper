import {makeAutoObservable, runInAction, toJS} from 'mobx';
import SidebarStore from './SidebarStore';
import BodyStore from './BodyStore';
import SocketService from '../Services/SocketService';
import ContactStore from './ContactStore';
import CryptoStore from './CryptoStore';

export default class ChatStore{
  contacts = [];
  messages = [];
  sts = 'initial';
  contactErr = '';
  cryptoStore = new CryptoStore();
  socketService = new SocketService();
  bodyStore = new BodyStore(null, null, this.socketService, this.getMessages, (x)=>this.appendMessage(x));
  sidebarStore = new SidebarStore(cont => this.changeChat(cont),()=>{return this.getContacts()}, this.socketService, ()=>{return this.getContactErrMsg()});  

  constructor(){
    makeAutoObservable(this);
    this.connectionInterval();
    this.updateInterval();
  }
  appendMessage = (msg) =>{
    this.messages.push(msg);
  }
  getMessages = () =>{
    return this.messages;
  }
  getSharedSecret = (username) =>{
    const findContactByUsername = this.contacts.find(e=>e.name === username);
    if(findContactByUsername){
      return findContactByUsername.sharedSecret;
    }
    return null;
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
          this.bodyStore = new BodyStore(null, null, this.socketService, this.getMessages, x=>this.appendMessage(x));
          this.sts = 'initial';
        });
      }
    }, 1000);
    
  }
  getContacts = () =>{
    return this.contacts;
  }
  changeChat = (contact) =>{
    this.bodyStore = new BodyStore(contact, ()=>this.getSharedSecret(contact), this.socketService, this.getMessages, x=>this.appendMessage(x));
  }
  initListeners = () =>{
    if(this.socketService.socket.connected){
      runInAction(()=>{
        this.sts = 'initialised';
      });
      console.log('init listeners');
      this.socketService.socket.emit('contact list');
      this.socketService.socket.on('public key request', ()=>{
        this.socketService.socket.emit('my public key', this.cryptoStore.publicKey);
      });
      this.socketService.socket.on('disconnect', ()=>{
        runInAction(()=>{
          this.contacts = [];
        });
      });
      this.socketService.socket.on('online is', (online)=>{
        runInAction(()=>{
          this.contacts.forEach(e => {
            const onlineContact = online.find(i=>i.username === e.name);
            this.contacts[this.contacts.indexOf(e)].online 
            = onlineContact? true:false;
            this.contacts[this.contacts.indexOf(e)].sharedSecret
            = onlineContact?this.cryptoStore.getSharedSecret(onlineContact.publicKey):null;
          });
        });
        console.log(toJS(this.contacts));
      });
      this.socketService.socket.on('incoming message', (msg)=>{
        runInAction(()=>{
          this.messages.push(msg);
          console.log(toJS(this.messages));
        });
      });
      this.socketService.socket.on('self contact', ()=>{
        this.contactErr = 'you cant contact yourself';
        setTimeout(()=>{
          runInAction(()=>{
            this.contactErr = '';
          });
        },1000);
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