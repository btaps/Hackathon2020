import React,{ Component} from 'react';
import HEREMap from 'here-maps-react';
import DisplayMapClass from './DisplayMapClass'

import './App.css';

class App extends Component {
 
  

  render(){
    return (
      <div className="App">
      <HEREMap
        appId='7pR7RVIIqdMu0lFizbzU'
      />
      </div>
    );
  }
}

export default App;
