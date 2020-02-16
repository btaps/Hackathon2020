import React from 'react';
import {platform} from "../config/platform";

class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
  state = {
    map: null
  };

  componentDidMount() {
    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 52.51, lng: 13.4 },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    const routingParameters = {
      "mode": "fastest;car",
      "waypoint0": "geo!37.788555,-122.3965872",
      "waypoint1": "geo!37.786796,-122.398276",
      "representation": "display"
    }

    let onResult = function(result) {
      let route
      let routeShape
      let startPoint
      let endPoint
      let linestring
      
      if(result.response.route) {
        route = result.response.route[0]
        routeShape = route.shape
        linestring = new window.H.geo.LineString()
        routeShape.forEach(function(point) {
          let parts = point.split(',')
          linestring.pushLatLngAlt(parts[0], parts[1])
        })

        startPoint = route.waypoint[0].mappedPosition
        endPoint = route.waypoint[1].mappedPosition

        let routeLine = new window.H.map.Polyline(linestring, {
          style: {strokeColor: "red", lineWidth: 5}
        })

        let startMarker = new window.H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude
        })

        let endMarker = new window.H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude
        })

        map.addObjects([routeLine, startMarker])

        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()})
      }
    }

    let router = platform.getRoutingService()

    router.calculateRoute(routingParameters, onResult, function(err){
      alert(err.message)
    })

    const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });
  }

  componentWillUnmount() {
    this.state.map.dispose();
  }

  render() {
    return <div ref={this.mapRef} style={{ height: "500px" }} />;
  }
}


export default DisplayMapClass