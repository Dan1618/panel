//factory counting jobs and locations
angular.module('myApp').factory('CountJobLocPieChart', ['URL', function (URL) {
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