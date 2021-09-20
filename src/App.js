import React from 'react';
import axios from 'axios';


class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: '',
      showLocInfo: false
    }
  }


  getLocFun = async (event) => {
    event.preventDefaulft();
    console.log("inside getLocFun");

    // let cityName = event.target.city.value;

    this.setState({
      searchQuery: event.target.city.value
    })

    console.log('key', process.env.REACT_APP_API_LOCATION_KEY);

    let reqUrl = 'https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_LOCATION_KEY}&q=${this.state.searchQuery}&format=json'

    let locResult = await axios.get(reqUrl);
    console.log('Location Result', locResult);
    console.log('data', locResult.data);
    console.log('data', locResult.data[0]);

    this.setState({
      locationResult: locResult.data[0],
      showLocInfo: true
    })
  }
  render() {
    return (
      <div>
        <h2>City Explorer app</h2>
        {/* <button onClick ={this.getLocFun}> Get Location</button> */}
        <form onSubmit={this.getLocFun}>
          <input type="text" name="city" />
          <input type="submit" value="Get City Info" />
        </form>

        {this.state.showLocInfo &&
        <>
        <p>City Name: {this.state.searchQuery}</p>
        <p>latitude: {this.state.locationResult.lat}</p>
        <p>longitude:{this.state.locationResult.lon} </p>
        <img src={'https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_LOCATION_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10'} alt="city" />
        </>

  }
      </div>
    )
  }
}

export default App;
