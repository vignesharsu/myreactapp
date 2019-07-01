import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as sendCredential from './service/sendCredentials';
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
    this.registerUser = this.registerUser.bind(this);
  }
  

  onSubmit() {
    sendCredential.getUserInfo(this.state.username, this.state.password)
      .then(response => {
          this.props.user(response.userId);
          sessionStorage.setItem('userIds',response.userId);
          this.props.history.push("/main");
      }).catch(err => {
        console.log(err);
      });
  }

   registerUser(e) {
    const user = e.target.elements.user.value;
    const password = e.target.elements.password.value;
    const name = e.target.elements.name.value;
    const designation = e.target.elements.designation.value;
    const mobile = e.target.elements.mobile.value;
    const email = e.target.elements.email.value;
    const address = e.target.elements.address.value;
    sendCredential.registerUser(user,password,name,designation,mobile,email,address)
        .then(response => {
        console.log('register', response);
        }).catch(err => {
        console.log(err);
    });
   }

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
                  <ul className="nav mb-3">
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="modal" data-target="#exampleModal" href="#">Sign Up!</a>
                    </li>
                  </ul>
            </div>
            <div className="col-md-4 themed-grid-col"></div>
        </div>
      </form>
          

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            <form onSubmit={this.registerUser}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Registration</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
             
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>UserName</label>
            <input type="text" className="form-control" name="user" placeholder="UserName" />
          </div>
          <div className="form-group col-md-6">
            <label >Password</label>
            <input type="text" className="form-control" name="password" placeholder="Password"/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Name</label>
            <input type="text" className="form-control" name="name" placeholder="Name" />
          </div>
          <div className="form-group col-md-6">
            <label >Designation</label>
            <input type="text" className="form-control" name="designation" placeholder="Designation"/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Mobile</label>
            <input type="text" className="form-control" name="mobile" placeholder="Mobile"/>
          </div>
          <div className="form-group col-md-6">
            <label >Email</label>
            <input type="email" className="form-control" name="email" placeholder="Email" />
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" name="address" placeholder="Address" />
        </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-success">Register</button>
              </div>
              </form>
            </div>
          </div>
        </div>

  </div>
    );
  }
}

export default connect(null, { user })(Login)