angular.module('myApp').service('userHandleService', ['$http', 'getSetTokenFactory', '$state', function($http, getSetTokenFactory, $state) {
    
    vm = this;
    
    this.user = {
        email: "",
        extra: "",
        logged: false
    }
    
    this.getUser = function(){
        return vm.user;
    }
    
    this.set = function(user) {
        vm.user = user;
    }
    
    this.login = function(data) {
        if(!data.email || !data.paswd){
            alert('Empty login form');
            return;
        }
        
        $http({
            method: 'POST',
            url: '/login',
            data: data
        }).then(function successCallback(response) {
            if(response.statusText === "OK") {
                if(response.data === "paswdIncorrect") {
                    alert('incorrect password');
                } else if ( response.data === "noSuchUser" ) {
                    alert('no such user')
                } else {
                    var token = response.data.token;
                    //function returning object with user data
                    var userData = vm.createUserData(response.data.email, response.data.extra);
                    getSetTokenFactory.setToken(token);
                    vm.set(userData);
                    
                    $state.go('main');
                }
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }
    
    this.register = function(data) {
        if(!data.paswd_confirm || !data.paswd || data.paswd_confirm !== data.paswd) {
            alert("wrong password field");
            return;
        }
        
        if(!data.email) {
            alert("fill email address field");
            return;
        }
        
        var dataToSend = angular.copy(data);
        delete dataToSend.paswd_confirm;
        
        $http({
            method: 'POST',
            url: '/register',
            data: dataToSend
        }).then(function successCallback(response) {
            if(response.statusText === "OK") {
                if(response.data === "userExists") {
                    alert("user already exists");
                } else {
                    var token = response.data.token;
                    //function returning object with user data
                    var userData = vm.createUserData(response.data.email, response.data.extra);
                    getSetTokenFactory.setToken(token);
                    vm.set(userData);
                    $state.go('main');
                }
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    }
    
    this.logout = function() {
        for (var member in vm.user) {
            vm.user[member] = "";
        }
        
        vm.user.logged = "unlogged";
    }
    
    this.tokenStart = function() {
        var token = getSetTokenFactory.getToken();
        
        if(token) {
            $http({
                method: 'POST',
                url: '/tokenStart',
                data: {token: token}
            }).then(function successCallback(response) {
                if(response.statusText === "OK"){
                    if(response.data === "no user decripted") {
                        //removing token when decription went wrong
                        getSetTokenFactory.setToken("");
                    } else {
                        //function returning object with user data
                        var userData = vm.createUserData(response.data.email, response.data.extra);
                        vm.set(userData);
                    }
                }
            }, function errorCallback(response) {
                console.error(response);
            });
        } else {
            vm.user.logged = "unlogged"
        }
    }
    
    //3. parameter optional
    this.createUserData = function(email, extra, logged) {
        
        if(logged || logged === undefined || logged === null) {
            logged = "logged";
        } else {
            logged = "unlogged"
        }
        
        return {
            email : email,
            extra : extra,
            logged : logged
        }
    }
}]);