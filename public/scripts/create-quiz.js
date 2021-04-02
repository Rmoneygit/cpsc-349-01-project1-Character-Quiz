
// class Point {
//     constructor(category, point) {
//         this.category = category;
//         this.point = point;
//     }
// }
// class Qna {
//     constructor(q, a) {
//         this.q = q;
//         this.a = a;
//     }
//     toArray() {
//         let data = []
//         let question, answer = {}
//         question = { q: this.q }
//         answer =
//             data.push(question)
//         data.push(answer)
//         data(this.a)
//         return JSON.parse(JSON.stringify(data));
//     }
// }
// class A {
//     constructor(a) {
//         this.a;
//     }
// }
// class Quiz {
//     constructor(title, qna, category) {
//         this.title = title;
//         this.qna = qna;
//         this.category = category;
//     }
// }
// let qnaList = []
//create category point system

// let answer1 = [{ q: 'ok', 'hobo': 2 }, { q: 'im ok', 'rich': 3 }, { q: 'gud', 'rich': 3, 'hobo': 2 }, { q: 'gud', 'rich': 3, 'hobo': 1 }];
// let answer2 = [{ q: 'happppppyyyyy', 'omega rich': 150 }, { q: 'not happy', 'hobo': 100 }, { q: 'happy', 'rich': 13, 'hobo': 2 }, { q: 'maybe', 'rich': 3, 'hobo': 5 }];
// let qna1 = new Qna('you happy?', answer1);
// let qna2 = new Qna('you happy!????', answer2);
// qnaList.push(qna1)
// qnaList.push(qna2)


// let q = new Quiz(`Darryn's fav quiz`, qnaList, catList);
// console.log(q)
// console.log(qna1.toArray())


// TODO
// think of a good way to turn the above class obj into pure java obj without nested loops (firebase doesnt like it)

// working example
let qna1 = [{ q: 'you happy?' }, { a: 'ok', 'hobo': 2 }, { a: 'im ok', 'rich': 3 }, { a: 'gud', 'rich': 3, 'hobo': 2 }, { a: 'gud', 'rich': 3, 'hobo': 1 }];
let catList = ['hobo', 'rich', 'omega rich']

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
// saveQuiz("Darryn's fav", qna1, catList);



// console.log(getUserName())
setTimeout(() => { console.log(getUserName()) }, 5000);

// console.log(isUserSignedIn())

