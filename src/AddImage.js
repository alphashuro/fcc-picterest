import React, { Component } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { images } from './api';

export default class AddImageButton extends Component {
	state = {
		open: false,
		title: '',
		url: '',
	};

	handleRequestClose = () => this.setState({ open: false });

	add = () => {
		const image = {
			title: this.state.title,
			url: this.state.url,
		};

		images.add(image).subscribe({
			next(result) {
				console.log(result);
			},
			error(e) {
				console.error(e);
			},
			complete: () =>
				this.setState({
					open: false,
					title: '',
					url: '',
				}),
		});
	};

	render() {
		return (
			<div>
				<Button
					{...this.props}
					onClick={() => this.setState({ open: true })}
				>
					Add a Pic
				</Button>
				<Dialog
					open={this.state.open}
					onRequestClose={this.handleRequestClose}
				>
					<DialogTitle>
						Add an image
					</DialogTitle>
					<DialogContent>
						<TextField
							label="Image title"
							placeholder="My great image"
							style={{ marginRight: 10 }}
							onChange={e =>
								this.setState({ title: e.target.value })}
						/>
						<TextField
							label="Image URL"
							placeholder="https://image.com/nice"
							onChange={e =>
								this.setState({ url: e.target.value })}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.add} primary>
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
