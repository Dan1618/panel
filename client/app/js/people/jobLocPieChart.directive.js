//piechart directive
angular.module('myApp').directive('jobLocPieChart', function () {
    return {
        templateUrl: "js/people/tmpl/jobLocPieChart.html",
        restrict: 'A'
    };
});