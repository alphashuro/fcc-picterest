import React, { Component } from 'react';
import Grid from './Grid';
import { images } from './api';

class MyImages extends Component {
	state = {
		images: [],
	};

	componentDidMount() {
		this.subscription = images
			.getMine()
			.subscribe(images => this.setState({ images }));
	}

	componentWillUnmount() {
		this.subscription.unsubscribe();
	}

	render() {
		return <Grid images={this.state.images} />;
	}
}

export default MyImages;
