/**
 * Created by lsh on 16/12/12.
 */

app.directive('hefeiEvaluationInfoController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/hefeiEvaluationInfoController.html',
        replace: true,
        scope: {
            data: '=data'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $$loading, $$txIM, $$toast, $http, $$requestUrl, $stateParams, $state, $rootScope, $$title, $$confirm) {
            $scope.isShow = false;
            $scope.markDate = new Date($scope.data.reviewTime).format('yyyy-MM-dd');
            $scope.onShowContentClick = function () {
                $scope.isShow = !$scope.isShow;
            };
            $scope.score = $scope.data.aveScore || 0;
        }
    }
});