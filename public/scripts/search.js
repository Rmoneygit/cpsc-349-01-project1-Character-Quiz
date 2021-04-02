let label = $('#label');
let serachInput = $('#search-input');
function loadQuiz() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore()
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(12);

    // Start listening to the query.
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'removed') {
                deleteMessage(change.doc.id);
            } else {
                var message = change.doc.data();
                displayMessage(change.doc.id, message.timestamp, message.name,
                    message.text, message.profilePicUrl, message.imageUrl);
            }
        });
    });
}
function initLoadQuiz() {
    var url = new URL(window.location.href);
    var query = url.searchParams.get("query");
    console.log(query);
    if (query === null) {
        db.collection("quiz").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                displayQuiz(doc);
            });
        });
    } else {
        serachInput.val(query);
        var quizRef = db.collection("quiz");
        var query = quizRef.where("title", ">=", query).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    displayQuiz(doc);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });;
    }
}
initLoadQuiz();
function displayQuiz(doc) {
    let id = doc.id
    let data = doc.data()
    let searchResultButton = `<button class="btn btn-secondary btn-block" class="search-result" type="button">
<label for="title" class="title float-left">${data.title}</label>
<label for="author" class="author float-left">${data.author}</label>
<i class="fas fa-sign-in-alt"></i></a>
</button>`;
    label.after(searchResultButton)
}
$(document).on('click', '#search-btn', function (event) {
    // event.preventDefault();
});