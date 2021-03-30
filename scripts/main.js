function addCategory() {
    $('#add-category').after("<p>Test</p>");
}
// $('#add-category').addEventListener("click", addCategory);
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
