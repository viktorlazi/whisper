import * as io from "socket.io" ;
import express from 'express'; 
import {createServer} from 'http'; 
import cors from 'cors';
import mongo_pass from './mongo_pass.js';
import mongoose from 'mongoose';
import {add_user} from './register.js';
import {login_user} from './login.js';
import User from './models/User.js';
import JWT_SECRET from "./jwt_secret.js";
import jwt from 'jsonwebtoken';
import Client from './Socket/Client.js';    
import ClientList from './Socket/ClientList.js';

let clientConnections = new ClientList();

socketio.on('connection', async (socket)=>{
  clientConnections.append(new Client(socket));
});