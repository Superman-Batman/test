/**
 * Created by yihuan on 16/9/19.
 */
app.controller('toolListStateController', function ($rootScope, $state, $scope, getData, $location, $$log, $$title, $$tabbar, $$navbar, $$shence) {

    $$log.debug('toolListStateController');
    $$log.info($scope);
    $$shence.track('_toolListStateController');
    //配置页面信息
    $$navbar.setTitle('工作台');
    $$navbar.show();
    $$tabbar.setIndex(2);
    $$navbar.hideReturnBtn();
    followPatientObj = [];
    templateObj = {};
    runNurseObjArr = {};
    templateTime = '';
    globalTemplateData = {};
    classArr = [];
    orderObjArr = [];
    remindArr = [];
    admissionTime = null;
    sortType = 'new';

    $scope.changeToAPP = function (pageName) {
        $$log.debug('changeToAPP:' + pageName);
        try {
            webModel.reachPage(pageName, location.hash);
        } catch (err) {

        }
        try {
            window.webkit.messageHandlers.webModel.postMessage({
                method: 'reachPage',
                name: pageName,
                url: location.hash
            });
        } catch (err) {

        }
    };
    $scope.data = getData.data;

    $scope.onLinkOrder = function () {
        sessionStorage.setItem("index", 0);
        $state.go('hefeiOrderList');
    }
});
