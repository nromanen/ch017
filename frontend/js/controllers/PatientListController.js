
App.controller("PatientListController", function (localStorageService, db) {

    var currentUser = localStorageService.get('currentUser');

    if (!currentUser.role.check) return false;

    db.getPatientList();

});
