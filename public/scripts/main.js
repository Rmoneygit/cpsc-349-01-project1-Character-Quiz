$(document).on('click', '#submit', function (event) {
    event.preventDefault();
    // TODO
    // get title, Q, and A from the input fields and make it into a pure js obj (wont work if its not pure js, see firebase.js for example)
    // and call savequiz().
    let qna = $("#questions-and-answers").find("input");
    let qP = $("#question-prompt").find("input");
    let cats = $("#category-types").find("input");

    let qnaVals = [];
    let catVals = [];

    var i = 0;
    var j;
    var k;
    for (j = 0; j < cats.length; j++) {
        catVals.push($(cats[j]).val());
    }
    var flag = true;
    var weight = 0;

    // FSM to "parse" correct format
    //{ q: 'you happy?' }, { a: 'ok', 'hobo': 2 }, { a: 'im ok', 'rich': 3 }, { a: 'gud', 'rich': 3, 'hobo': 2 }, { a: 'gud', 'rich': 3, 'hobo': 1 }];
    while(i < qP.length) {
        // if the string passed in is ONLY a number, true. 'q1' is treated as a string.
        let isnum = /^\d+$/.test($(qP[i]).val());

        // If it's a prompt or a weight.
        if(!isnum) {
            // If the curr string has a string after it, it's a 'q', else an 'a'
            // implied to never go oob because the end of the array should ALWAYS be
            // a weight.
            if(isNaN($(qP[i + 1]).val())) {
                qnaVals.push({ q: $(qP[i]).val() });
            } else {
                qnaVals.push({ a: $(qP[i]).val() });
            }
            i++;
        } else {
            // if the val is non NaN
            // iterate through that small bit, pushing to the latest a value.
            k = i;
            console.log("This should be the a value.");
            console.log($(qP[i-1]).val());
            while(!isNaN( $(qP[k]).val() )) {
                weight = $(qP[k]).val() * 1;
                console.log("Printing weight at ", k);
                console.log(weight);
                k++;
            }
            i = k;
        }
    }
    saveQuiz($(qna[0]).val(), qnaVals, catVals);
});

document.getElementById('add-category').addEventListener("click", function (event) {
    event.preventDefault();
    let cats = $("#category-types").find("input");
    $('#category .panel .panel-body .form-group').last().after(`<div class="form-group"><input class="form-control" type="category-${cats.length + 1}" value="My Category ${cats.length + 1}"></div>`);
    updateAllCogs(event);
});
document.getElementById('delete-category').addEventListener("click", function (event) {
    event.preventDefault();
    if ($('#category .panel .panel-body .form-group').length == 1) {
        return;
    }
    $('#category .panel .panel-body .form-group').last().remove();
    updateAllCogs(event);
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
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function updateAllCogs(event) {
    event.preventDefault();
    let cogs = $(".btn.cog");
    cogs.each(function() {
        generateCogCat($(this));
    });
}
function generateCogCat(cog) {
    console.log('cog')
    let htmlStr = ``;
    let cats = $("#category-types").find("input");
    let parent = $(cog).parents(".input-group");
    let form_ctrl = parent.find(".form-control.answer");
    let drop_menu = parent.find(".dropdown-menu");
    form_ctrl.attr('type', cats.length);
    form_ctrl.attr('name', cats.length);
    form_ctrl.attr('data-answer', cats.length);
    let inputEls = drop_menu.find("input");
    let pointVals = [];
    var i;
    for (i = 0; i < cats.length; i++) {
        pointVals.push(0);
    }
    for (i = 0; i < inputEls.length; i++) {
        pointVals[i] = parseInt($(inputEls[i]).val());
    }
    console.log(pointVals);
    cats.each(function (i) {
        htmlStr += `<a class="dropdown-item">${$(this).val()}</a><input type="number" value="${pointVals[i]}" min="0" step="1" />`
    });
    drop_menu.html(htmlStr);
    spinner(drop_menu);
    drop_menu.find("input[type='number']").remove();
}
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
    last.after(`<div class="form-group">
    <div class="input-group">
        <input class="form-control answer" type="${answerVal}" name="${answerVal}" data-answer="${answerVal}">
        <div class="dropdown">
            <button class="btn cog" onclick="generateCogCat(event)" data-toggle="dropdown">
                <i class="fas fa-cogs"></i></a>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item">My Category</a>
                <input type="number" value="0" min="0" step="1" />
            </div>
        </div>
        <a class="btn btn-small remove" href="">
            <i class="fas fa-minus-circle"></i></a>
    </div>
</div>`);
});
function spinner(parent) {
    parent.find("input[type='number']").inputSpinner();
}
$('.dropdown-menu').click(function (e) {
    e.stopPropagation();
});
$('.dropdown-item').click(function (e) {
    e.preventDefault();
});
$(document).on('click', '.cog', function (event) {
    event.preventDefault();
});