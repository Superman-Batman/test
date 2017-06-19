/**
 * Created by lsh on 16/12/8.
 */

app.directive('hefeiOrderInfoController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/hefeiOrderInfoController.html',
        replace: true,
        scope: {
            data: '=data',
            order: '=order',
            link: '=link'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $$loading, $$txIM, $$toast, $http, $$requestUrl, $stateParams, $state, $rootScope, $$title, $$confirm) {

            $scope.item = $scope.data.item;
            $scope.statusAction = $scope.data.statusAction;
            $scope.patient = $scope.data.patient;

            $scope.orderDate = new Date($scope.data.servingTime).format('yyyy-MM-dd hh:mm');

            $scope.action = $scope.data.availableAction;

            $scope.onOrderClick = function () {
                $scope.order($scope);
            };

            $scope.onRouteDetailClick = function (orderId, action, patientId) {
                $scope.link(orderId, action, patientId);
            }
        }
    }
});