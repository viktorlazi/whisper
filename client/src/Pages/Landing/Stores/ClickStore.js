export default class ClickStore{
  onLogin = () =>{
    window.location.href = './#/login';
  }
  onRegister = () =>{
    window.location.href = './#/register';    
  }
  onGuest = () =>{
    window.location.href = './#/chat';
  }
}