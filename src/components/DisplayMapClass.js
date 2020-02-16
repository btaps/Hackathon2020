import React from 'react';
import RouteModels from '../models/RouteModels'
import {platform} from "../config/platform";
import './DisplayMapClass.css'

class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
  state = {
    map: null
  };

  componentDidMount() {
    
  // 500
  setInterval(()=>{
      this.fetchData()
    }, 5000)
    

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
    { // howard and 2nd to howard to hawthorne
      "mode": "fastest;car",
      "waypoint0": "geo!37.786759,-122.398254",
      "waypoint1": "geo!37.785880,-122.399374",
      "representation": "display",
      "intensity": 4, // Road 0
      "routeArrows": true
    },
    { // 2nd and minna to 2nd and folsom
      "mode": "fastest;car",
      "waypoint0": "geo!37.787846,-122.399293",
      "waypoint1": "geo!37.785596,-122.396761",
      "representation": "display",
      "intensity": 1, // Road 1
      "routeArrows": true
    },
    { // natoma and 1st to folsom and 1st
      "mode": "fastest;car",
      "waypoint0": "geo!37.789076,-122.396581",
      "waypoint1": "geo!37.787224,-122.394406",
      "representation": "display",
      "intensity": 1, // Road 2
      "routeArrows": true
    },
    { // fremont and howard to howard and 2nd
      "mode": "fastest;car",
      "waypoint0": "geo!37.78924,-122.39510",
      "waypoint1": "geo!37.786796,-122.398276",
      "representation": "display",
      "intensity": 1, // Road 3
      "routeArrows": true
    },
    { // 2nd and folsom to folsom and fremont
      "mode": "fastest;car",
      "waypoint0": "geo!37.785550,-122.396748",
      "waypoint1": "geo!37.787990,-122.393735",
      "representation": "display",
      "intensity": 1, // Road 4
      "routeArrows": true
    },
    { // 1st and folsom to 1st and harrison
      "mode": "fastest;car",
      "waypoint0": "geo!37.787296,-122.394487",
      "waypoint1": "geo!37.786114,-122.393009",
      "representation": "display",
      "intensity": 4, // Road 5
      "routeArrows": true
    },
    { // 2nd and folsom to 2nd and harrison
      "mode": "fastest;car",
      "waypoint0": "geo!37.785546,-122.396740",
      "waypoint1": "geo!37.784300,-122.395183",
      "representation": "display",
      "intensity": 4, // Road 6
      "routeArrows": true
    },
    { // folsom and hawthorne to 2nd and folsom
      "mode": "fastest;car",
      "waypoint0": "geo!37.784656,-122.397842",
      "waypoint1": "geo!37.785550,-122.396748",
      "representation": "display",
      "intensity": 4, // Road 7
      "routeArrows": true
    },
    {  //Traffic light: Howard and 2nd NE to SW
      "mode": "fastest;car",
      "waypoint0": "geo!37.786856,-122.398183",
      "waypoint1": "geo!37.786716,-122.398338",
      "representation": "display",
      "intensity": 12, // Light 0 horizontal
      "lineWidth": 10
    },
    {  //Traffic light: Howard and 2nd NW to SE
      "mode": "fastest;car",
      "waypoint0": "geo!37.786852,-122.398365",
      "waypoint1": "geo!37.786716,-122.398177",
      "representation": "display",
      "intensity": 11,// Light 0 vertical
      "lineWidth": 10
    },
    { // Traffic light: Howard and 1st NE to SW
      "mode": "fastest;car",
      "waypoint0": "geo!37.788616,-122.395926",
      "waypoint1": "geo!37.788471,-122.396099",
      "representation": "display",
      "intensity": 11, // Light 1 horizontal
      "lineWidth": 10
    },
    { // Traffic light: Howard and 1st NW to SE
      "mode": "fastest;car",
      "waypoint0": "geo!37.788616,-122.396120",
      "waypoint1": "geo!37.788484,-122.395954",
      "representation": "display",
      "intensity": 12, // Light 1 vertical
      "lineWidth": 10
    },
    { // Traffic light: Folsom and 1st SW to NE
      "mode": "fastest;car",
      "waypoint0": "geo!37.787263,-122.394546",
      "waypoint1": "geo!37.787395,-122.394358",
      "representation": "display",
      "intensity": 11, // Light 2 horizontal
      "lineWidth": 10
    },
    {  //Traffic light: Folsom and 1st NW to SE
      "mode": "fastest;car",
      "waypoint0": "geo!37.787378,-122.394572",
      "waypoint1": "geo!37.787233,-122.394406",
      "representation": "display",
      "intensity": 12, // Light 2 vertical
      "lineWidth": 10
    },
    {  //Traffic light: Folsom and 2nd SW to NE
      "mode": "fastest;car",
      "waypoint0": "geo!37.785453,-122.396858",
      "waypoint1": "geo!37.785678,-122.396638",
      "representation": "display",
      "intensity": 11, // Light 3 horizontal
      "lineWidth": 10
    },
    {  //Traffic light: Folsom and 2nd NW to SE
      "mode": "fastest;car",
      "waypoint0": "geo!37.785656,-122.396852",
      "waypoint1": "geo!37.785470,-122.396627",
      "representation": "display",
      "intensity": 12, // Light 3 vertical
      "lineWidth": 10
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
                              : routingParameter.intensity > 7 && routingParameter.intensity <= 10
		                ? "red"
		                : routingParameter.intensity === 11
		                  ? "green"
		                  : "red"

	 , lineWidth: routingParameter.lineWidth? routingParameter.lineWidth: 3}
         , lineTailCap: routingParameter.routeArrows? 'arrow-tail': ''
         , lineHeadCap: routingParameter.routeArrows? 'arrow-tail': ''
	  })
          let routeArrows = new window.H.map.Polyline(linestring, {
          style: {
	    lineWidth: 10,
	    fillColor: 'white',
	    strokeColor: 'rgba(255, 255, 255, 1)',
	    lineDash: [0, 2],
	    lineTailCap: 'arrow-tail',
	    lineHeadCap: 'arrow-head' }
	  }
	  )
          map.addObjects([routeLine, routeArrows])
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
    // Add info bubble to the UI:

    const ui = window.H.ui.UI.createDefault(map,defaultLayers)
    const hackathonMarker = new window.H.map.Marker({lat:37.7871,lng:-122.3965});
    
    hackathonMarker.setData("<p>Hackathon 2020<p>");
    hackathonMarker.addEventListener("tap", event=>{
      const bubble = new window.H.ui.InfoBubble(console.log(event.target), {
                content: event.target.getData()
             });
      ui.addBubble(bubble)
    }, false);

    map.addObject(hackathonMarker);             
    

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });
  }
  
  componentWillUnmount() {
    this.state.map.dispose();
  }

  fetchData = ()=>{
    RouteModels.all()
	  .then(data=> console.log(data))
  }

  render() {
    return <div ref={this.mapRef} className='Map' />;
  }
}


export default DisplayMapClass
