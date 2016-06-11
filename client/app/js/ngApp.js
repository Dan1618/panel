angular.module('myApp', ['ui.router', 'chart.js']).config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    //default
    $urlRouterProvider.otherwise("/main")
    $stateProvider
    .state('main', {
        url: "/main",
        templateUrl: "tmpl/main.html"
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
    .state('signup', {
        url: "/signup",
        templateUrl: "tmpl/signup.html",
        data: { auth: "forUnloggedOnly"}
    })
}])

.run(function($rootScope, userHandleService){    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        var toStateVar = toState.data || false;
        if( toStateVar && toStateVar.auth === "forUnloggedOnly" && userHandleService.user.logged === "logged" ) {
            event.preventDefault();
            return false;
        }
    })
})

angular.module('myApp').constant('URL', 'data/');