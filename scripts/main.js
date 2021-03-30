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

(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var App = window.App;

    var FormHandler = App.FormHandler;
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function () {
        console.log('asdf')
    });

    //formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);
