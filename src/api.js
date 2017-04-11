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
				},
			};

			return db.ref().update(updates);
		});
	},
};
