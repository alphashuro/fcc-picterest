import firebase from 'firebase';
import { Observable } from 'rxjs';

var config = {
	apiKey: 'AIzaSyDcZGUeYNsgBTDjsW5D5f9C7t1r0-W9uUs',
	authDomain: 'fcc-bookjump.firebaseapp.com',
	databaseURL: 'https://fcc-bookjump.firebaseio.com',
	projectId: 'fcc-bookjump',
	storageBucket: 'fcc-bookjump.appspot.com',
	messagingSenderId: '662913130398',
};
firebase.initializeApp(config);

export const auth = {
	changes: Observable.using(firebase.auth, auth =>
		Observable.create(o => auth.onAuthStateChanged(o.next.bind(o)))),
	signin: Observable.using(
		() => new firebase.auth.TwitterAuthProvider(),
		provider =>
			Observable.using(firebase.auth, auth =>
				auth.signInWithPopup(provider))
	),
	signout: Observable.using(firebase.auth, auth => auth.signOut()),
};

export const images = {
	add({ title, url }) {
		const user = firebase.auth().currentUser;

		if (!user) {
			return;
		}

		return Observable.using(firebase.database, db => {
			const newImageId = db.ref().child('images').push().key;

			const updates = {
				[`users/${user.uid}/${newImageId}`]: {
					title,
					url,
				},
				[`images/${newImageId}`]: {
					title,
					url,
					userName: user.displayName,
					userId: user.uid,
					userImage: user.photoURL,
				},
			};

			return db.ref().update(updates);
		});
	},

	getAll() {
		return Observable.using(firebase.database, db =>
			Observable.fromEvent(db.ref('images'), 'value'))
			.map(s => s.val())
			.filter(Boolean)
			.map(images => {
				Object.keys(images).forEach(k => images[k].key = k);
				return images;
			})
			.map(Object.values);
	},

	getMine() {
		return auth.changes
			.filter(Boolean)
			.map(u => u.uid)
			.map(uid => firebase.database().ref('users').child(uid))
			.flatMap(ref => Observable.fromEvent(ref, 'value'))
			.map(s => s.val())
			.filter(Boolean)
			.map(images => {
				Object.keys(images).forEach(k => images[k].key = k);
				return images;
			})
			.map(Object.values);
	},

	remove(key) {
		const user = firebase.auth().currentUser;

		if (!user) {
			return;
		}

		return Observable.using(firebase.database, db => {
			return db.ref().update({
				[`users/${user.uid}/${key}`]: null,
				[`images/${key}`]: null,
			});
		});
	},

	like(key) {
		const user = firebase.auth().currentUser;

		if (!user) {
			return;
		}

		return Observable.using(firebase.database, db => {
			const userImageRef = db.ref(`users/${user.uid}/${key}`);
			const imageRef = db.ref(`images/${key}`);

			return Promise.all([
				toggleLike(userImageRef, user.uid),
				toggleLike(imageRef, user.uid),
			]);
		});
	},
};

function toggleLike(imageRef, uid) {
	return imageRef.transaction(function(image) {
		if (image) {
			if (image.likes && image.likes[uid]) {
				image.likeCount--;
				image.likes[uid] = null;
			} else {
				if (!image.likeCount) {
					image.likeCount = 1;
				} else {
					image.likeCount++;
				}
				if (!image.likes) {
					image.likes = {};
				}
				image.likes[uid] = true;
			}
		}
		return image;
	});
}
