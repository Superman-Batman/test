/**
 * Created by lixu on 16/12/11.
 */
app.directive('hefeiPatientInfoController',function(){
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/hefeiPatientInfoController.html',
        replace: true,
        scope: {
            data: '=data'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $$loading, $$txIM, $$toast, $http, $$requestUrl, $stateParams, $state, $rootScope, $$title, $$confirm) {
            $scope.orderDetail = $scope.data.order;
            $scope.orderDate = new Date($scope.orderDetail.servingTime).format('yyyy-MM-dd hh:mm');

            if ($scope.data.order.availableAction != undefined) {
                var availableActions = $scope.data.order.availableAction;
                if (availableActions.length != undefined && availableActions.length > 0) {
                    for (var i = 0; i < availableActions.length; i++) {
                        if (availableActions[i].action == 'needHelp') {
                            $scope.needHelpBtn = {
                                "status": true,
                                "title": availableActions[i].title
                            }
                        }
                        if (availableActions[i].action == 'cancel') {
                            $scope.cancelBtn = {
                                "status": true,
                                "title": availableActions[i].title
                            }
                        }
                    }
                }
            }

            $scope.onCancelOrderClick = function () {
                $$confirm.show({
                    title: "请确认是否取消服务订单",
                    msg: '<textarea class="h3 background-color-white border-line border-color-gray" id="cancelReason" maxlength="200" rows="5" style="resize: none;line-height: 1.1rem !important;width: 80%;" placeholder="  请输入取消订单原因" </textarea>',
                    callback: function () {
                        var cancelReason = $('.confirm').find('textarea').val();
                        if (cancelReason.length == 0) {
                            $$toast.show("请输入取消订单原因！");
                        } else {
                            $$loading.show();
                            $http({
                                method: 'PATCH',
                                url: $$requestUrl.getUrl("hefeiNurseCancelOrder", {"orderId": $scope.data.order.orderId}),
                                data: {
                                    orderId: $scope.data.order.orderId,
                                    nurseId: parseInt(localStorage.globalNurseId),
                                    cancelReason: cancelReason
                                },
                                params: {
                                    orderId: $scope.data.order.orderId,
                                    nurseId: parseInt(localStorage.globalNurseId)
                                }
                            }).success(function (response) {
                                $$loading.hide();
                                if (response.result.success == true) {
                                    window.location.reload();
                                } else {
                                    $$toast.show(response.result.displaymsg ? response.result.displaymsg : '服务器扔过来一个错误');
                                }
                            })
                        }
                    },
                    cancelText: '取消',
                    confirmText: '确定'
                })
            };

            $scope.onApplyRunClick = function () {
                $$confirm.show({
                    title: "请确认是否申请运营介入",
                    msg: '<textarea class="h3 background-color-white border-line border-color-gray" id="applyReason" rows="5" maxlength="200" style="resize: none; line-height: 1.1rem !important; width: 80%;" placeholder="  请输入申请运营介入的原因" </textarea>',
                    callback: function () {
                        var applyReason = $('.confirm').find('textarea').val();
                        if (applyReason.length == 0) {
                            $$toast.show("请输入申请运营介入原因！");
                        } else {
                            $$loading.show();
                            $http({
                                method: 'PATCH',
                                url: $$requestUrl.getUrl("hefeiNurseApplyRun", {"orderId": $scope.data.order.orderId}),
                                data: {
                                    orderId: $scope.data.order.orderId,
                                    nurseId: parseInt(localStorage.globalNurseId),
                                    content: applyReason
                                },
                                params: {
                                    orderId: $scope.data.order.orderId,
                                    nurseId: parseInt(localStorage.globalNurseId)
                                }
                            }).success(function (response) {
                                $$loading.hide();
                                if (response.result.success == true) {
                                    window.location.reload();
                                } else {
                                    $$toast.show(response.result.displaymsg ? response.result.displaymsg : '服务器扔过来一个错误');
                                }
                            })
                        }
                    },
                    cancelText: '取消',
                    confirmText: '确定'
                })
            };

            $scope.isShowDesc = false;
            $scope.onShowDescClick = function () {
                $scope.isShowDesc = !$scope.isShowDesc;
            }
        }
    }
});