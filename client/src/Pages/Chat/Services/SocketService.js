import io from 'socket.io-client';
import routes from '../../../webRoutes.js';

const webSocketAddress = routes.webSocket;

export default class SocketService{
  socket;
  constructor(){
    this.initSocket();
  }
  initSocket = () =>{
    setInterval(()=>{
      if(sessionStorage.getItem('token')){
        if(this.socket){
          if(!this.socket.connected){
            this.socket = io(
              webSocketAddress, 
              {
                auth: { 
                  token:sessionStorage.getItem('token')
                }
              }
              );
            }
          }else{
            this.socket = io(
              webSocketAddress, 
              {
                auth: { 
                  token:sessionStorage.getItem('token')
                }
              }
              );
            }
          }
        }, 1000);
  }
}