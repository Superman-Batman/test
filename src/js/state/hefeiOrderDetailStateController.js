/**
 * Created by lsh on 16/12/13.
 */
app.controller('hefeiOrderDetailStateController', function ($$navbar, $rootScope, $state, $scope, $location, $$log, getData, $$title, $$tabbar, $$confirm, $$toast,$$loading,$http,$$requestUrl,$stateParams) {
    $$title.setTitle("订单详情");
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();

    $scope.data = getData.data;

    if ($scope.data.order != undefined) {
        if ($scope.data.order.availableAction != undefined) {
            var availableActions = $scope.data.order.availableAction;
            if (availableActions.length != undefined && availableActions.length > 0) {
                for (var i = 0; i < availableActions.length; i++) {
                    if (availableActions[i].action == 'accept') {
                        $scope.acceptBtn = {
                            "status": true,
                            "title": availableActions[i].title
                        }
                    }
                    if (availableActions[i].action == 'agreeRefund') {
                        $scope.acceptRefundBtn = {
                            "status": true,
                            "title": availableActions[i].title
                        }
                    }
                    if (availableActions[i].action == 'completeOrder') {
                        $scope.completeBtn = {
                            "status": true,
                            "title": availableActions[i].title
                        }
                    }
                }
            }
        }
    } else {
        $$toast.show("服务器错误!");
    }

    $scope.refund = function (isAgree) {
        if (isAgree == false) {
            $$confirm.show({
                title: '请输入拒绝退款的原因',
                msg: '<textarea class="h3 background-color-white border-line border-color-gray" id="refundReason" rows="5" maxlength="200" style="resize: none;line-height: 1.1rem !important;width: 80%;" placeholder="  输入拒绝退款原因" </textarea>',
                callback: function () {
                    var refundReason = $('.confirm').find('textarea').val();
                    if (refundReason.length == 0) {
                        $$toast.show("请输入拒绝退款原因!");
                    } else {
                        $$loading.show();
                        $http({
                            method: 'PATCH',
                            url: $$requestUrl.getUrl("hefeiNurseRefundOperation", {"orderId": $scope.data.order.orderId}),
                            data: {
                                "orderId": $scope.data.order.orderId,
                                "nurseId": parseInt(localStorage.globalNurseId),
                                "isAgree": Boolean(isAgree),
                                "content": refundReason
                            },
                            params: {
                                orderId: $scope.data.order.orderId
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
                }
            })
        } else {
            $$loading.show();
            $http({
                method: 'PATCH',
                url: $$requestUrl.getUrl("hefeiNurseRefundOperation", {"orderId": $scope.data.order.orderId}),
                data: {
                    "orderId": $scope.data.order.orderId,
                    "nurseId": parseInt(localStorage.globalNurseId),
                    "isAgree": Boolean(isAgree)
                },
                params: {
                    orderId: $scope.data.order.orderId
                }
            }).success(function (response) {
                $$loading.hide();
                if (response.result.success == true) {
                    window.location.reload();
                } else {
                    $$toast.show(response.result.displaymsg? response.result.displaymsg: '服务器扔过来一个错误');
                }
            })
        }

    };

    $scope.finish = function (scope, action) {
        if ($scope.data.order.statusAction.statusType != 5) {
            $$toast.show("当前状态下订单无法操作!");
        } else {
            if (action.availableAction.status == 2) {
                // $$toast.show("该操作已完成");
            } else {
                $$loading.show();
                $http({
                    method: 'PATCH',
                    url: $$requestUrl.getUrl("hefeiNurseCompleteService", {"orderId": $scope.data.order.orderId}),
                    data: {
                        serviceId: action.actionId,
                        orderId: $scope.data.order.orderId,
                        nurseId: parseInt(localStorage.globalNurseId)
                    },
                    params: {
                        serviceId: action.actionId,
                        orderId: $scope.data.order.orderId,
                        nurseId: parseInt(localStorage.globalNurseId)
                    }
                }).success(function (response) {
                    $$loading.hide();
                    if (response.result.success == true) {
                        window.location.reload();
                    } else {
                        $$toast.show(response.result.displaymsg? response.result.displaymsg: '服务器扔过来一个错误');
                    }
                })
            }
        }
    };

    $scope.onAcceptOrderClick = function () {
        $$loading.show();
        $http({
            method: 'PATCH',
            url: $$requestUrl.getUrl("hefeiNurseAcceptOrder", {"orderId": $scope.data.order.orderId}),
            data: {
                "nurseId": parseInt(localStorage.globalNurseId),
                "orderId": $scope.data.order.orderId
            },
            params :{
                "nurseId": parseInt(localStorage.globalNurseId),
                "orderId": $scope.data.order.orderId
            }
        }).success(function (response) {
            $$loading.hide();
            if (response.result.success == true) {
                window.location.reload();
            } else {
                $$toast.show(response.result.displaymsg? response.result.displaymsg: '服务器扔过来一个错误');
            }
        })
    };


    $scope.onFinishOrderClick = function () {
        $$loading.show();
        $http({
            method: 'PATCH',
            url: $$requestUrl.getUrl("hefeiNurseFinishOrder", {"orderId": $scope.data.order.orderId}),
            data: {
                orderId: $scope.data.order.orderId,
                nurseId: parseInt(localStorage.globalNurseId)
            },
            params :{
                "nurseId": parseInt(localStorage.globalNurseId),
                "orderId": $scope.data.order.orderId
            }
        }).success(function (response) {
            $$loading.hide();
            if (response.result.success == true) {
                window.location.reload();
            } else {
                $$toast.show(response.result.displaymsg? response.result.displaymsg: '服务器扔过来一个错误');
            }
        })
    };
});