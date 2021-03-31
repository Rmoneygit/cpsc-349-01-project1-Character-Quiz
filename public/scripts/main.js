document.getElementById('add-category').addEventListener("click", function (event) {
    event.preventDefault();
    $('#category .panel .panel-body .form-group').last().after(`<div class="form-group"><input class="form-control" type ="category"></div>`);
});
document.getElementById('delete-category').addEventListener("click", function (event) {
    event.preventDefault();
    if ($('#category .panel .panel-body .form-group').length == 1) {
        return;
    }
    $('#category .panel .panel-body .form-group').last().remove();
});
function addAsnwerListener() {
    // let addbtn = document.getElementsByClassName('add-answer');
    let addbtn = document.querySelectorAll(".add-answer")
    console.log(addbtn.length)
    addbtn.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            let parent = $(event.target).parents('.question');
            let last = parent.find('.form-group').last();
            let answerVal = last.find('input').data('answer');
            answerVal = parseInt(answerVal, 10) + 1;
            last.after(`<div class="form-group"><input class="form-control" type="${answerVal}" name="${answerVal}" data-answer="${answerVal}"></div>`);
        });
    });
}
addAsnwerListener();
document.getElementById('add-question').addEventListener("click", function (event) {
    event.preventDefault();
    let q = $(".question").last();
    let questionVal = q.data('question');
    questionVal = parseInt(questionVal, 10) + 1;
    q.data('question', questionVal);
    $('#question label').text(`Question ${questionVal}`);
    let str = `
    <div data-question="${questionVal}" class="question">
    <div class="form-group question>
    <label for="resultInput">Question ${questionVal}</label>
    <input class="form-control" type="question" name="question">
    </div>
    <div class="form-group">
    <label for="resultInput">Answers</label>
    <input class="form-control" type="1" name="1" data-answer="1">
    </div>
    <button class="btn btn-outline-primary add-answer">Add Answer</button>
    <hr class="mt-2 mb-3" />
    </div>`
    $('#add-question').before(str);
    addAsnwerListener();
});
function reset() {

}
// (function (window) {
//     'use strict';
//     var FORM_SELECTOR = '[data-coffee-order="form"]';
//     var App = window.App;

//     var FormHandler = App.FormHandler;
//     var formHandler = new FormHandler(FORM_SELECTOR);

//     formHandler.addSubmitHandler(function () {
//     });
// })(window);
