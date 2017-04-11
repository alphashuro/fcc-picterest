import React, { Component } from 'react';
import { auth } from './api';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';

const Nav = ({ user, signin }) => (
	<AppBar>
		<Toolbar>
			<Text type="title" colorInherit style={{ flex: 1 }}>Picterest</Text>
			<Button contrast onClick={signin}>
				Sign in with twitter
			</Button>
		</Toolbar>
	</AppBar>
);

class NavContainer extends Component {
	state = {
		user: null,
	};

	constructor(props) {
		super(props);

		this.signin = this.signin.bind(this);
	}

	componentDidMount() {
		auth.changes.subscribe(user => {
			this.setState({ user });
		});
	}

	signin() {
		auth.signin.subscribe(console.log, console.error);
	}

	render() {
		return <Nav user={this.state.user} signin={this.signin} />;
	}
}

export default NavContainer;
