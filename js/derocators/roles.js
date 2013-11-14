var Role = function() {

    function decoratorForDoctor(func) {
        return function () {

        };
    }

    function decoratorForNurse(func) {
        return function () {

        };
    }

    function decoratorForPatient(func) {
        return function () {

        };
    }

    return {
        decoratorForDoctor: decoratorForDoctor,
        decoratorForNurse: decoratorForNurse,
        decoratorForPatient: decoratorForPatient
    }

};
