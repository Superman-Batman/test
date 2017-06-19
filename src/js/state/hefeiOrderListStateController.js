/**
 * Created by lsh on 16/12/8.
 */
app.controller('hefeiOrderListStateController', function ($$navbar, $rootScope, $anchorScroll, $state, $scope, $location, $$log, getData, $$title, $$tabbar, $$toast, $$loading, $http, $$requestUrl, $stateParams) {
    $$title.setTitle("订单");
    $$tabbar.setIndex(-1);
    $$navbar.showReturnBtn();
    $scope.data = getData.data;
    $scope.loadWaitingNum = 0;
    $scope.loadAcceptedNum = 0;

    if (parseInt(sessionStorage.getItem("index")) == 0 || parseInt(sessionStorage.getItem("index")) == 1) {
        $scope.isCanOrder = true;
        if ($scope.data.result.success == true) {
            if ($scope.data.order != undefined && $scope.data.order.length > 0) {
                $scope.orderList = $scope.data.order;
                if ($scope.data.order.length < 5) {
                    $scope.loadMore = false;
                } else {
                    $scope.loadMore = true;
                }
            } else {
                $scope.loadMore = false;
            }
        } else {
            $$toast.show($scope.data.result.displaymsg ? $scope.data.result.displaymsg : '服务器扔过来一个错误');
        }
    } else {
        $scope.isCanOrder = false;
        if ($scope.acceptedOrderArr == undefined) {
            $$loading.show();
            $http({
                method: 'GET',
                url: $$requestUrl.getUrl("hefeiOrderListAcceptedController"),
                params: {
                    index: 0,
                    size: 5,
                    status: 'accepted'
                }
            }).success(function (response) {
                $$loading.hide();
                if (response.result.success == true) {
                    $scope.orderList = response.order;
                    if ($scope.orderList.length < 5) {
                        $scope.loadMore = false;
                    } else {
                        $scope.loadMore = true;
                    }
                } else {
                    $$toast.show(response.result.displaymsg ? response.result.displaymsg : '服务器扔过来一个错误');
                    $scope.orderList = [];
                }
            });
        }
    }

    function loadOrderList() {
        $scope.isCanOrder = true;
        //待接单
        sessionStorage.setItem("index", 1);
        $$loading.show();
        $http({
            method: 'GET',
            url: $$requestUrl.getUrl("hefeiOrderListStateController"),
            params: {
                index: 0,
                size: 5,
                status: 'waitServing'
            }
        }).success(function (response) {
            $$loading.hide();
            if (response.result.success == true) {
                $scope.orderList = response.order;
                if ($scope.orderList != undefined) {
                    if ($scope.orderList.length < 5) {
                        $scope.loadMore = false;
                    } else {
                        $scope.loadMore = true;
                    }
                } else {
                    $scope.loadMore = false;
                    $scope.orderList = [];
                }
            } else {
                $$toast.show(response.result.displaymsg ? response.result.displaymsg : '服务器扔过来一个错误');
                $scope.orderList = [];
            }
        });

        // if ($scope.orderList.length < 5) {
        //     $scope.loadMore = false;
        // }
    }
    $scope.order = function (scope) {
        $$loading.show();
        $http({
            method: 'PATCH',
            url: $$requestUrl.getUrl("hefeiNurseAcceptOrder", {"orderId": scope.data.orderId}),
            params: {
                nurseId: parseInt(localStorage.globalNurseId),
                orderId: scope.data.orderId
            },
            data: {
                nurseId: parseInt(localStorage.globalNurseId),
                orderId: scope.data.orderId
            }
        }).success(function (response) {
            $$loading.hide();
            if (response.result.success == true) {
                $state.go('hefeiOrderDetail', {orderId: scope.data.orderId, patientId: scope.data.patient.patientId});
                sessionStorage.setItem("index", 1);
            } else {
                if (response.result.code == 11407) {
                    $$toast.show(response.result.displaymsg);
                    $scope.orderList = $scope.orderList.filter(function (item) {
                        return item.orderId != scope.data.orderId;
                    });
                    if ($scope.orderList.length == 0) {
                        loadOrderList();
                    }
                } else {
                    $$toast.show(response.result.displaymsg ? response.result.displaymsg : '服务器扔过来一个错误');
                }
            }
        })
    };

    $scope.onChooseClick = function (isOrder) {
        scroll(0, 0);
        if (isOrder == true) {
            $scope.acceptedOrderArr = $scope.orderList;
            $scope.orderList = [];
            loadOrderList();
        } else {
            //已接单
            $scope.isCanOrder = false;
            sessionStorage.setItem("index", 2);
            if ($scope.acceptedOrderArr == undefined) {
                $$loading.show();
                $http({
                    method: 'GET',
                    url: $$requestUrl.getUrl("hefeiOrderListAcceptedController"),
                    params: {
                        index: 0,
                        size: 5,
                        status: 'accepted'
                    }
                }).success(function (response) {
                    $$loading.hide();
                    if (response.result.success == true) {
                        $scope.orderList = response.order;
                        if ($scope.orderList != undefined) {
                            if ($scope.orderList.length < 5) {
                                $scope.loadMore = false;
                            } else {
                                $scope.loadMore = true;
                            }
                        } else {
                            $scope.loadMore = false;
                            $scope.orderList = [];
                        }
                    } else {
                        $$toast.show(response.result.displaymsg ? response.result.displaymsg : '服务器扔过来一个错误');
                        $scope.orderList = [];
                    }
                })
            } else {
                $scope.orderList = $scope.acceptedOrderArr;
                if ($scope.orderList.length < 5) {
                    $scope.loadMore = false;
                } else {
                    $scope.loadMore = true;
                }
            }
        }
    };

    $scope.link = function (orderId, action, patientId) {
        if (action == undefined) {
            $state.go('hefeiOrderDetail', {orderId: orderId, patientId: patientId});
            sessionStorage.setItem("index", 2);
        } else {
            sessionStorage.setItem("index", 1);
            $$loading.show();
            $http({
                method: 'GET',
                url: $$requestUrl.getUrl("hefeiOrderDetailStateController", {
                    "orderId": orderId
                }),
                params: {
                    orderId: orderId,
                    patientId: patientId
                }
            }).success(function (response) {
                $$loading.hide();
                if (response.result.success != true) {
                    $$toast.show(response.result.displaymsg);
                } else {
                    var status = response.order.statusAction.statusType;
                    if (status != 1) {
                        if (status == 2) {
                            $$toast.show('该订单已被患者取消');
                        } else {
                            $$toast.show('该订单已被其他护士接走');
                        }
                        $scope.orderList = $scope.orderList.filter(function (item) {
                            return item.orderId != orderId;
                        });
                        if ($scope.orderList.length == 0) {
                            loadOrderList();
                        }
                    } else {
                        $state.go('hefeiOrderDetail', {orderId: orderId, patientId: patientId});
                    }
                }
            });
        }
    };

    $scope.onMoreOrdersClick = function (isOk) {
        $$loading.show();
        $scope.status = '';
        if (isOk == true) {
            $scope.status = 'waitServing';
            $scope.loadWaitingNum++;
            $scope.url = 'hefeiOrderListStateController';
        } else {
            $scope.status = 'accepted';
            $scope.loadAcceptedNum++;
            $scope.url = 'hefeiOrderListAcceptedController';
        }
        $http({
            method: 'GET',
            url: $$requestUrl.getUrl($scope.url),
            params: {
                index: $scope.status == 'waitServing' ? $scope.loadWaitingNum : $scope.loadAcceptedNum,
                size: 5,
                status: $scope.status
            }
        }).success(function (response) {
            $$loading.hide();
            if (response.result.success == true) {
                if (response.order != undefined && response.order.length != undefined && response.order.length > 0) {
                    for (var i = 0; i < response.order.length; i++) {
                        $scope.orderList.push(response.order[i]);
                    }
                    if (response.order.length < 5) {
                        $$toast.show("订单已加载完！");
                        $scope.loadMore = false;
                    }
                } else {
                    $$toast.show("订单已加载完");
                    $scope.loadMore = false;
                }
            } else {
                $$toast.show(response.result.displaymsg ? response.result.displaymsg : '服务器扔过来一个错误');
            }
        })
    };
});