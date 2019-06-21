import React from 'react'
import * as sendCredential from './service/sendCredentials';
import { connect } from 'react-redux';
import { user, setCurrentView } from '../redux/action';

class UpdateContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      designation: '',
      address: '',
      mobile: '',
      email: '',
      userId: '',
    }
    this.updateContact = this.updateContact.bind(this)
  }
  componentDidMount() {
    console.log("calling")
    this.loadContact(this.props.userId.userId!== ''? this.props.userId.userId: sessionStorage.getItem('userIds'));
  }
  loadContact() {
    console.log('session ',sessionStorage.getItem('userIds'))
    sendCredential.getContactInfo(this.props.userId.userId!== ''? this.props.userId.userId: sessionStorage.getItem('userIds'))
        .then(response => {
        console.log('Cnt', response);
        this.setState({
            name: response.body.name,
            designation: response.body.designation,
            address: response.body.address,
            mobile: response.body.mobile,
            email: response.body.email,
            userId : response.body.userId
        });
        }).catch(err => {
        console.log(err);
    });
}

updateContact(e) {
  const name = e.target.elements.name.value;
  const designation = e.target.elements.designation.value;
  const mobile = e.target.elements.mobile.value;
  const email = e.target.elements.email.value;
  const address = e.target.elements.address.value;
  sendCredential.updateContactInfo(this.props.userId.userId!== ''? this.props.userId.userId: sessionStorage.getItem('userIds'),name,designation,
  mobile,email,address)
        .then(response => {
        console.log('updCnt', response);
        }).catch(err => {
        console.log(err);
    });
}

  render() {
    return (
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h2 className="border-bottom border-gray"><i className="fas fa-user-edit"></i> Update Contact</h2><br></br>
        <form onSubmit={this.updateContact}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Name</label>
            <input type="text" className="form-control" name="name" placeholder="Name" defaultValue={this.state.name}/>
          </div>
          <div className="form-group col-md-6">
            <label >Designation</label>
            <input type="text" className="form-control" name="designation" placeholder="Designation" defaultValue={this.state.designation}/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Mobile</label>
            <input type="text" className="form-control" name="mobile" placeholder="Mobile" defaultValue={this.state.mobile}/>
          </div>
          <div className="form-group col-md-6">
            <label >Email</label>
            <input type="email" className="form-control" name="email" placeholder="Email" defaultValue={this.state.email}/>
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" name="address" placeholder="Address" defaultValue={this.state.address}/>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-warning" onClick={() => this.props.setCurrentView("contact")}>Back</button>
      </form>
      </div>
    )};
}
const mapStateToProps = store => {
  console.log('mapStateToProps UpdateContact', store)
  return { 
    userId: store.userId
  };
};
export default connect(mapStateToProps,{user, setCurrentView})(UpdateContact)