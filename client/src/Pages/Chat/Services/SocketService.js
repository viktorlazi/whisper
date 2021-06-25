import io from 'socket.io-client';

const webSocketAddress = 'http://127.0.0.1:4000';

export default class SocketService{
  socket;
  constructor(){
    this.initSocket();
  }
  initSocket = () =>{
    setInterval(()=>{
      if(!this.socket && sessionStorage.getItem('token')){
        this.socket = io(
          webSocketAddress, 
          {
            auth: { 
              token:sessionStorage.getItem('token')
            }
          }
          );
        }
    }, 1000);
  }
}