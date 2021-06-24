import './style/landing.css';
import ClickStore from './Stores/ClickStore';

const click = new ClickStore();

function Landing() {
  return (
    <div id="landing">
      {
        /* 
        ode ide tipa:
          do you want a preview or real world app?
          if you choose preview you dont have to register,
          you get a premade account and preset contacts you can message
          choose: 
            previewAccount1
            previewAccount2
            previewAccount3
            previewAccount4
        */
      }
      <h1>
        Whisper
      </h1>
      <h2>
        Privacy based instant messanger.
      </h2>
      <button className="guest" onClick={click.onGuest}>
        If you just want to preview the app click here to login as guest!
      </button>
      <div className="user">
        <button className="login" onClick={click.onLogin}>
          To login click here!
        </button>
        <button clasSName="register" onClick={click.onRegister}>
          To register click here!
        </button>
      </div>
      <br />
      <p>
        github: <a href="https://github.com/viktorlazi/whisper">https://github.com/viktorlazi/whisper</a>
      </p>


    </div>
  )
}
export default Landing;
