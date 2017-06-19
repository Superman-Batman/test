/**
 * Created by lsh on 16/11/16.
 */
app.controller('statisticsCountStateController',function($rootScope, getData, $state, $scope,$location, $$log, $$title,$$tabbar,$$navbar,$$shence, $stateParams) {
    $scope.data = getData.data;
    $$navbar.showReturnBtn();
    $$tabbar.hide();
    $scope.type = $stateParams.statisticType;
    $$title.setTitle($scope.type == 'plan'? '康复计划': '康复工具');
});