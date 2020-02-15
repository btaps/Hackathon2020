import * as React from 'react';
import {platform} from "./platform";

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };
  componentDidMount() {
    const defaultLayers = platform.createDefaultLayers();
    // Create an instance of the map
    const map = new window.H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
	center:{lat: 37.7874102, lng:-122.3974609},
        zoom: 17,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}

export default DisplayMapClass
