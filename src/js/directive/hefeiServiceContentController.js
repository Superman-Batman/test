/**
 * Created by gaoqz on 16/12/9.
 */

app.directive('hefeiServiceContentController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/hefeiServiceContentController.html',
        scope: {
            data: '=data',
            finish: '=finish'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $state, $$loading, $$txIM, $$color, $$confirm, $$toast, $http, $$requestUrl, $$showText) {
            $scope.actionContents = $scope.data.order.action;
            $scope.availableAction = $scope.data.order.availableAction;

            $scope.stateButton = function (action) {
                if ($scope.data.order.statusAction.statusType != 1 && $scope.data.order.statusAction.statusType != 4) {
                    action.isShowItem = !action.isShowItem;
                } else {
                    action.isShowItem = false;
                }
            };
            //
            // $scope.onShowBtnClick = function (item) {
            //     item.show = !item.show;
            // };

            $scope.onFinishClick = function (action) {
                $scope.finish($scope, action);
            };

            $scope.showSummary = function (info, type, toolId, actionId) {
                if (type == 6 || type == 7) {
                    if (info != undefined) {
                        var html = '<p class="padding-width-md h3">' + info.summary + '</p>';
                        $$confirm.show({
                            title: info.title,
                            msg: html,
                            callback: function () {

                            },
                            cancelText: '确定',
                            cancelBgColor: true,
                            hideConfirm: true
                        })
                    } else if (type == 7) {
                        if ($scope.data.order.statusAction.statusType == 5) {
                            $state.go("hefeiNurseTool", {orderId: $scope.data.order.orderId, patientId: $scope.data.order.patient.patientId, toolId: toolId, actionId: actionId});
                        } else {
                            $$toast.show("当前状态下订单无法操作！");
                        }
                    }
                }
            }
        }
    };
});
