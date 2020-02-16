import React from 'react';
import {platform} from "../config/platform";
import './DisplayMapClass.css'

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
        center: {lat: 37.7871, lng:-122.3965},
        zoom: 17.7,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    const routingParameters = [
    { // fremont and howard to howard and 2nd
      "mode": "fastest;car",
      "waypoint0": "geo!37.78924,-122.39510",
      "waypoint1": "geo!37.786796,-122.398276",
      "representation": "display",
      "intensity": 1
    },
    { // natoma and 1st to folsom and 1st
      "mode": "fastest;car",
      "waypoint0": "geo!37.789076,-122.396581",
      "waypoint1": "geo!37.787224,-122.394406",
      "representation": "display",
      "intensity": 1
    },
    { // 2nd and folsom to folsom and fremont
      "mode": "fastest;car",
      "waypoint0": "geo!37.785550,-122.396748",
      "waypoint1": "geo!37.787990,-122.393735",
      "representation": "display",
      "intensity": 1
    },
    { // 2nd and minna to 2nd and folsom
      "mode": "fastest;car",
      "waypoint0": "geo!37.787846,-122.399293",
      "waypoint1": "geo!37.785596,-122.396761",
      "representation": "display",
      "intensity": 1
    },
    { // 1st and folsom to 1st and harrison
      "mode": "fastest;car",
      "waypoint0": "geo!37.787296,-122.394487",
      "waypoint1": "geo!37.786114,-122.393009",
      "representation": "display",
      "intensity": 4
    },
    { // 2nd and folsom to 2nd and harrison
      "mode": "fastest;car",
      "waypoint0": "geo!37.785546,-122.396740",
      "waypoint1": "geo!37.784300,-122.395183",
      "representation": "display",
      "intensity": 4
    },
    { // folsom and hawthorne to 2nd and folsom
      "mode": "fastest;car",
      "waypoint0": "geo!37.784656,-122.397842",
      "waypoint1": "geo!37.785550,-122.396748",
      "representation": "display",
      "intensity": 4
    },
    { // howard and 2nd to howard to hawthorne
      "mode": "fastest;car",
      "waypoint0": "geo!37.786759,-122.398254",
      "waypoint1": "geo!37.785880,-122.399374",
      "representation": "display",
      "intensity": 4
    },
    ]


    let router = platform.getRoutingService()
    routingParameters.map((routingParameter)=>{
      let onResult = function(result) {
        let route
        let routeShape
        let linestring
        
        if(result.response.route) {
          route = result.response.route[0]
          routeShape = route.shape
          linestring = new window.H.geo.LineString()
          routeShape.forEach(function(point) {
            let parts = point.split(',')
            linestring.pushLatLngAlt(parts[0], parts[1])
          })
          // make call to backend to get traffic intensity to determine strokeColor and lineWidth
          
          let routeLine = new window.H.map.Polyline(linestring, {
            style: {
              strokeColor: routingParameter.intensity <= 3 
                            ? "blue"
                            : routingParameter.intensity > 3 && routingParameter.intensity <= 7
                              ? "orange"
                              : "red"

            , lineWidth: 3}
          })
          map.addObjects([routeLine])
          new window.H.map.Marker(map.getCenter());
          map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()})
        }
      }
      return(
        router.calculateRoute(routingParameter, onResult, function(err){
          alert(err.message)
	})
      )
    })
    //router.calculateRoute(routingParameters, onResult, function(err){
     // alert(err.message)
    //})



    var berlinMarker = new window.H.map.Marker({
      lat:37.7871,
      lng:-122.3965
    });
    map.addObject(berlinMarker);             


    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });
  }
  componentWillUnmount() {
    this.state.map.dispose();
  }

  render() {
    return <div ref={this.mapRef} className='Map' />;
  }
}


export default DisplayMapClass
