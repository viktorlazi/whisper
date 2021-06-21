import io from 'socket.io-client';

const webSocketAddress = 'http://127.0.0.1:4000';

export default class SocketService{
  constructor(){
    this.initSocket();
  }
  initSocket = () =>{
    this.socket = io(
      webSocketAddress, 
      {
        auth: { 
          token:sessionStorage.getItem('user_token')
        }
      }
    );
  }
}