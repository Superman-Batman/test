/**
 * Created by lixu on 16/11/26.
 */
app.controller('messageListStateController', function ($rootScope, $state, $scope, $location, $$log, $$title, $$tabbar, $$navbar,getData,$$shence) {
    $$log.debug('messageListStateController');
    $scope.data=getData.data;
    $$log.info($scope);
    $$title.setTitle('公告板');
    $$navbar.show();
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();

});
