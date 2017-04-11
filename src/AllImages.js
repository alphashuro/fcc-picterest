import React, { Component } from 'react';
import Grid from './Grid';
import { images } from './api';

class AllImages extends Component {
	state = {
		images: [],
	};

	componentDidMount() {
		this.subscription = images
			.getAll()
			.subscribe(images => this.setState({ images }));
	}

	componentWillUnmount() {
		this.subscription.unsubscribe();
	}

	render() {
		return <Grid images={this.state.images} />;
	}
}

export default AllImages;
