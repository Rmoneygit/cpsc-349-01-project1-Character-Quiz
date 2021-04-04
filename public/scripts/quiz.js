// good doc sample id=pFeUsFzuD2km0eptYTCK
const score = {};
function getResult(score) {
    let result;
    let largest = 0;
    for (const [key, value] of Object.entries(score)) {
        if (value > largest) {
            largest = value;
            result = key;
        }
    }
    return result;
}

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
                        let clickedElement = $(event.target);
                        let weights = clickedElement.data();
                        for (const [key, value] of Object.entries(weights)) {
                            if (isNaN(score[key])) {
                                score[key] = 0;
                            }
                            score[key] += parseInt(value, 10);
                        }
                        if (currentQuestion >= totalQuestions) {
                            window.location.replace(`result.html?result=${getResult(score)}`);
                        } else {
                            displayQna(data.qna[currentQuestion])
                        }
                        console.log(score)
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
        let dataHTML = '';
        for (const [key, value] of Object.entries(qna[i])) {
            if (key !== 'a') {
                dataHTML += `data-${key}='${value}' `
            }
        }
        choicesHTML +=
            `<button class="btn btn-outline-info btn-block text-left answer" type="button" ${dataHTML}>
            ${qna[i].a}
        </button>
        `;
    }
    answerContainerElement.html(choicesHTML);
}
function getTotalQuestion(quiz) {
    let total = 0;
    for (const [key, value] of Object.entries(quiz)) {
        total++;
    }
    return total;
}
loadQuiz();
