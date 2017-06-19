/**
 * Created by lsh on 16/12/30.
 */
app.controller('hefeiNurseToolStateController', function ($$navbar, $rootScope, $state, $scope, $location, $$log, getData, $$title, $$tabbar, $$confirm, $$toast,$$loading,$http,$$requestUrl,$stateParams) {
    $$title.setTitle("评估");
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();

    $scope.data = getData.data;
});