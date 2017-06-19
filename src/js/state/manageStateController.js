/**
 * Created by lixu on 16/11/16.
 */
app.controller('manageStateController',function($rootScope, $state, $scope,$location, $$log, $$title,$$tabbar,$$navbar,$$shence){
    $$log.debug('manageStateController');
    $$log.info($scope);
    $$shence.track('manageStateController');
    //配置页面信息
    $$navbar.setTitle('管理');
    $$navbar.show();
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();
    $scope.isAuthorized = (localStorage.authorizedStatus == "4" || localStorage.authorizedStatus == "5") ? true: false;
});
