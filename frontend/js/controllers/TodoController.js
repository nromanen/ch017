
App.controller("TodoController", function ($scope, $rootScope, localStorageService, $http, config) {

    $scope.roles = {};
    $scope.todoList = [];
    $scope.activePatientList = [];
    // this variable uses for edit todos and here will be new todo_item before save
    $scope.todoExample = {
        text: '',
        done: false,
        todo: []
    };

    init();

    function init() {
         //list of todos
        //$scope.todoList = localStorageService.get("todos_list") || [];

        $scope.allTodos = localStorageService.get("allTodos") || [[],[],[],[],[],[],[],[],[],[],[]];

        $scope.statusInSystem = localStorageService.get("statusInSystem");

        $rootScope.showTopPanel = true;
        $rootScope.currentUser = $scope.statusInSystem.first_name + ' ' + $scope.statusInSystem.last_name;
        $rootScope.userPhoto = config.serverUrl + config.imagesPath + $scope.statusInSystem.foto;

        if($scope.statusInSystem.role.name === "patient") {
            $rootScope.patientListHide = true;
        } else {
            $rootScope.patientListHide = false;
        }

        /* TEMP */
        $scope.roles = {
            doctor: {name: "Doctor", role: {name: "doctor", add: true, remove: true, check: true, edit: true}},
            nurse: {name: "Nurse", role: {name: "nurse", add: false, remove: false, check: true, edit: false}},
            patient: {name: "Patient", role: {name: "patient", add: false, remove: false, check: false, edit: false}}
        };
    }

    $scope.getPatients = (function() {

        var url = config.serverUrl + config.apiUrl + 'users_by_role/patient/?callback=JSON_CALLBACK';

        $http.jsonp(url).
        success(function(data, status) {

            /* *** I AM GETTING FROM DJANGO *** */
            /*
            data = {{An array of objects only with patients}};
            */
            
            $scope.patientList = data;
            
            $scope.patientList.sort(sortByAlphabet);

        }).
        error(function(data, status) {
            console.log('error');
        });

    })();

    //Sort function
    function sortByAlphabet(personA, personB) { //sort patient's by alphabet
        return personA.first_name > personB.first_name;
    }

    //active patient functions
    $scope.getActivePatient = function () { //get avtive patient (realy we don't need it now)
        $scope.currentPatient = this.patient.name;
    }
    
    $scope.setActivePatient = function(patientId) { //set activ patient
        $scope.activePatientList = $scope.allTodos[ patientId ];
    }

    //function update data in local storage after each change
    $scope.updateLocalStorage = function() {
        localStorageService.add('allTodos', $scope.allTodos);
    }

    //check rules
    $scope.canAddTodo = function () {
        return $scope.statusInSystem.role.add;
    };

    $scope.canEditTodo = function () {
        return $scope.statusInSystem.role.edit;
    };

    $scope.canRemoveTodo = function () {
        return $scope.statusInSystem.role.remove;
    };

    $scope.canCheckTodo = function () {
        return $scope.statusInSystem.role.check;
    };

    $scope.changeStatusInSystem = function(role) {
        $scope.statusInSystem = role;

        return role;
    };

    $scope.addNewTodo = function() {
        if (!$scope.todoExample.text) return false;

        $scope.activePatientList.push($scope.todoExample);
        $scope.todoExample = {
            text: '',
            done: false,
            todo: []
        };
        console.log($scope.activePatientList)
    };

    $scope.addNewDateTimeToTodo = function () {
        $scope.todoExample.todo.push({date: $scope.date, time: $scope.time})
    };

    $scope.getActiveTaskQuantity = function() {
        var count = 0;

        $scope.activePatientList.forEach(function(todo) {
            if (!todo.done) {
                ++count;
            }
        });
        return count;
    };

    $scope.clearDoneTodos = function() {
        $scope.activePatientList = $scope.activePatientList.filter(function(todo) {
            return !todo.done;
        });
    };

    $scope.removeTodo = function(index) {
        $scope.activePatientList.splice(index, 1);
    }

});
