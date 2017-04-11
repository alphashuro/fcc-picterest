import React from 'react';
import { Card, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Text from 'material-ui/Text';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Avatar from 'material-ui/Avatar';

const Image = ({ title, url, userName, userImage }) => (
	<Card style={{ maxWidth: '23%', margin: 10 }}>
		<CardMedia>
			<img src={url} alt={title} width={350} height={300} />
		</CardMedia>
		<CardContent>
			<Text type="headline">{title}</Text>
			<Text type="subheading" secondary>{userName}</Text>
		</CardContent>
		<CardActions>
			<Avatar alt={userName} src={userImage} />
			<div style={{ flex: '1 1 auto' }} />
			<IconButton>
				<FavoriteIcon />
			</IconButton>
		</CardActions>
	</Card>
);

const Grid = ({ images }) => (
	<div style={{ display: 'flex', flexWrap: 'wrap' }}>
		{images.map(i => <Image {...i} key={i.url} />)}
	</div>
);

export default Grid;
