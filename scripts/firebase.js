function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}
function signOut() {
    firebase.auth().signOut();
}
function initFirebaseAuth() {
    firebase.auth().onAuthStateChanged(authStateObserver);
}
function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

function getUserName() {
    return firebase.auth().currentUser.displayName;
}
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}
function saveMessage(qna) {
    return firebase.firestore().collection('quizs').add({
        name: getUserName(),
        qna: qna,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
        console.error('Error writing new message to database', error);
    });
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
    constructor(qna, pointList) {
        this.qna = qna;
        this.pointList = pointList;
    }
}
let qnaList = []
let pointList = []

//create category point system
let p1 = new Point('hobo', 3);
let p2 = new Point('rich', 6);
let p3 = new Point('omega rich', 15);
pointList.push(p1)
pointList.push(p2)
pointList.push(p3)

let answer1 = [{ q: 'ok', 'hobo': 2 }, { q: 'im ok', 'rich': 3 }, { q: 'gud', 'rich': 3, 'hobo': 2 }, { q: 'gud', 'rich': 3, 'hobo': 1 }];
let answer2 = [{ q: 'happppppyyyyy', 'omega rich': 15 }, { q: 'not happy', 'hobo': 100 }, { q: 'happy', 'rich': 13, 'hobo': 2 }, { q: 'maybe', 'rich': 3, 'hobo': 5 }];
let qna1 = new Qna('you happy?', answer1);
let qna2 = new Qna('you happy!????', answer2);
qnaList.push(qna1)
qnaList.push(qna2)

let q = new Quiz(qnaList, pointList);
console.log(q)
