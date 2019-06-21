import React from 'react';
const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }

  getWeather = async (e) => {

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();   
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const response = await api_call.json();
    console.log(response);
    if(city && country){
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }else{
      this.setState({
        error: "Please input search values..."
      })
    }
  }

  render() {
    return (
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <h1 className="title-container__title">Weather Scanner </h1>
        <p className="title-container__subtitle"> Helps you find weather conditions in cities...  </p>
      <form onSubmit={this.getWeather}>
      <div className="form-row">
          <div className="form-group col-md-4">
          <label></label>
            <input type="text" name="city" className="form-control" placeholder="City..." />
          </div>
          <div className="form-group col-md-4">
            <label></label>
            <input type="text" name="country" className="form-control" placeholder="Country..." />
          </div>
          </div>
            <button  className="btn btn-primary">Get Weather</button>
        </form>
        <br></br>
        <div className="weather-info">
                {
                    this.state.country && this.state.city && <p className="d-block text-gray-dark border-bottom border-gray">Location: 
                        <span className="media-body pb-3 mb-0 small lh-125">  {this.state.city}, {this.state.country}</span>                    
                    </p> 
                }
                
                {
                    this.state.temperature && <p className="d-block text-gray-dark border-bottom border-gray">Temperature: 
                        <span className="media-body pb-3 mb-0 small lh-125">  {this.state.temperature}</span>
                    </p>
                }

                {
                    this.state.humidity && <p className="d-block text-gray-dark border-bottom border-gray">Humidity: 
                        <span className="media-body pb-3 mb-0 small lh-125">  {this.state.humidity}</span>
                    </p>
                }

                {
                    this.state.description && <p className="d-block text-gray-dark border-bottom border-gray">Conditions:  
                        <span className="media-body pb-3 mb-0 small lh-125">  {this.state.description}</span>
                    </p>
                }

                {
                    this.state.error && <p className="media-body pb-3 mb-0 small lh-125">{this.state.error}</p>
                }
        
            </div>

    </div>
    );
  }
}

export default Home;