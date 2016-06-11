angular.module('myApp').controller('PeopleCtrl', ['$scope', 'CountJobLocPieChart', '$interval', '$http' , function ($scope, CountJobLocPieChart, $interval, $http) {
    var vm = this;    
    
    //flags
    vm.workerwindowFlag = "true";
    vm.jobLocPieFlag = "true";
    vm.jobLocBarFlag = "true";
    vm.flowCollapseFlag = "true";
    vm.editWorkerCollapseFlag = true;
    vm.editFlag = false;
    vm.flowCollapseFlag = true;
    //data collection - employees
    vm.emps=[];

    //sorting emplyee liest flags
    vm.empsPredicateReverse = false;
    vm.empsPredicate = 'loc';
    
    //pie chart initialization
    var pieChartResult = CountJobLocPieChart.dataCount(vm.emps);
    vm.dataChartLoc = pieChartResult.locTab;
    vm.dataChartJob = pieChartResult.jobTab;
    vm.labelsChartLoc = ["Rzeszow", "Wroclaw", "Poznan", "Torun"];
    vm.labelsChartJob = ["director", "manager", "salesman", "accountant"];
    vm.pieChartOptions = {animationEasing: "easeOutQuart", animationSteps: 20};
    
    //bar chart initialization
    vm.jobLocBarLabelsLoc = ["Rzeszow", "Wroclaw", "Poznan", "Torun"];
    vm.jobLocBarLabelsJob = ["director", "manager", "salesman", "acc"];
    vm.jobLocBarSeries = ["Series A"];
    vm.jobLocBarJobs = [vm.dataChartJob];// pieChartResult.jobTab;
    vm.jobLocBarLocs = [vm.dataChartLoc];// pieChartResult.jobTab;
    
    //updating charts on data change
    $scope.$watchCollection(function () {
        return vm.emps;
    }, function () {
        var pieChartWatch = CountJobLocPieChart.dataCount(vm.emps);
        vm.dataChartLoc = pieChartWatch.locTab;
        vm.dataChartJob = pieChartWatch.jobTab;
        //barchart update
        vm.jobLocBarLocs = [vm.dataChartLoc];
        vm.jobLocBarJobs = [vm.dataChartJob];
    });
    
    //just one-liners
    vm.frameCollapseFlag = function(flagName) {vm[flagName] = !vm[flagName];};
    vm.editWorkerCollapse = function(){vm.editWorkerCollapseFlag = vm.editWorkerCollapseFlag;};  
    vm.clearEmpAddBox = function(newEmp){vm.newEmp.name = vm.newEmp.surname = "";};
    vm.clearEmpEditBox = function(editedEmp){editedEmp.name = editedEmp.surname = "";};
    
    vm.showEmpInfo = showEmpInfo;
    vm.orderList = orderList;
    vm.addEmp = addEmp;
    vm.removeEmp = removeEmp;
    vm.editEmp = editEmp;
    vm.doEditEmp = doEditEmp;
    vm.cancelEmpEdit = cancelEmpEdit;
    vm.removeEmpEdited = removeEmpEdited;
    vm.filterEmpsByFunc = filterEmpsByFunc;
    vm.findEmpList = findEmpList;

    
    //////////////
    
    function findEmpList() {
        $http({
            method: 'GET',
            url: '/getEmpList'
        }).then(function successCallback(response) {
            vm.emps = response.data;
        }, function errorCallback(response) {
            console.error(response);
        });
    }
    function addEmp(newEmp){
        vm.emp = angular.copy(newEmp);
        $http({
            method: 'POST',
            url: '/addEmp',
            data: vm.emp
        }).then(function successCallback(response) {
            if(response.statusText === "OK"){
                vm.emps.push(vm.emp);
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    };  
    function removeEmp(emp){
        var empToRemove = emp;
        $http({
            method: 'POST',
            url: '/removeEmp',
            data: empToRemove
        }).then(function successCallback(response) {
            if(response.statusText === "OK"){
                var index = vm.emps.indexOf(emp);
                vm.emps.splice(index, 1); 
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    };
    
//    //confirm edition
    function doEditEmp(emp){
        var request = { emp : emp,
                        updatedEmp : {
                            name : vm.editedEmp.name,
                            surname : vm.editedEmp.surname,
                            job : vm.editedEmp.job,
                            loc : vm.editedEmp.loc
                      }};
        $http({
            method: 'POST',
            url: '/doEditEmp',
            data: request
        }).then(function successCallback(response) {
            if(response.statusText === "OK"){
                emp.name = vm.editedEmp.name;
                emp.surname = vm.editedEmp.surname;
                emp.job = vm.editedEmp.job;
                emp.loc = vm.editedEmp.loc;
                
                vm.editFlag = false;
                
                // You need to invoke those methods because $watchcollection doesnt check value change; just structure of the object is changed
                // maybe todo
                var pieChartResult = CountJobLocPieChart.dataCount(vm.emps);
                vm.dataChartLoc = pieChartResult.locTab;
                vm.dataChartJob = pieChartResult.jobTab;
                vm.jobLocBarLocs = [vm.dataChartLoc];
                vm.jobLocBarJobs = [vm.dataChartJob];
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    };
    function removeEmpEdited(emp){
        var empToRemove = emp;
        $http({
            method: 'POST',
            url: '/removeEmp',
            data: empToRemove
        }).then(function successCallback(response) {
            if(response.statusText === "OK"){
                var index = vm.emps.indexOf(emp);
                vm.emps.splice(index, 1); 
                vm.editFlag = false;
            }
        }, function errorCallback(response) {
            console.error(response);
        });
    };
    
    function filterEmpsByFunc(){
        var filter = {};
        filter[vm.empsByType] = vm.filterEmpsBy;
        return filter;
    };
    function orderList(order){
        vm.empsPredicateReverse = (vm.empsPredicate === order) ? !vm.empsPredicateReverse : false;
        vm.empsPredicate = order;
    };
    function editEmp(emp){
        //variables displayed at editworker window header
        vm.empEditName = emp.name;
        vm.empEditSurname = emp.surname;

        //new scope for editworker window inputs
        vm.editedEmp ={};
        vm.editedEmp.name = emp.name;
        vm.editedEmp.surname = emp.surname;
        vm.editedEmp.job = emp.job;
        vm.editedEmp.loc = emp.loc;

        vm.editWorkerCollapseFlag = true;
        vm.editFlag = true;
        vm.emp = emp;
    };       
    function showEmpInfo(emp){
        //new scope for editworker window inputs
        vm.empInfo ={};
        vm.empInfo.name = emp.name;
        vm.empInfo.surname = emp.surname;
        vm.empInfo.job = emp.job;
        vm.empInfo.loc = emp.loc;
        vm.empInfo.extra = emp.extra;
    };
    //removing edited worker         
    function cancelEmpEdit(){
        vm.emp = "";
        vm.editFlag = false;
    };
}]);