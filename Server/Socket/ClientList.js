export default class ClientList{
  list = [];
  append = (client) =>{
    this.list.append(client);
    this.initDisconnectListener(client);
  }
  initDisconnectListener = (client) =>{
    client.socket.on('disconnect', () =>{
      this.list.splice(this.list.indexOf(client), 1);
    });
  }
  toString = () =>{
    console.log('Showing all client connection usernames: ', this.list.map(e=>e.username));
  }
}