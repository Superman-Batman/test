/**
 * Created by lsh on 16/12/21.
 *
* *********************
* $$showText.show
* 显示文本
* option={
*          title: 标题 (可有可无)
*          msg: 显示内容
*         }
*/

app.factory('$$showText', function ($$log, $rootScope) {
    return {
        show: function (option) {
            $rootScope.$emit('showTextInfo', option);
        }
    };
});

app.directive('showTextController',function(){
    return{
        restrict:'AE',
        templateUrl:'templates/common/showTextController.html',
        replace:true,
        scope:{},
        controller:function($rootScope, $timeout, $sce, $scope){
            $scope.showBlock = false;
            $scope.msg = '';
            $scope.title = '';
            $scope.onHideBlockClick = function () {
                $scope.showBlock = false;
            };

            $rootScope.$on('showTextInfo', function (e, option) {
                if (option.msg) {
                    $scope.showBlock = true;
                    $scope.msg = $sce.trustAsHtml(option.msg);
                    $scope.title = option.title;
                } else {
                    $$log.error('confirmShow option error');
                }
            });
        }
    };
});