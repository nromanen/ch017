angular.module('patientList', [])
   .directive('list', function() {
       return {
           restrict: "E",
           templateUrl: './templates/userList.html'
       }
   });
