let label = $('#label');
let serachInput = $('#search-input');
function loadQuiz() {
    var url = new URL(window.location.href);
    var query = url.searchParams.get("query");
    console.log(query);
    if (query === null) {
        db.collection("quiz").limit(10).get().then((querySnapshot) => {
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
loadQuiz();
function displayQuiz(doc) {
    let id = doc.id
    let data = doc.data()
    let searchResultButton = `<a class="btn btn-secondary btn-block" class="search-result" type="button" href="quiz.html?id=${doc.id}">
<label for="title" class="title float-left">${data.title}</label>
<label for="author" class="author float-left">${data.author}</label>
<i class="fas fa-sign-in-alt"></i></a>
</a>`;
    label.after(searchResultButton)
}
$(document).on('click', '#search-btn', function (event) {
    event.preventDefault();
    query = serachInput.val();
    window.location.replace(`search.html?query=${query}`);
});