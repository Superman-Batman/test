/**
 * Created by lixu on 16/11/26.
 */
app.controller('messageContentStateController', function ($rootScope, $state, $scope, $location, $$log, $$title, $$tabbar, $$navbar, getData, $$loading, $http, $$requestUrl, $$toast, $stateParams, $$shence) {
    $$log.debug('messageContentStateController');
    $scope.data = getData.data;
    $$log.info($scope);
    $$title.setTitle('公告板');
    $$navbar.show();
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();
    $scope.startTime = new Date(parseInt($scope.data.startTime)).format("MM.dd");
    $scope.endTime = new Date(parseInt($scope.data.endTime)).format("MM.dd");


    //点击跳到编辑页面
    $scope.edit = function () {
        if (localStorage.authorizedStatus == 4 || localStorage.authorizedStatus == 5 || $scope.data.author.nurseId == localStorage.globalNurseId) {
            $state.go("editAnnouncementState", {eventId: $scope.data.eventId});
        } else {
            $$toast.show("请联系管理员");
            return false;
        }
    };
    if ($scope.data.readPerson != undefined) {
        for (var i = 0; i < $scope.data.readPerson.length; i++) {
            if ($scope.data.readPerson[i].nurseId == localStorage.globalNurseId) {
                $scope.read = true;
            }
        }
    }

    //点击我已读完
    $scope.readOverClick = function () {
        $$loading.show();
        $http({
            method: 'PATCH',
            url: $$requestUrl.getUrl("messageEvent", {id: $scope.data.eventId}),
            data: {
                "eventId": $scope.data.eventId,
                "read": true
            }

        }).success(function (response) {
            if (response.result.success === true) {
                // if ($scope.data.readPerson != undefined) {
                //     $scope.data.readPerson.length += 1;
                // } else {
                //     $scope.data.readPerson = [];
                //     $scope.data.readPerson.length = 1;
                // }
                $$loading.hide();
                console.log(response.result);
                var ls = {
                    time: 0
                };
                localStorage['messageListState'] = JSON.stringify(ls);
                localStorage['recentCalenderState'] = JSON.stringify(ls);
                history.go(-1);
                $scope.read = true;
            } else {
                response.result.displaymsg ? $$toast.show(response.result.displaymsg) : $$toast.show("请求失败");
            }
            $$log.debug("create");
            $$log.info(response);
        });
    }
});
