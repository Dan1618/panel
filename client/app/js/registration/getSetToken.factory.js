angular.module('myApp').factory('getSetTokenFactory', [ '$window', '$http', function($window, $http) {
    var store = $window.localStorage;
    var key = 'PL4A';
    
    vm = this;

    return {
        getToken: getToken,
        setToken: setToken
    };

    function getToken() {
      return store.getItem(key);
    }

    function setToken(token) {
      if (token) {
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    }
}]);