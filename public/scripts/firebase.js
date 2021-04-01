var firebaseConfig = {
    apiKey: "AIzaSyCKNY0WenexHkIbvfK4Ts38i9wEpX76DQU",
    authDomain: "character-quiz-6dc98.firebaseapp.com",
    projectId: "character-quiz-6dc98",
    storageBucket: "character-quiz-6dc98.appspot.com",
    messagingSenderId: "60714461875",
    appId: "1:60714461875:web:175e7792555ce85da59ec6"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var signInButtonElement = document.getElementById('sign-in');
var messageListElement = document.getElementById('messages');
var messageFormElement = document.getElementById('message-form');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var imageButtonElement = document.getElementById('submitImage');
var imageFormElement = document.getElementById('image-form');
var mediaCaptureElement = document.getElementById('mediaCapture');
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var signInSnackbarElement = document.getElementById('must-signin-snackbar');

signInButtonElement.addEventListener('click', signIn);
signOutButtonElement.addEventListener('click', signOut);

function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}
function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
}
function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
        return url + '?sz=150';
    }
    return url;
}
function authStateObserver(user) {
    if (user) { // User is signed in!
        // Get the signed-in user's profile pic and name.
        var profilePicUrl = getProfilePicUrl();
        var userName = getUserName();

        // Set the user's profile pic and name.
        userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
        userNameElement.textContent = userName;

        // Show user's profile and sign-out button.
        userNameElement.removeAttribute('hidden');
        userPicElement.removeAttribute('hidden');
        signOutButtonElement.removeAttribute('hidden');

        // Hide sign-in button.
        signInButtonElement.setAttribute('hidden', 'true');
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        userNameElement.setAttribute('hidden', 'true');
        userPicElement.setAttribute('hidden', 'true');
        signOutButtonElement.setAttribute('hidden', 'true');

        // Show sign-in button.
        signInButtonElement.removeAttribute('hidden');
    }
}
function saveQuiz(quiz) {
    // Add a new message entry to the database.
    return firebase.firestore().collection('quiz').add({
        name: getUserName(),
        text: messageText,
        profilePicUrl: getProfilePicUrl(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
        console.error('Error writing new message to database', error);
    });
}
// Loads chat messages history and listens for upcoming ones.

function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}
initFirebaseAuth();
function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
    return firebase.auth().currentUser.displayName;
}
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}


class Point {
    constructor(category, point) {
        this.category = category;
        this.point = point;
    }
}
class Qna {
    constructor(q, a) {
        this.q = q;
        this.a = a;
    }
}
class A {
    constructor(a) {
        this.a;
    }
}
class Quiz {
    constructor(title, qna, catList) {
        this.title = title;
        this.qna = qna;
        this.catList = catList;
    }
}
let qnaList = []
let catList = ['hobo', 'rich', 'omega rich']

//create category point system

let answer1 = [{ q: 'ok', 'hobo': 2 }, { q: 'im ok', 'rich': 3 }, { q: 'gud', 'rich': 3, 'hobo': 2 }, { q: 'gud', 'rich': 3, 'hobo': 1 }];
let answer2 = [{ q: 'happppppyyyyy', 'omega rich': 150 }, { q: 'not happy', 'hobo': 100 }, { q: 'happy', 'rich': 13, 'hobo': 2 }, { q: 'maybe', 'rich': 3, 'hobo': 5 }];
let qna1 = new Qna('you happy?', answer1);
let qna2 = new Qna('you happy!????', answer2);
qnaList.push(qna1)
qnaList.push(qna2)

let q = new Quiz(`Darryn's fav quiz`, qnaList, catList);
console.log(q)
