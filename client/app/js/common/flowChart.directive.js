//dataflow directive
angular.module('myApp').directive('flowChart', function () {
    return {
        templateUrl: "js/common/tmpl/dataFlowChart.html",
        restrict: 'A',
        controller: function($scope, $interval){
            $scope.timerStartStop = 1;
            var i =8;
            var json = {
                "series" : ['Series A', 'Series B'],
                "labels" : ["1", "2", "3", "4", "5", "6", "7"],
                "data" : [[50, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90]],
                "options" : {
                    bezierCurve : false,
                    animation: false,
                    pointDot : false
                }
            }
            $scope.ocw = json;
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
            
            
            $scope.StartTimer = function () {
                $scope.timerStartStop = !$scope.timerStartStop;
                //Initialize the Timer to run every 1000 milliseconds i.e. one second.
                $scope.Timer =$interval(function(){
                    var data1 = (Math.random() * (200 - 100) + 100)|0;
                    var data2 = (Math.random() * (200 - 100) + 100)|0;

                    $scope.ocw.data[0].push(data1);
                    $scope.ocw.data[1].push(data2);
                    $scope.ocw.labels.push(i++);
//                    $scope.ocw = json;
                }, 1000);
            };
 
            //Timer stop function.
            $scope.StopTimer = function () {
                $scope.timerStartStop = !$scope.timerStartStop;
                //Cancel the Timer.
                if (angular.isDefined($scope.Timer)) {
                    $interval.cancel($scope.Timer);
                }
            };
            
            $scope.resetFlowChart = function(){
                console.log($scope.ocw.data);
                $scope.ocw.data[0]=[''];
                $scope.ocw.data[1]=[''];
                $scope.ocw.labels = ["1"];
                i=2;
            }
        }
    }
});