
App.controller("PatientListController", function (db, aux) {

    var currentUser = aux.getFromLocalStorage('currentUser');

    if (!currentUser.role.check) return false;

    db.getPatientList();

});
