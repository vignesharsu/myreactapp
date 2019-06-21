import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';
import Login from './login/login'
import Main from './login/main'
import Contact from './login/Contact'
import Home from './login/home'
import MainLayout from './newComponents/MainLayout'
import UpdateContact from './login/updateContact'
import Callback from './Callback';

class Routers extends React.Component {
  render() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/mainlayout" component={MainLayout} />
        <Route path="/main" component={Main} />
        <Route path="/contact" component={Contact} />
        <Route path="/home" component={Home} />
        <Route path="/updatecon" component={UpdateContact} />
        <Route exact path='/callback' component={Callback}/>
      </div>
    </Router>
  );
  }
}

export default Routers
