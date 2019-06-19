import React from 'react'
import Home from './home';
import Contact from './Contact';
import { connect } from 'react-redux';
import { setCurrentView } from '../redux/action';
import auth0Client from '../Auth';

class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
          currentView: this.props.pageload && this.props.pageload.currentView
        };
    }
    setCurrentView(currentView){
        this.setState({
            currentView
        });
    }

    componentDidUpdate(prevView){
        if(this.props.pageload.currentView !== prevView.pageload.currentView){
            this.setCurrentView(this.props.pageload.currentView);
        }
    }
   

    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    };

  render() {
    return (
    <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-navclr bd-navbar fixed-top">
                <a className="navbar-brand" href="#">Appl</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
        
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" onClick={() => this.props.setCurrentView('contact')}>Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => this.props.setCurrentView('home')}>Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <div className="input-group">
                        <input className="form-control " type="text" placeholder="Search" aria-label="Search"/>
                        <div className="input-group-prepend">
                            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-search"></i></div>
                        </div>
                    </div><br/>&nbsp;  
                        <button className="btn btn-info my-2 my-sm-0" type="button" onClick={() => {this.signOut()}} data-toggle="tooltip" data-placement="top" title="SignOut!"><i className="fas fa-sign-out-alt"></i></button>
                    </form>
                </div>
            </nav>
            <main role="main">
                <div className="jumbotron">
                    <div className="container">
                        {this.state.currentView === 'contact' ? <Contact /> : null }
                        {this.state.currentView === 'home' ?  <Home/> : null }
                    </div>
                </div>
            </main>
    </div>
    );
  }
}

const mapStateToProps = store => {
    console.log('mapStateToPropsss', store)
    return { 
        pageload: store.pageload
    };
  };

export default connect(mapStateToProps, { setCurrentView })(Main)