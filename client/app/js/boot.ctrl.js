angular.module('myApp').controller('BootController', ['getSetTokenFactory','userHandleService', '$http','$scope', '$state', function (getSetTokenFactory, userHandleService, $http, $scope, $state) {
    var vm = this;
    vm.user = {};
    
    $scope.$watch(
    function(){ return userHandleService.user.logged; }
    , 
    function (newValue, oldValue) {
        vm.logged = newValue;
        if(newValue !== oldValue) {
        
            if (newValue === "logged"){
                vm.user = userHandleService.getUser();
            }
        }
    }
    ,
    true);
    
    //checking session with token
    userHandleService.tokenStart();
}]);