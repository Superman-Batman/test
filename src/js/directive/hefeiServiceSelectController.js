/**
 * Created by lsh on 16/12/12.
 */

app.directive('hefeiServiceSelectController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/hefeiServiceSelectController.html',
        replace: true,
        scope: {
            data: '=data'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $$loading, $$txIM, $$toast, $http, $$requestUrl, $stateParams, $state, $rootScope, $$title, $$confirm) {
            $scope.isShow = false;
            $scope.onShowContentClick = function () {
               $scope.isShow = !$scope.isShow;
            };

            $scope.onChooseServiceItemClick = function (data) {
                $scope.data.status = data.status == 0? 1:0;
                $http({
                    method: 'PATCH',
                    url: $$requestUrl.getUrl("hefeiUpdateItemService", { "serviceId": parseInt(data.itemId)}),
                    data: {
                        nurseId: parseInt(localStorage.globalNurseId),
                        serviceId: parseInt(data.itemId)
                    },
                    params: {
                        nurseId: parseInt(localStorage.globalNurseId)
                    }
                }).success(function (response) {
                    if (response.result.success == true) {

                    } else {
                        $scope.data.status = $scope.data.status == 0? 1:0;
                        $$toast.show(response.result.displaymsg);
                    }
                })
            }
        }
    }
});