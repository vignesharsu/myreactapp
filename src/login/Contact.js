import React from 'react'
import * as sendCredential from './service/sendCredentials';
import { connect } from 'react-redux';
import { user } from '../redux/action';
import Chart from "react-google-charts";
import axios from 'axios';
import image from '../api/uploads/default.png'


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          designation: '',
          address: '',
          mobile: '',
          email: '',
          userId: '',
          data: [],
          selectedFile: image,
          loaded:0
        }
    }

    handleBarClick(element, id){
        console.log(`The elem ${element.text} with id ${id} was clicked`)
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

    loadChart() {
        console.log('session ',sessionStorage.getItem('userIds'))
        sendCredential.getChartData(this.props.userId.userId!== ''? this.props.userId.userId: sessionStorage.getItem('userIds'))
            .then(response => {
            let data = [["Year", "Points", { role: "style" }]];
            response.forEach(obj => {
                data.push([obj.year, obj.points, "color: gray"]);
            });
            console.log('chart', data);
            this.setState({
                data
            });
            }).catch(err => {
            console.log(err);
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId.userId !== prevProps.userId.userId)
            this.loadContact();
    }

    componentDidMount() {
        if (this.props.userId.userId) this.loadContact();
        else this.props.user(sessionStorage.getItem('userIds')); //updating userIds from session

        this.loadChart(this.props.userId.userId!== ''? this.props.userId.userId: sessionStorage.getItem('userIds'));
        this.loadImage();
    }

    onChangeHandler = (e) =>{
        const imageFormObj = new FormData() 
        imageFormObj.append("userId", this.props.userId.userId!== ''? this.props.userId.userId: sessionStorage.getItem('userIds'));
        imageFormObj.append("image", e.target.files[0]);
        axios.post('http://localhost:4000/upload/addimg', imageFormObj)
        .then(res => {
            console.log('iiii',res)
          if (res) {
              this.loadImage();
            alert("Image has been successfully uploaded using multer");
          }
        })
        .catch((err) => {
            console.log('iiii',err)
          alert("Error while uploading image using multer");
        });
        }

        loadImage() {
            console.log('session ',sessionStorage.getItem('userIds'))
            sendCredential.getImage(this.props.userId.userId!== ''? this.props.userId.userId: sessionStorage.getItem('userIds'))
                .then(response => {
                console.log('imagess', response);
                let img = 'data:image/jpeg;base64,' + response.text;
                this.setState({
                    selectedFile : img
                });
                }).catch(err => {
                console.log(err);
            });
        }

  render() {
    return (
        // <div className="row mb-3">
        //     <div className="col-md-2 border-right">
        //     <div className="row">
        //     <div className="col-lg-12 text-xs-center">
        //     <img src={this.state.selectedFile} className="m-x-auto img-fluid img-circle" id="avtr" alt="avatar"/>
        //     <h6></h6>
        //     <label className="custom-file">
        //         <input type="file" id="file" className="custom-file-input" onChange={this.onChangeHandler}/>
        //         <span className="custom-file-control">Change Photo</span>
        //     </label>
        // </div> 
        //     </div>
        //     </div>
        //     <div className="col-md-6 themed-grid-col">
        //         <div className="my-3 p-3 bg-white rounded shadow-sm">
        //             <h6 className="border-bottom border-gray pb-2 mb-0">Profile information</h6>
        //             <div className="media text-muted pt-3">
        //                 <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        //                     <strong className="d-block text-gray-dark">Name</strong> {this.state.name}
        //                 </p>
        //             </div>
        //             <div className="media text-muted pt-3">
        //                 <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        //                     <strong className="d-block text-gray-dark">Designation</strong> {this.state.designation}
        //                 </p>
        //             </div>
        //             <div className="media text-muted pt-3">
        //                 <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        //                     <strong className="d-block text-gray-dark">Address</strong> {this.state.address}
        //                 </p>
        //             </div>
        //             <div className="media text-muted pt-3">
        //                 <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        //                     <strong className="d-block text-gray-dark">Mobile No</strong> {this.state.mobile}
        //                 </p>
        //             </div>
        //             <div className="media text-muted pt-3">
        //                 <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        //                     <strong className="d-block text-gray-dark">E-Mail</strong> {this.state.email}
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="col-md-4 themed-grid-col">
        //         <div className="my-3 p-3 bg-white rounded shadow-sm">
        //              <Chart chartType="Bar" width="100%" height="300px" data={this.state.data} />
        //         </div>
        //     </div>
        // </div>  
        <div className="my-3 p-3 bg-white rounded shadow-sm">
    <div className="row">
        <div className="col-md-4">
            <div className="profile-img">
                <img src={this.state.selectedFile} alt=""/>
                <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="profile-head">
                <h5>Welcome! {this.state.name}</h5>
                <h6>{this.state.designation}</h6>
                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col-md-2">
        </div>
    </div>
    <div className="row">
        <div className="col-md-4">
            <div className="profile-work">
                <p>WORK LINK</p>
                <a href="">Website Link</a><br></br>
                <p>SKILLS</p>
                <a href="">Web Designer</a><br></br>
                <a href="">Web Developer</a><br></br>
            </div>
        </div>
        <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Name</label>
                        </div>
                        <div className="col-md-6">
                            <p>{this.state.name}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Email</label>
                        </div>
                        <div className="col-md-6">
                            <p>{this.state.email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                            <p>{this.state.mobile}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Address</label>
                        </div>
                        <div className="col-md-6">
                            <p>{this.state.address}</p>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                        <Chart chartType="Bar" width="100%" height="300px" data={this.state.data} />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>       
    );
  }
}

const mapStateToProps = store => {
    console.log('mapStateToProps Contact', store)
    return { 
      userId: store.userId
    };
  };
export default connect(mapStateToProps, { user })(Contact)