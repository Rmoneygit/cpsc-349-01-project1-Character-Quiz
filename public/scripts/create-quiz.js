
// working example

const quiz = {
    qna: {},
    appendQna: function (qna) {
        if (typeof this.index === 'undefined') {
            this.index = 0;
        }
        this.qna[this.index] = qna;
        this.index = this.index + 1;
        return this;
    },
    setCatList: function (catList) {
        this.catList = catList;
        return this;
    },
};

let qna1 = [{ q: 'you happy?' }, { a: 'ok', 'hobo': 2 }, { a: 'im ok', 'rich': 3 }, { a: 'gud', 'rich': 3, 'hobo': 2 }, { a: 'gud', 'rich': 3, 'hobo': 1 }];
let qna2 = [{ q: 'you happppppyyyyy?' }, { a: "omega happy", 'omega rich': 100 }, { a: 'not happy', 'hobo': 100 }, { a: 'happy', 'rich': 13, 'hobo': 2 }, { a: 'maybe', 'rich': 3, 'hobo': 5 }];

let qna = [{ 1: qna1 }, { 2: qna2 }]
let catList = ['hobo', 'rich', 'omega rich']
const q = Object.create(quiz);

q.title = "Example one";
q.catList = catList;
q.appendQna(qna1).appendQna(qna2)
console.log(q.title, q.qna, q.catList)
// saveQuiz(q.title, q.qna, q.catList);

function saveQuiz(title, qna, category) {
    // Add a new message entry to the database.
    return firebase.firestore().collection('quiz').add({
        title: title,
        // author: getUserName(),
        qna: qna,
        category: category,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
        console.error('Error writing new message to database', error);
    });
}

// console.log(getUserName())
setTimeout(() => { console.log(getUserName()) }, 5000);

// console.log(isUserSignedIn())

