$(document).on('click', '#submit', function (event) {
    event.preventDefault();
    // TODO
    // get title, Q, and A from the input fields and make it into a pure js obj (wont work if its not pure js, see firebase.js for example)
    // and call savequiz().
});
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
    <label for="resultInput">Answers</label>
    <div class="form-group">
    <div class="input-group">
    <input class="form-control answer" type="1" name="1" data-answer="1">
    <a class="btn btn-small cog" href="">
    <i class="fas fa-cogs"></i></a>
    <a class="btn btn-small remove" href="">
    <i class="fas fa-minus-circle"></i></a>
    </div>
    </div>
    <button class="btn btn-outline-primary add-answer">Add Answer</button>
    <hr class="mt-2 mb-3" />
    </div>`
    $('#add-question').before(str);
    // addAsnwerListener();
});
function reset() {

}

$(document).on('click', '.cog', function (event) {
    event.preventDefault();
});
$(document).on('click', '.remove', function (event) {
    event.preventDefault();
    let parent = $(event.target).parents('.question');
    if (parent.find('.form-group').length <= 2) {
        return;
    }
    event.currentTarget.parentNode.parentNode.remove();
});
$(document).on('click', '.add-answer', function (event) {
    event.preventDefault();
    let parent = $(event.target).parents('.question');
    let last = parent.find('.form-group').last();
    let answerVal = last.find('input').data('answer');
    answerVal = parseInt(answerVal, 10) + 1;
    last.after(`<div class="form-group"><div class="input-group"><input class="form-control answer" type="${answerVal}" name="${answerVal}" data-answer="${answerVal}"><a class="btn btn-small cog" href="">
        <i class="fas fa-cogs"></i></a><a class="btn btn-small remove" href=""><i class="fas fa-minus-circle"></i></a></div></div>`);
});
$("input[type='number']").inputSpinner()
$('.dropdown-menu').click(function (e) {
    e.stopPropagation();
});
$('.dropdown-item').click(function (e) {
    e.preventDefault();
});