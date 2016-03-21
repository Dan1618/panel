//list of workers directive
angular.module('myApp').directive('empList', function () {
    return {
        templateUrl: "js/people/tmpl/empList.html",
        restrict: 'A'
    };
});