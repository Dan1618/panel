angular.module('myApp').controller('RegistrationCtrl', ['$scope', 'getSetTokenFactory', 'userHandleService' , function ($scope, getSetTokenFactory, userHandleService) {
    var vm = this;
    vm.rForm = {};
    vm.loginForm = {};
    
    vm.register = register;
    vm.logout = logout;
    vm.login = login;
    
    //////////////
    
    function login() {
        userHandleService.login(vm.loginForm);
    }
    
    function register() {
        userHandleService.register(vm.rForm);
    }
    
    function logout() {
        getSetTokenFactory.setToken("");
        userHandleService.logout();
    }
}]);