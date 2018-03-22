import React, { Component } from "react";
import { render } from "react-dom";

const CurryNight = ({ items }) => (
  <div>
    <table>
      <tbody>
        {items.map(item => (
          <tr>
            <td>{item["gsx$venue"]["$t"]}</td>
            <td>{item["gsx$rating"]["$t"]}</td>
            <td>{item["gsx$location"]["$t"]}</td>
            <td>{item["gsx$date"]["$t"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
      return <CurryNight items={this.state.data} />;
    }
    return <p>Loading...</p>;
  }
}

render(<App />, document.getElementById("root"));
