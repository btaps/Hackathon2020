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
    { 
      "mode": "fastest;car",
      "waypoint0": "geo!37.78924,-122.39510",
      "waypoint1": "geo!37.786796,-122.398276",
      "representation": "display"
    },
    { "mode": "fastest;car",
      "waypoint0": "geo!37.789076,-122.396581",
      "waypoint1": "geo!37.787224,-122.394406",
      "representation": "display"
    },
    { "mode": "fastest;car",
      "waypoint0": "geo!37.785656,-122.396696",
      "waypoint1": "geo!37.787990,-122.393735",
      "representation": "display"
    },
    { "mode": "fastest;car",
      "waypoint0": "geo!37.787846,-122.399293",
      "waypoint1": "geo!37.785596,-122.396761",
      "representation": "display"
    },
    ]

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
          arrows: {fillColor: "red"}
        })

        let startMarker = new window.H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude
        })

        let endMarker = new window.H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude
        })
        map.addObjects([routeLine])
        new window.H.map.Marker(map.getCenter());
        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()})

        map.addLayer(defaultLayers.vector.normal.traffic)
      }
    }

    let router = platform.getRoutingService()
    routingParameters.map((routingParameter)=>{
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

// Add info bubble to the UI:
var bubble = new window.H.ui.InfoBubble({ lng: -122.3965, lat: 37.7871 }, {
                content: '<b>Hello World!</b>'
});
      console.log(window.H.ui)
      //window.H.ui.InfoBubble(bubble);

<<<<<<< HEAD
    let ui = window.H.ui.UI.createDefault(map, defaultLayers).getControl('zoom').setEnabled(false);
    // ui.f.zoom = false
    // ui.getControl('zoom').setEnabled(false)
=======
    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);
>>>>>>> 108df2d150545d8af66e729ebf3008b23c2f9391

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
