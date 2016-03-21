//factory getting data from url
//propably redundant (deprecated+) and need to be removed

angular.module('myApp').factory('DataService', ['$http', 'URL', function ($http, URL) {
    var getData = function () {
        return $http.get(URL + 'employees.json');
    };

    return {
        getData: getData
    };
}]);