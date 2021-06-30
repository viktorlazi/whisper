import * as io from "socket.io" ;
import express from 'express'; 
import {createServer} from 'http'; 
import cors from 'cors';
import mongo_pass from './mongo_pass.js';
import mongoose from 'mongoose';
import {add_user} from './register.js';
import {login_user} from './login.js';
import Connections from './Socket/Connections.js';

const app = express();
const server = createServer(app);
app.use(cors());
app.use(express.json());
const socketio = new io.Server(server);

//mongo
const connection_url = "mongodb+srv://admin:" + mongo_pass + "@cluster0.lkgyy.mongodb.net/whisper?retryWrites=true&w=majority";
try{
  mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true
  });  
  const db = mongoose.connection; 
  db.once('open', ()=>{
    console.log('db ok');
  });
}catch(e){
  console.log(e)
}

let connections = new Connections();

try{
  socketio.on('connection', async (socket)=>{
    console.log('new connection');
    connections.append(socket);
  });
}catch(err){
  console.log(err)
}

//post get
app.post('/register', async (req, res) =>{
  add_user(req.body).then(result=>res.send(result));
});
app.post('/login', async (req, res) =>{
  res.send(await login_user(req.body));
});
app.post('/get_contacts', async(req, res) =>{
  res.send(await sendContacts(req.body.token));
});
app.post('/get_messages', async(req, res) =>{
  res.send(await sendMessages(req.body.token));
});

server.listen(4000);
