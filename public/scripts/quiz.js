// good doc sample id=pFeUsFzuD2km0eptYTCK
let questionElement = $('#question');
let answerContainerElement = $('#answers');
let currentQuestion = 0;
let totalQuestions;

function loadQuiz() {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    console.log(id);
    if (id === null) {
        window.location.replace("404.html");
    } else {
        var docRef = db.collection("quiz").doc(id);
        docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                try {
                    console.log(data)
                    totalQuestions = getTotalQuestion(data.qna);
                    console.log(totalQuestions)
                    startQuiz(data);
                    $(document).on('click', '.answer', function (event) {
                        currentQuestion++;
                        if (currentQuestion >= totalQuestions) {
                            alert("quiz done");
                        } else {
                            displayQna(data.qna[currentQuestion])
                        }
                    });
                    return data;
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("No such document!");
                window.location.replace("404.html");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            window.location.replace("404.html");
        });
    }
}
function startQuiz(quiz) {
    qna = quiz.qna[0];
    console.log(qna)
    displayQna(qna);
}
function displayQna(qna) {
    // we chould add loading screem here
    questionElement.html(qna[0].q);
    let choicesHTML = '';
    for (var i = 1; i < qna.length - 1; i++) {
        choicesHTML +=
            `<button class="btn btn-outline-info btn-block text-left answer" type="button">
            ${qna[i].a}
        </button>
        `;
    }
    answerContainerElement.html(choicesHTML);
}
function getTotalQuestion(quiz) {
    let total = 0;
    for (const [key, value] of Object.entries(quiz)) {
        total++; quiz
    }
    return total;
}
loadQuiz();
