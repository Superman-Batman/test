/**
 * Created by lixu on 16/11/25.
 */
app.controller('createAnnouncementStateController', function ($$navbar, $rootScope, $state, $scope, $location, $$log, $$title, $$tabbar, $$toast, $$loading, $http, $$requestUrl, $stateParams) {
    $$log.debug('createAnnouncementStateController');
    $$log.info($scope);
    $$title.setTitle('新建公告');
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();
    $scope.announce = function ($scope) {
        $$loading.show();
        $http({
            method: 'POST',
            url: $$requestUrl.getUrl("createAnnouncementStateController"),
            data: {
                "title": $scope.title,
                "day": $scope.day,
                "startTime": Date.parse($scope.startTime),
                "content": $scope.content
            }
        }).success(function (response) {
            $$loading.hide();
            if (response.result.success === true) {
                $$toast.show("新建公告成功");
                // $state.go("messageListState");
                // history.go(-1);
                try {
                    webModel.backFrom("createAnnouncementState", location.hash);
                } catch (err) {

                }
                try {
                    window.webkit.messageHandlers.webModel.postMessage({
                        method: 'backFrom',
                        name: "createAnnouncementState",
                        url: location.hash
                    });
                } catch (err) {

                }
            } else {
                response.result.displaymsg ? $$toast.show(response.result.displaymsg) : $$toast.show("新建公告失败");
            }
            $$log.debug("create");
            $$log.info(response);
        });
    }
});
