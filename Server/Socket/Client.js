import User from '../models/User.js';
import JWT_SECRET from "../jwt_secret.js";
import jwt from 'jsonwebtoken';

export default class Client{
  username;
  socket;
  publicKey;
  contacts;a
  constructor(socket){
    this.username = this.getUsernameFromJWT(socket.handshake.auth.token);
    this.socket = socket;
    this.getContactsAsync();
    this.initListeners();
    this.initRequests();
  }
  getContactsAsync = async () =>{
    const client = await User.findOne({'username':this.username});
    if(client){
      this.contacts = client.contacts;
      return client.contacts;
    }
    return [];
  }
  getContacts = () =>{
    return this.contacts;
  }
  initRequests = () =>{
    this.socket.emit('public key request');
  }
  initListeners = () =>{
    this.socket.on('contact list', async () =>{
      this.socket.emit('contact list', await this.getContactsAsync());
    });
    this.socket.on('fetch new contact', async (newContactUsername) => {
      const newContact = await User.findOne({'username':newContactUsername});
      if(newContact){
        const contacts = await this.getContactsAsync();
        if(!contacts.includes(newContactUsername)){
          User.updateOne({username: this.username}, {
            contacts:[...this.contacts, newContactUsername]
          }).exec();
          this.contacts.push(newContactUsername);
          this.socket.emit('contact list', [...this.contacts]);
          return;
        }
        this.socket.emit('contact list', [...this.contacts]);
        return;
      }
      this.socket.emit('contact nonexistent');
    });
    this.socket.on('my public key', (pk)=>{
      this.publicKey = pk;
    });
  }
  getUsernameFromJWT = (token) =>{
    const auth = (jwt.verify(token, JWT_SECRET, (err, obj)=>{
      return obj;
    }));
    if(!auth){
      this.socket.disconnect();
    }
    const username = auth?auth.username:null;
    return username;
  }
  toString = () =>{
    return 'Username: ' + this.username + '\n' +
      'Public Key: ' + this.publicKey + '\n' +
      'Contacts: ' + this.contacts;
  }
}