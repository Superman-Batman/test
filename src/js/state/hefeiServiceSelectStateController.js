/**
 * Created by lsh on 16/12/12.
 */

app.controller('hefeiServiceSelectStateController', function ($$navbar, $rootScope, $state, $scope, $location, $$log, getData, $$title, $$tabbar, $$toast,$$loading,$http,$$requestUrl,$stateParams) {
    $scope.data = getData.data;
    if ($scope.data.result.success == true) {
        $scope.serviceItemList = $scope.data.availableService.item;
    } else {

    }
    $$title.setTitle("可服务项目");
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();
});