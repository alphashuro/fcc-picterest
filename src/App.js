import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { auth } from './api';
import Nav from './Nav';
import AllImages from './AllImages';

const App = () => (
	<MuiThemeProvider>
		<Router>
			<div>
				<Nav />

				<div style={{ margin: 100 }}>
					<Route exact path="/" component={AllImages} />
				</div>
			</div>
		</Router>
	</MuiThemeProvider>
);

export default App;
