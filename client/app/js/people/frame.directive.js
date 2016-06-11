//piechart directive
angular.module('myApp').directive('frameDir', function () {
    function linker(scope, element, attrs){
    };
    return {
        templateUrl: "js/people/tmpl/frame.html",
        restrict: 'A',
        transclude:true,
        link: linker,
        scope: {
            flagname:"@",
            pplctrl: "=",
            frameEditedFlag: "=",
            headerTittle: "@"
        }
    };
});

