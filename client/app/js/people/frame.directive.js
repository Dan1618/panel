//piechart directive
angular.module('myApp').directive('frameDir', function () {
    function linker(scope, element, attrs){
        console.log(scope);
    };
    return {
        templateUrl: "js/people/tmpl/frame.html",
        restrict: 'A',
        transclude:true,
        link: linker,
        scope: {
            flagname:"@",
            mainctrl: "=",
            frameEditedFlag: "=",
            headerTittle: "@"
        }
    };
});

