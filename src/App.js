import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { auth } from './api';
import Nav from './Nav';

const App = () => (
	<MuiThemeProvider>
		<div>
			<Nav />
		</div>
	</MuiThemeProvider>
);

export default App;
