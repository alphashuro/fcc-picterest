import React from 'react';
import { Card, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Text from 'material-ui/Text';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Avatar from 'material-ui/Avatar';
import DeleteIcon from 'material-ui-icons/Delete';
import { images } from './api';

const Image = ({ title, url, userName, userImage, userId, id }) => (
	<Card style={{ maxWidth: '23%', margin: 10 }}>
		<CardMedia>
			<img
				src={url}
				alt={title}
				width={350}
				height={300}
				onError={e =>
					e.target.src = 'http://placehold.it/350x300?text=Placeholder'}
			/>
		</CardMedia>
		<CardContent>
			<Text type="headline">{title}</Text>
			<Text type="subheading" secondary>{userName}</Text>
		</CardContent>
		{userId
			? <CardActions>
					<Avatar alt={userName} src={userImage} />
					<div style={{ flex: '1 1 auto' }} />
					<IconButton>
						<FavoriteIcon />
					</IconButton>
				</CardActions>
			: <CardActions>
					<div style={{ flex: '1 1 auto' }} />
					<IconButton
						onClick={() =>
							images
								.remove(id)
								.subscribe(console.log, console.error)}
					>
						<DeleteIcon />
					</IconButton>
				</CardActions>}
	</Card>
);

const Grid = ({ images }) => (
	<div style={{ display: 'flex', flexWrap: 'wrap' }}>
		{images.map(i => <Image {...i} id={i.key} key={i.key} />)}
	</div>
);

export default Grid;
