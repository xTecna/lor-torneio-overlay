import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Index from './pages/Index';
import Visual from './pages/Visual';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Index}/>
				<Route path='/:id' component={Visual}/>
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;