import React, {Component} from 'react';

import Overlay from './components/Overlay';
import Form from './components/Form';

class App extends Component {
  render(){
    return (
      <div id="content">
		  <Overlay />
		  <Form />
	  </div>
    )
  }
}

export default App;
