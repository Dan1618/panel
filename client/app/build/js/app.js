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
}]);

angular.module('myApp').constant('URL', 'data/');

//pobranie templatki
//angular.module('myApp').factory('TemplateService', function ($http, URL) {
//    var getTemplates = function () {
//        return $http.get(URL + 'templates.json');
//    };
//
//    return {
//        getTemplates: getTemplates
//    };
//}); 

//pobranie danych
//angular.module('myApp').factory('DataService', function ($http, URL) {
//    var getData = function () {
//        return $http.get(URL + 'employees.json');
//    };
//
//    return {
//        getData: getData
//    };
//});

//angular.module('myApp').factory('CountPieChart', function ($http, URL) {
//    var dataCount = function(emps){
//        console.log('x');
//        var locTab = [0,0,0,0];
//        var jobTab = [0,0,0,0];
//        angular.forEach(emps, function(value, key) {
//            switch (value.loc) {
//                case "Rzeszow":
//                    locTab[0]++;
//                    break;
//                case "Wroclaw":
//                    locTab[1]++;
//                    break;
//                case "Poznan":
//                    locTab[2]++;
//                    break;
//                case "Torun":
//                    locTab[3]++
//                    break;
//            }
//            switch (value.job) {
//                case "director":
//                    jobTab[0]++;
//                    break;
//                case "manager":
//                    jobTab[1]++;
//                    break;
//                case "salesman":
//                    jobTab[2]++;
//                    break;
//                case "accountant":
//                    jobTab[3]++;
//                    break;
//            }
//        });
//        return {
//            locTab : locTab,
//            jobTab : jobTab
//        }
//    };
//
//    return {
//        dataCount: dataCount
//    };
//});

//angular.module('myApp').controller('ContentCtrl', function ($scope, DataService, CountPieChart) {
//    var vm = this;
//    vm.removeEmp = removeEmp;
//    $scope.editFlag = false;
//    $scope.editWorkerCollapseFlag = true;
//    $scope.emps = [];
//    vm.emps=[    {"name" : "Jan", "surname" : "Aa", "job" : "manager", "loc" : "Poznan"},
//    {"name" : "Marian", "surname" : "Ab", "job" : "salesman", "loc" : "Wroclaw"},
//    {"name" : "Sylwia", "surname" : "Cc", "job" : "manager", "loc" : "Rzeszow"},
//    {"name" : "Mieczyslawa", "surname" : "Dc", "job" : "salesman", "loc" : "Poznan"}];
////        ,
////    {"name" : "Jan", "surname" : "Da", "job" : "salesman", "loc" : "Rzeszow"},
////    {"name" : "Renata", "surname" : "Dd", "job" : "director", "loc" : "Rzeszow"},
////    {"name" : "Marek", "surname" : "Ef", "job" : "director", "loc" : "Poznan"},
////    {"name" : "Julia", "surname" : "Fg", "job" : "salesman", "loc" : "Rzeszow"},
////    {"name" : "Jan", "surname" : "Fh", "job" : "director", "loc" : "Wroclaw"},
////    {"name" : "Jan", "surname" : "Fh", "job" : "accountant", "loc" : "Poznan"},
////    {"name" : "Jan", "surname" : "Fh", "job" : "accountant", "loc" : "Rzeszow"},
////    {"name" : "Jan", "surname" : "Fh", "job" : "accountant", "loc" : "Torun"},
////    {"name" : "Jan", "surname" : "Fh", "job" : "accountant", "loc" : "Torun"}];
//
//    $scope.fetchContent = function () {
//        DataService.getData().then(function (result) {
//            $scope.emps = result.data;
//            //function counting data for piechart
//            var pieChartResult = CountPieChart.dataCount($scope.emps);
//            $scope.dataChartLoc = pieChartResult.locTab;
//            $scope.dataChartJob = pieChartResult.jobTab;
//            $scope.$watchCollection("emps", function(){
//               var pieChartWatch = CountPieChart.dataCount($scope.emps);
//                $scope.dataChartLoc = pieChartWatch.locTab;
//                $scope.dataChartJob = pieChartWatch.jobTab;
//            });
//        });
//    };
//    
//    $scope.fetchContent();
//    
//    //funkcje listy
//    function removeEmp(emp){
//        var index = $scope.emps.indexOf(emp);
//        $scope.emps.splice(index, 1); 
//    };
//
//    
//    //funkcja wstrzykujaca dane do wykresu
//    $scope.labelsChartLoc = ["Rzeszow", "Wroclaw", "Poznan", "Torun"];
//    $scope.labelsChartJob = ["director", "manager", "salesman", "accountant"];
//});


//Dyrektywa wyswietlajaca liste
//angular.module('myApp').directive('empItem', function () {
//    return {
//        templateUrl: "data/templates.html",
//        restrict: 'A',
//        scope: {
//            editEmp: '&editEmp',
//            removeEmp: '&removeEmp',
//            emp: '='
//        },
//        controller: function($scope){
//
//        }
//    };
//});

//dyrektywa wyswietlajaca okno z edycja pracownika
//angular.module('myApp').directive('workerWindow', function () {
//    return {
//        templateUrl: "data/workerwindow.html",
//        restrict: 'A',
//        controller: function($scope){
//            $scope.clearEmpAddBox = function(newEmp){
//                newEmp.name = newEmp.surname = "";
//            };
//            $scope.addEmp = function(newEmp){
//                $scope.emps.push({
//                    name: newEmp.name,
//                    surname: newEmp.surname,
//                    job: newEmp.job,
//                    loc: newEmp.loc
//                });
//                newEmp.name = "";
//                newEmp.surname = "";
//                newEmp.job = "";
//                newEmp.loc = "";
//            };  
//            $scope.editEmp = function(emp){
//                //variables displayed at editworker window header
//                $scope.empEditName = emp.name;
//                $scope.empEditSurname = emp.surname;
//
//                //new scope for editworker window inputs
//                $scope.editedEmp ={};
//                $scope.editedEmp.name = emp.name;
//                $scope.editedEmp.surname = emp.surname;
//                $scope.editedEmp.job = emp.job;
//                $scope.editedEmp.loc = emp.loc;
//                
//                $scope.editWorkerCollapseFlag = true;
//                $scope.editFlag = true;
//                $scope.emp = emp;
//            };    
//            //zatwierdzenie edycji
//            $scope.doEditEmp = function(emp){
//                emp.name = $scope.editedEmp.name;
//                emp.surname = $scope.editedEmp.surname;
//                emp.job = $scope.editedEmp.job;
//                emp.loc = $scope.editedEmp.loc;
//                $scope.editFlag = false;
//                var pieChartResult = CountPieChart.dataCount($scope.emps);
//                $scope.dataChartLoc = pieChartResult.locTab;
//                $scope.dataChartJob = pieChartResult.jobTab;
////                $scope.dataCount();
//            };
//            //usuniecie edytowanego pracownika
//            $scope.removeEmpEdited = function(emp){
//                var index = $scope.emps.indexOf(emp);
//                $scope.emps.splice(index, 1); 
//                $scope.editFlag = false;
//            };
//            //clear
//            $scope.clearEmpEditBox = function(editedEmp){
//                editedEmp.name = editedEmp.surname = "";
//            };          
//            $scope.cancelEmpEdit = function(){
//                $scope.emp = "";
//                $scope.editFlag = false;
//            };
//            //collapse okienka po kliknieciu w header
//            $scope.editWorkerCollapse = function(){
//                $scope.editWorkerCollapseFlag = !$scope.editWorkerCollapseFlag;
//            };  
//        }
//    };
//});

////dyrektywa do wyswietlania piechart
//angular.module('myApp').directive('counterChart', function () {
//    return {
//        templateUrl: "data/counterchart.html",
//        restrict: 'A',
//        controller: function($scope){
//            $scope.countChartCollapseFlag = "true";
//            $scope.countChartCollapse = function() {
//                $scope.countChartCollapseFlag = !$scope.countChartCollapseFlag;
//            };
//        }
//    };
//});

angular.module('myApp').controller('PeopleCtrl', ['$scope', 'DataService', 'CountPieChart', function ($scope, DataService, CountPieChart) {
    var vm = this;
//    vm.removeEmp = removeEmp;
    $scope.editFlag = false;
    $scope.editWorkerCollapseFlag = true;
//    $scope.emps = [];
    $scope.emps=[    {"name" : "Jan", "surname" : "Aa", "job" : "manager", "loc" : "Poznan"},
    {"name" : "Marian", "surname" : "Ab", "job" : "salesman", "loc" : "Wroclaw"},
    {"name" : "Sylwia", "surname" : "Cc", "job" : "manager", "loc" : "Rzeszow"},
    {"name" : "Mieczyslawa", "surname" : "Dc", "job" : "salesman", "loc" : "Poznan"}];
//        ,
//    {"name" : "Jan", "surname" : "Da", "job" : "salesman", "loc" : "Rzeszow"},
//    {"name" : "Renata", "surname" : "Dd", "job" : "director", "loc" : "Rzeszow"},
//    {"name" : "Marek", "surname" : "Ef", "job" : "director", "loc" : "Poznan"},
//    {"name" : "Julia", "surname" : "Fg", "job" : "salesman", "loc" : "Rzeszow"},
//    {"name" : "Jan", "surname" : "Fh", "job" : "director", "loc" : "Wroclaw"},
//    {"name" : "Jan", "surname" : "Fh", "job" : "accountant", "loc" : "Poznan"},
//    {"name" : "Jan", "surname" : "Fh", "job" : "accountant", "loc" : "Rzeszow"},
//    {"name" : "Jan", "surname" : "Fh", "job" : "accountant", "loc" : "Torun"},
//    {"name" : "Jan", "surname" : "Fh", "job" : "accountant", "loc" : "Torun"}];

    
            var pieChartResult = CountPieChart.dataCount($scope.emps);
                    $scope.dataChartLoc = pieChartResult.locTab;
                $scope.dataChartJob = pieChartResult.jobTab;
    
//    $scope.fetchContent = function () {
//        DataService.getData().then(function (result) {
//            $scope.emps = result.data;
//            //function counting data for piechart
//            var pieChartResult = CountPieChart.dataCount($scope.emps);
//            $scope.dataChartLoc = pieChartResult.locTab;
//            $scope.dataChartJob = pieChartResult.jobTab;
//            $scope.$watchCollection("emps", function(){
//               var pieChartWatch = CountPieChart.dataCount($scope.emps);
//                $scope.dataChartLoc = pieChartWatch.locTab;
//                $scope.dataChartJob = pieChartWatch.jobTab;
//            });
//        });
//    };
    
//    $scope.fetchContent();

    $scope.$watchCollection("emps", function(){
        var pieChartWatch = CountPieChart.dataCount($scope.emps);
        $scope.dataChartLoc = pieChartWatch.locTab;
        $scope.dataChartJob = pieChartWatch.jobTab;
    });
    $scope.removeEmp = function (emp){
        var index = $scope.emps.indexOf(emp);
        $scope.emps.splice(index, 1); 
    };
//    function removeEmp(emp){
//        var index = $scope.emps.indexOf(emp);
//        $scope.emps.splice(index, 1); 
//    };

      $scope.radarlabels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  $scope.radardata = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
    
      $scope.barlabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.bardata = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
    
    //piechart labels
    $scope.labelsChartLoc = ["Rzeszow", "Wroclaw", "Poznan", "Torun"];
    $scope.labelsChartJob = ["director", "manager", "salesman", "accountant"];
}]);
//list of workers directive
angular.module('myApp').directive('empItem', function () {
    return {
        templateUrl: "js/people/tmpl/templates.html",
        restrict: 'A',
        scope: {
            editEmp: '&editEmp',
            removeEmp: '&removeEmp',
            emp: '='
        },
        controller: function($scope){

        }
    };
});
//directive displaying worker editing window
angular.module('myApp').directive('workerWindow', ['CountPieChart', function (CountPieChart) {
    return {
        templateUrl: "js/people/tmpl/workerwindow.html",
        restrict: 'A',
        controller: function($scope){
            $scope.clearEmpAddBox = function(newEmp){
                newEmp.name = newEmp.surname = "";
            };
            $scope.addEmp = function(newEmp){
                $scope.emps.push({
                    name: newEmp.name,
                    surname: newEmp.surname,
                    job: newEmp.job,
                    loc: newEmp.loc
                });
                newEmp.name = "";
                newEmp.surname = "";
                newEmp.job = "";
                newEmp.loc = "";
            };  
            $scope.editEmp = function(emp){
                //variables displayed at editworker window header
                $scope.empEditName = emp.name;
                $scope.empEditSurname = emp.surname;

                //new scope for editworker window inputs
                $scope.editedEmp ={};
                $scope.editedEmp.name = emp.name;
                $scope.editedEmp.surname = emp.surname;
                $scope.editedEmp.job = emp.job;
                $scope.editedEmp.loc = emp.loc;
                
                $scope.editWorkerCollapseFlag = true;
                $scope.editFlag = true;
                $scope.emp = emp;
            };    
            //confirm edition
            $scope.doEditEmp = function(emp){
                emp.name = $scope.editedEmp.name;
                emp.surname = $scope.editedEmp.surname;
                emp.job = $scope.editedEmp.job;
                emp.loc = $scope.editedEmp.loc;
                $scope.editFlag = false;
                var pieChartResult = CountPieChart.dataCount($scope.emps);
                $scope.dataChartLoc = pieChartResult.locTab;
                $scope.dataChartJob = pieChartResult.jobTab;
//                $scope.dataCount();
            };
            //removing edited worker
            $scope.removeEmpEdited = function(emp){
                var index = $scope.emps.indexOf(emp);
                $scope.emps.splice(index, 1); 
                $scope.editFlag = false;
            };
            //clear
            $scope.clearEmpEditBox = function(editedEmp){
                editedEmp.name = editedEmp.surname = "";
            };          
            $scope.cancelEmpEdit = function(){
                $scope.emp = "";
                $scope.editFlag = false;
            };
            //collapse window by clicking header
            $scope.editWorkerCollapse = function(){
                $scope.editWorkerCollapseFlag = !$scope.editWorkerCollapseFlag;
            };  
        }
    };
}]);
//piechart directive
angular.module('myApp').directive('counterChart', function () {
    return {
        templateUrl: "js/people/tmpl/counterchart.html",
        restrict: 'A',
        controller: function($scope){
            $scope.countChartCollapseFlag = "true";
            $scope.countChartCollapse = function() {
                $scope.countChartCollapseFlag = !$scope.countChartCollapseFlag;
            };
        }
    };
});
//factory counting jobs and locations
angular.module('myApp').factory('CountPieChart', ['$http', 'URL', function ($http, URL) {
    var dataCount = function(emps){
        var locTab = [0,0,0,0];
        var jobTab = [0,0,0,0];
        angular.forEach(emps, function(value, key) {
            switch (value.loc) {
                case "Rzeszow":
                    locTab[0]++;
                    break;
                case "Wroclaw":
                    locTab[1]++;
                    break;
                case "Poznan":
                    locTab[2]++;
                    break;
                case "Torun":
                    locTab[3]++
                    break;
            }
            switch (value.job) {
                case "director":
                    jobTab[0]++;
                    break;
                case "manager":
                    jobTab[1]++;
                    break;
                case "salesman":
                    jobTab[2]++;
                    break;
                case "accountant":
                    jobTab[3]++;
                    break;
            }
        });
        return {
            locTab : locTab,
            jobTab : jobTab
        }
    };

    return {
        dataCount: dataCount
    };
}]);
//factory getting data from url
angular.module('myApp').factory('DataService', ['$http', 'URL', function ($http, URL) {
    var getData = function () {
        return $http.get(URL + 'employees.json');
    };

    return {
        getData: getData
    };
}]);
angular.module('myApp').controller('StatsCtrl', ['$scope', function ($scope) {
    
  var json = {
    "series" : ['Series A', 'Series B'],
    "labels" : ["January", "February", "March", "April", "May", "June", "July"],
    "data" : [[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90]],
    "options" : {
        bezierCurve : false
    }
  }
  
  $scope.ocw = json;
  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
    
  
}]);