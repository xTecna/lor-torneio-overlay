import React, {Component} from 'react';
import {ThemeProvider} from 'styled-components';

import Overlay from './components/Overlay';
import Form from './components/Form';

const theme = {
	webcamSize: 20
};

class App extends Component {
  render(){
    return (
      <div id="content">
		  <ThemeProvider theme={theme}>
			  <Overlay />
			  <Form />
		  </ThemeProvider>
	  </div>
    )
  }
}

export default App;
