import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: process.env.VUE_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_CONFIG_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_CONFIG_PROJECT_ID
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users')
const projectsCollection = db.collection('projects')
const sessionsCollection = db.collection('sessions')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    projectsCollection,
    sessionsCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}

