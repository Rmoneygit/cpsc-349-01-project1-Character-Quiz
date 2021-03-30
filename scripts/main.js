<<<<<<< HEAD
function addCategory() {
    $('#add-category').after("<p>Test</p>");
}
$('#add-category').addEventListener("click", addCategory);
=======
(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var App = window.App;

    var FormHandler = App.FormHandler;
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
      myTruck.createOrder.call(myTruck, data);
      checkList.addRow.call(checkList, data);
    });

    //formHandler.addInputHandler(Validation.isCompanyEmail);
    
  })(window);
>>>>>>> 95b77ed96da5bf5fc7d769f0a96b39a17e52dc4e
