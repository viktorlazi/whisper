import io from 'socket.io-client';

const webApi = 'http://127.0.0.1:4000';

export default class ChatService{
  initSocket = () =>{
    return io(
      webApi, 
      {
        auth: { 
          token:sessionStorage.getItem('user_token')
        }
      }
    );
  }
}
