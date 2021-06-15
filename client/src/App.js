import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Chat from './Pages/Chat/Chat';
import Landing from './Pages/Landing/Landing';


function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={Landing} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
