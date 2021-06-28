import Client from './Client.js';
import User from '../models/User.js';

export default class Connections{
  list = [];
  append = (socket) =>{
    const client = new Client(socket);
    const alreadyExists = this.list.find(e=>e.username === client.username);
    if(alreadyExists){
      this.list.splice(this.list.indexOf(alreadyExists), 1);
    }
    if(client.username){
      this.list.push(client);
      this.initListeners(client);
      console.log(this.toString());
    }
  }
  initListeners = (client) =>{
    client.socket.on('disconnect', () =>{
      this.list = this.list.filter(e=>e.socket !== client.socket);
    });
    client.socket.on('who is online', ()=>{
      let online = [];
      if(client.getContacts()){
        client.getContacts().forEach(c => {
          if(this.list.map(e=>e.username).includes(c)){
            online.push(c);
          }
        });
        client.socket.emit('online is', online);
      }
    });
    client.socket.on('new message', async (msg, to, timestamp) =>{
      const receiver = this.list.find(e=>e.username===to);
      if(receiver){
        const receiverDb = await User.findOne({'username':to});
        if(receiverDb){
          if(!receiverDb.contacts.includes(client.username)){
            receiver.socket.emit('contact list', [...receiverDb.contacts, client.username]);
            User.updateOne({username: to}, {
              contacts:[...receiverDb.contacts, client.username]
            }).exec();
            receiver.getContactsAsync();
          }
        }
        receiver.socket.emit('incoming message', {content:msg, sender:client.username, to:to, timestamp:timestamp})
        client.socket.emit('msg sent', to);
      }else{
        console.log('not online: ' + to);
        client.socket.emit('msg not sent', to);
      }
    })
  }
  toString = () =>{
    return ('Showing all client connection usernames: ', this.list.map(e=>e.username));
  }
}
