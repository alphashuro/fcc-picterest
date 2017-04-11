import React, { Component } from 'react';
import { auth } from './api';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { Menu, MenuItem } from 'material-ui/Menu';

class ProfileMenu extends Component {
	state = {
		open: false,
		anchor: null,
	};

	constructor(props) {
		super(props);

		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	openMenu(e) {
		this.setState({ open: true, anchor: e.target });
	}

	closeMenu() {
		this.setState({ open: false });
	}

	logout() {
		auth.signout.subscribe(console.log, console.error);
	}

	render() {
		const { user } = this.props;
		const { open, anchor } = this.state;

		return (
			<div>
				<Button fab onClick={this.openMenu}>
					<Avatar
						alt={user.displayName}
						src={user.photoURL}
						style={{ width: '90%', height: '90%' }}
					/>
				</Button>
				<Menu
					anchorEl={anchor}
					open={open}
					onRequestClose={this.closeMenu}
				>
					<MenuItem onClick={this.logout}>
						Logout
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

const SignedIn = ({ user }) => (
	<div style={{ display: 'flex', alignItems: 'center' }}>
		<Button contrast key="1">All</Button>
		<Button contrast key="2">My Pics</Button>
		<Button contrast key="3">Add a Pic</Button>
		<Text key="4" colorInherit style={{ marginLeft: 20, marginRight: 20 }}>
			{user.displayName}
		</Text>
		<ProfileMenu key="5" user={user} />
	</div>
);

const Nav = ({ user, signin }) => (
	<AppBar>
		<Toolbar>
			<Text type="title" colorInherit style={{ flex: 1 }}>Picterest</Text>
			{user
				? <SignedIn user={user} />
				: <Button contrast onClick={signin}>
						Sign in with twitter
					</Button>}
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
