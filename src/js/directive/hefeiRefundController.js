/**
 * Created by gaoqz on 16/12/9.
 */

app.directive('hefeiRefundController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/hefeiRefundController.html',
        scope: {
            data: '=data',
            refund: '=refund'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $$loading, $$txIM ,$$iconfont,$$color, $http, $$toast, $$requestUrl) {
            if ($scope.data.availableAction != undefined) {
                var actions = $scope.data.availableAction;
                if (actions.length != undefined && actions.length > 0) {
                    for (var i = 0; i < actions.length; i++) {
                        if (actions[i].action == 'refund') {
                            $scope.refundBtn = {
                                "title": actions[i].title,
                                "isTrue": true
                            };
                            break;
                        }
                    }
                }
            }
            $scope.onRefundClick = function (isAgree) {
                $scope.refund(isAgree);
            };
        }
    };
});
