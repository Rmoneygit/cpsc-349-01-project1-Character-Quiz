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