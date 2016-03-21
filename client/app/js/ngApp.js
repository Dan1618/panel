angular.module('myApp', ['ui.router', 'chart.js']).config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    //default
    $urlRouterProvider.otherwise("/main")
    $stateProvider
    .state('main', {
        url: "/main",
        templateUrl: "tmpl/main.html",
    })
    .state('statistics', {
        url: "/statistics",
        templateUrl: "tmpl/stats.html"
    })
    .state('other', {
        url: "/other",
        templateUrl: "tmpl/other.html"
    })
    .state('main.empInfo',{
        url: "/info",
        templateUrl: "tmpl/empInfo.html"
    })
}]);

angular.module('myApp').constant('URL', 'data/');