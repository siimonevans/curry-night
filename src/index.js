import React, { Component } from "react";
import { render } from "react-dom";
import GoogleMapReact from "google-map-react";
import { markerStyle } from "./map/marker-style.js";
const MapMarker = ({ text }) => <div style={ markerStyle }>{ text }</div>;
const dataSheet = "https://spreadsheets.google.com/feeds/list/1-5S5IVks0uIem8IlD3IOcf5TKsw5rpUeR2cZqNkf7XQ/od6/public/values?alt=json";

// Build table
const Table = ({ items }) => (
  <div>
    <table id="data-table">
      <tbody>
        <tr>
          <th>Venue</th>
          <th>Date</th>
          <th>Attendees</th>
          <th>Captain</th>
          <th>Rating</th>
        </tr>
        {items.map((item, i) => (
          <tr key={i} data-val={i}>
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

// Build map
const Map = ({ items }) => (
  <div className="google-map" id="google-map">
    <GoogleMapReact
      defaultZoom={13}
      defaultCenter={{ 
        lat: 51.468067, 
        lng: -2.589673
      }}
      options={{
        styles: require("./map/map-style.json"),
      }}
    >
    {items.map((item, i) => (

      // Add map markers
      <MapMarker key={i} data-val={i}
        lat={item["gsx$lat"]["$t"]}
        lng={item["gsx$lng"]["$t"]}
        text={i}
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

  componentDidUpdate() {

    // Highlight markers on table row hover
    function highlightMarker() {
      let i;

      function addRowHandlers() {
        let table = document.getElementById("data-table");
        let rows = table.getElementsByTagName("tr");

        for (i = 0; i < rows.length; i++) {
          let currentRow = table.rows[i];

          let createClickHandler = function(row) {
            return function() {
              let dataValue = row.dataset.val;
              let markers = document.getElementById("google-map").getElementsByTagName("div");

              // Remove hover class
              for (let i = 0; i < markers.length; i++) {
                markers[i].classList.remove("marker-hover");
              }

              // Add hover class to matched marker
              for (let i = 0; i < markers.length; i++) {
                if (markers[i].textContent === dataValue) {
                  markers[i].childNodes[0].classList.add("marker-hover");
                  break;
                }
              }
            }
          }

          // Fire on table row hover
          currentRow.onmouseover = createClickHandler(currentRow);
        }
      }
      addRowHandlers();
    }
    highlightMarker();
  }

  componentDidMount() {

    // Get data and store as state
    fetch(
      dataSheet
    )
      .then(data => data.json())
      .then(jsonData => {
        this.setState({
          data: jsonData.feed.entry
        });
      });
  }

  render() {
    if (this.state.data.length > 0) {

      // Show table and map if data is found
      return (
        <div className="flex">
          <div className="left">
            <h1>Torchbox Curry Night</h1>
            <Table items={ this.state.data } /> 
          </div>
          <Map items={ this.state.data } /> 
        </div>
      )
    }

    // Show loader until data is ready
    return <p className="loading">Loading curry madness...</p>;
  }
}

render(<App />, document.getElementById("root"));
