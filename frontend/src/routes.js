import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SaveStateProvider from './context/SaveState';
import TimeProvider from './context/Time';

import Index from './pages/Index';
import Visual from './pages/Visual';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<SaveStateProvider>
					<TimeProvider>
						<Route exact path='/' component={Index}/>
						<Route path='/:id' component={Visual}/>
					</TimeProvider>
				</SaveStateProvider>
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;