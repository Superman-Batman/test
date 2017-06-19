/**
 * Created by lixu on 16/11/28.
 */

app.directive('createAnnounceController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/createAnnounceController.html',
        replace: true,
        scope: {
            data: '=data',
            // type: '=type',
            announce: '=announce'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $$loading, $$txIM, $$toast, $http, $$requestUrl, $stateParams, $state, $rootScope, $$title, $$confirm) {
            //判断是新建公告还是编辑
            $scope.eventId = $scope.data.eventId || 0;
            $scope.title = $scope.data.title || '';
            // console.log(new Date($scope.data.endTime) - new Date($scope.data.startTime));
            $scope.startTime = $scope.data.startTime ? (new Date(parseInt($scope.data.startTime))) : (new Date());
            $scope.content = $scope.data.content || '';
            $scope.day = $scope.data.startTime ? Math.round(($scope.data.endTime - $scope.data.startTime) / 1000 / 60 / 60 / 24) : 1;
            $scope.setDate = function () {
                try {
                    var dDate = new Date();
                    dDate.setFullYear($scope.startTime.format('yyyy'), $scope.startTime.format('MM') - 1, $scope.startTime.format('dd'));
                    var minDate = new Date();
                    minDate.setFullYear(2016, 0, 1);
                    var maxDate = new Date();
                    maxDate.setFullYear(2018, 11, 31);
                    plus.nativeUI.pickDate(function (e) {
                        $scope.startTime = e.date;
                        $scope.setAdmissionTime();
                        $timeout(function () {
                            $scope.$apply();
                        }, 500);
                    }, function (e) {
                    }, {title: "请选择日期", date: dDate, minDate: minDate, maxDate: maxDate});
                } catch (e) {

                }
            };
            if ($scope.startTime != null) {
                if (typeof($scope.startTime) == 'number') {
                    $scope.startTime = new Date(parseInt($scope.startTime));
                } else {
                    // $scope.startTime = $scope.startTime;
                }
            } else {
                $scope.startTime = $scope.startTime || (new Date());
            }

            $scope.setAdmissionTime = function () {
                // $scope.startTime = $scope.startTime;
            };

            //点击发布int
            $scope.saveFollowUpRecord = function () {
                if ($scope.title == '' || typeof $scope.day != 'number' || $scope.content == '') {
                    $$toast.show('请检查信息后提交');
                    return false;
                } else {
                    var ls = {
                        time: 0
                    };
                    localStorage['messageListState'] = JSON.stringify(ls);
                    localStorage['recentCalenderState'] = JSON.stringify(ls);
                    $scope.announce($scope);
                }
            };
        }
    };
});