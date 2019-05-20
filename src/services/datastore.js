/* eslint-disable import/prefer-default-export */
import firebase from 'firebase';

// Set the configuration for your app
// TODO: Replace with your project's config object
const config = {
  apiKey: 'AIzaSyDIUUtf_-JF6-Lu48hprEgqSLj-nXM2WZM',
  authDomain: 'lab-3-react-notes.firebaseapp.com',
  databaseURL: 'https://lab-3-react-notes.firebaseio.com',
  projectId: 'lab-3-react-notes',
  storageBucket: 'lab-3-react-notes.appspot.com',
  messagingSenderId: '799084837185',
};
firebase.initializeApp(config);


// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    if (snapshot.val() == null) {
      database.ref('maxZ').set(0);
    }
    callback(snapshot.val());
  });
}

export function fetchZ(callback) {
  // When the database changes, the callback function is called with the value
  database.ref('maxZ').on('value', (snapshot) => {
    callback(snapshot.val());
  });
}

export function updateMaxZ(z) {
  database.ref('maxZ').set(z);
}

export function addNote(newTitle) {
//   database.ref('notes').push(note);
  const { key } = firebase.database().ref('notes').push();
  firebase.database().ref('notes').child(key).set({
    title: newTitle.title, text: '', x: 200, y: 400, zIndex: newTitle.zIndex,
  });
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function update(id, fields) {
  database.ref('notes').child(id).set(fields);
}

// export function updateZ(id, z) {
//   database.ref('notes').child(id).update(z);
// }
