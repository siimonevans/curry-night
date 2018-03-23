import React, { Component } from "react";
import { render } from "react-dom";
import GoogleMapReact from 'google-map-react'
import { markerStyle } from './marker-style.js';
const MapComponent = ({ text }) => <div style={ markerStyle }>{ text }</div>;

const Table = ({ items }) => (
  <div>
    <table>
      <tbody>
          <tr>
            <th>Venue</th>
            <th>Date</th>
            <th>Attendee count</th>
            <th>Captain</th>
            <th>Rating</th>
          </tr>
        {items.map(item => (
          <tr>
            <td>{item["gsx$venue"]["$t"]}</td>
            <td>{item["gsx$date"]["$t"]}</td>
            <td>{item["gsx$attendees"]["$t"]}</td>
            <td>{item["gsx$captain"]["$t"]}</td>
            <td>{item["gsx$rating"]["$t"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <a className="edit-data" target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1-5S5IVks0uIem8IlD3IOcf5TKsw5rpUeR2cZqNkf7XQ/edit#gid=0">Edit data</a>
  </div>
);

const Map = ({ items }) => (
  <div className='google-map'>
    <GoogleMapReact
      defaultCenter={{ 
        lat: 51.472067, 
        lng: -2.580673
      }}
      defaultZoom={ 13 } >
      {items.map(item => (
        <MapComponent
          lat={item['gsx$lat']['$t']}
          lng={item['gsx$lng']['$t']}
          text={item['gsx$venue']['$t']}
        />
      ))}
    </GoogleMapReact>
  </div>
);
        
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(
      "https://spreadsheets.google.com/feeds/list/1-5S5IVks0uIem8IlD3IOcf5TKsw5rpUeR2cZqNkf7XQ/od6/public/values?alt=json"
    )
      .then(data => data.json())
      .then(jsonData => {
        this.setState({
          data: jsonData.feed.entry.reverse()
        });
      });
  }
  render() {
    if (this.state.data.length > 0) {
      return (
        <div className="flex">
          <Table items={ this.state.data } /> 
          <Map items={ this.state.data } /> 
        </div>
      )
    }
    return <p>Loading curry madness...</p>;
  }
}

render(<App />, document.getElementById("root"));
