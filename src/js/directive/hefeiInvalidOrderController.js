/**
 * Created by gaoqz on 16/12/9.
 */

app.directive('hefeiInvalidOrderController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/hefeiInvalidOrderController.html',
        scope: {
            data: '=data'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $$loading, $$txIM ,$$iconfont,$$color) {

        }
    };
});
