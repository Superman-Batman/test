/**
 * Created by lixu on 16/11/28.
 */
app.controller('editAnnouncementStateController', function ($$navbar, $rootScope, $state, $scope, $location, $$log, $$title, $$tabbar,$http,$$requestUrl,$$toast,$$loading,getData) {
    $scope.data = getData.data;
    $$log.debug('editAnnouncementStateController');
    $$log.info($scope);
    $$title.setTitle('编辑公告');
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();
    $scope.announce=function($scope){
        $$loading.show();
        $http({
            method: 'PATCH',
            url: $$requestUrl.getUrl("updateAnnouncement", {id: $scope.eventId}),
            data: {
                'eventId': $scope.eventId,
                "title": $scope.title,
                "day": $scope.day,
                "startTime": Date.parse($scope.startTime),
                "content": $scope.content
            }
        }).success(function (response) {
            $$loading.hide();
            if (response.result.success === true) {
                console.log(response.result);
                $$toast.show("更改公告成功");
                // $state.go("messageListState");
                // history.go(-1);

                try {
                    webModel.backFrom("editAnnouncementState", location.hash);
                } catch (err) {

                }
                try {
                    window.webkit.messageHandlers.webModel.postMessage({
                        method: 'backFrom',
                        name: "editAnnouncementState",
                        url: location.hash
                    });
                } catch (err) {

                }
            } else {
                response.result.displaymsg ? $$toast.show(response.result.displaymsg) : $$toast.show("更改公告失败");
            }
            $$log.debug("update");
            $$log.info(response);
        });
    }
});