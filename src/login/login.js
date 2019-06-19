import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import sendCredentials from './service/sendCredentials.js';
import { connect } from 'react-redux';
import { user } from '../redux/action';
import auth0Client from '../Auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  

  onSubmit() {
    sendCredentials(this.state.username, this.state.password)
      .then(response => {
          this.props.user(response.userId);
          sessionStorage.setItem('userIds',response.userId);
          this.props.history.push("/main");
      }).catch(err => {
        console.log(err);
      });
  }

  // onSubmit() {
  //   auth0Client.signIn()
  // }

   render() {
    return (
      <div className="container">
      <form>
        <div className="row mb-3 text-center">
            <div className="col-md-4 themed-grid-col"></div>
            <div className="col-md-4 themed-grid-col">
                <img className="mb-4" src="" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div className="form-label-group">
                  <input type="email" 
                    id="inputEmail" 
                    className="form-control"
                    placeholder="Email address" 
                    required="" 
                    autoFocus=""
                    onChange = {(e) => this.setState({username: e.target.value})}/>
                  <label></label>
                </div>
                <div className="form-label-group">
                <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Password" 
                    required=""
                    onChange = {(e) => this.setState({password: e.target.value})}/>
                <label></label>
                </div>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block"
                  onClick = {this.onSubmit}
                  type="submit">Sign in</button>
            </div>
            <div className="col-md-4 themed-grid-col"></div>
        </div>
      </form>
  </div>
    );
  }
}

export default connect(null, { user })(Login)