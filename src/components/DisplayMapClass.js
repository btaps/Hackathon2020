import React, {Component} from 'react';
import {platform} from "../config/platform";
import './DisplayMapClass.css'

class DisplayMapClass extends Component {
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
        zoom: 17.7,  //17.7
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
	  console.log(window.H)
    return (
        <div ref={this.mapRef} className='Map' />
    );
  }
}

export default DisplayMapClass
