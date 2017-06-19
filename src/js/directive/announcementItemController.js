/**
 * Created by lixu on 16/11/28.
 */
app.directive('announcementItemController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/announcementItemController.html',
        replace: true,
        scope: {
            data: '=data'
        },
        controller: function ($scope, $element, $attrs, $$log, $timeout, $$loading, $$txIM, $$toast, $http, $$requestUrl, $state, $$title, $$confirm) {

        }
    };
});


