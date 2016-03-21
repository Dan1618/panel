//dataflow directive
angular.module('myApp').directive('pplFlowButtons', function () {
    return {
        templateUrl: "js/people/tmpl/pplFlowButtons.html",
        restrict: 'A',
        transclude: true
    }
});