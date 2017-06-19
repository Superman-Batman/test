/**
 * Created by lsh on 16/12/13.
 */
app.controller('hefeiServiceConfigStateController', function ($$navbar, $rootScope, $state, $$showText, $$confirm, getData, $scope, $location, $$log, $$title, $$tabbar, $$toast,$$loading,$http,$$requestUrl,$stateParams) {
    $$title.setTitle("服务设置管理");
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();

    $scope.data = getData.data;

    console.log($scope.data.hotline)
    $scope.connectPlatform = function () {

        $$confirm.show({
            title: '请联系运营平台进行结算',
            msg: '<p class="padding-width-md h2" style="line-height: 1.7">目前不支持线上提现，请联系客服 <a style="color: #108ee9;" href="tel:'+ $scope.data.hotline +'">'+ $scope.data.hotline +'</a> 进行收益结算。结算周期为订单结束后一个月。</p>',
            callback: function () {

            },
            cancelText: '确定',
            cancelBgColor: true,
            hideConfirm: true
        })
    };

    $scope.onReceiveInfoClick = function () {
        $scope.data.pushServiceStatus = !$scope.data.pushServiceStatus;
        $http({
            method: 'PATCH',
            url: $$requestUrl.getUrl("hefeiPushService", {nurseId: parseInt(localStorage.globalNurseId)}),
            data: {
                nurseId: parseInt($stateParams.nurseId)
            },
            params: {
                nurseId: parseInt(localStorage.globalNurseId)
            }
        }).success(function (response) {
            if (response.result.success != true) {
                $$toast.show(response.result.displaymsg? response.result.displaymsg: '服务器扔过来一个错误');
                $scope.data.pushServiceStatus = !$scope.data.pushServiceStatus;
            }
        });
    };

    $scope.score = $scope.data.aveScore || 0;
    $scope.availableItemNum = 0;

    if ($scope.data.availableService.item != undefined && $scope.data.availableService.item.length > 0) {
        for (var i=0; i< $scope.data.availableService.item.length; i++) {
            if ($scope.data.availableService.item[i].status == 1) {
                $scope.availableItemNum++;
            }
        }
    }
});