import User from './models/User.js';

export default class Client{
  username;
  socket;
  publicKey;
  contacts;
  constructor(socket){
    this.username = this.getUsernameFromJWT(socket.handshake.auth.token);
    this.socket = socket;
    this.publicKey = publicKey;
    this.getContactsAsync();
    this.initPublicKeyListener();
  }
  getContactsAsync = async () =>{
    const client = await User.findOne({'username':username});
    if(client){
      runInAction(()=>{
        this.contacts = client.contacts;
      });
    }
  }
  initPublicKeyListener = () =>{
    socket.on('my public key', (pk)=>{
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