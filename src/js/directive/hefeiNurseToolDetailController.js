/**
 * Created by lsh on 16/12/30.
 */

app.directive('hefeiNurseToolDetailController', function () {
    return {
        restrict: 'AE',
        templateUrl: 'templates/controller/hefeiNurseToolDetailController.html',
        scope: {
            data: '=data'
        },
        controller: function ($scope, $element, $attrs, $$toast, $$log, $timeout, $http, $$requestUrl,$state, $stateParams, $$loading) {
            $scope.step = 'process';
            // $scope.toolType = $scope.data.tool.serviceType;
            $scope.qFlags = [];
            for (var i = 0; i < $scope.data.question.length; i++) {
                var qEle = {
                    clen: 'short',
                    qId: $scope.data.question[i].id,
                    title: $scope.data.question[i].title,
                    type: $scope.data.question[i].type,
                    oEle: []
                };
                for (var j = 0; j < $scope.data.question[i].option.length; j++) {
                    qEle.oEle.push({
                        content: $scope.data.question[i].option[j].content,
                        sel: $scope.data.question[i].type == 5 ? '' : false,
                        imgUrl: $scope.data.question[i].option[j].imgUrl,
                        placeholder: $scope.data.question[i].option[j].placeholder,
                        inputType: $scope.data.question[i].option[j].inputType,
                        oId: $scope.data.question[i].option[j].id
                    });
                    if ($scope.data.question[i].option[j].content.length > 6) {
                        qEle.clen = 'long';
                    }
                }
                if ($scope.data.question[i].type == 1 || $scope.data.question[i].type == 3) {
                    qEle.oEle[0].sel = true;
                }
                $scope.qFlags.push(qEle);
            }
            console.log("qflags");
            console.log($scope.qFlags);
            $scope.currentIndex = 0;
            $scope.optionChange = function (questionIndex, optionIndex) {
                if ($scope.qFlags[questionIndex].type == 1 || $scope.qFlags[questionIndex].type == 3) {
                    for (var i = 0; i < $scope.qFlags[questionIndex].oEle.length; i++) {
                        $scope.qFlags[questionIndex].oEle[i].sel = false;
                    }
                    $scope.qFlags[questionIndex].oEle[optionIndex].sel = true;
                } else {
                    $scope.qFlags[questionIndex].oEle[optionIndex].sel = !$scope.qFlags[questionIndex].oEle[optionIndex].sel;
                }
            };
            $scope.getResultStr = function (oEle) {
                var selArray = [];
                for (var i = 0; i < oEle.length; i++) {
                    if (oEle[i].sel) {
                        selArray.push(oEle[i].content);
                    }
                }
                if (selArray.length === 0) {
                    return '无';
                } else {
                    return selArray.join(',');
                }
            };
            var swiper = null;
            $timeout(function () {
                swiper = new Swiper('.swiper-container', {
                    spaceBetween: 30, simulateTouch: false
                });
            });
            $scope.nextOption = function () {
                if ($scope.currentIndex >= $scope.qFlags.length) {
                    var extraInfo = {
                        actionId: parseInt($stateParams.actionId),
                        orderId: parseInt($stateParams.orderId)
                    };
                    var postData = {
                        evaluateType: 1,
                        extraInfo: JSON.stringify(extraInfo),
                        userId: parseInt($stateParams.patientId),
                        toolId: $scope.data.toolBasicInfo.id,
                        options: [],
                        // followUpId: localStorage.eventId
                    };
                    for (var i = 0; i < $scope.qFlags.length; i++) {
                        var oArray = [];
                        for (var j = 0; j < $scope.qFlags[i].oEle.length; j++) {
                            if ($scope.qFlags[i].oEle[j].sel) {
                                oArray.push($scope.qFlags[i].oEle[j].oId);
                            }
                        }
                        postData.options.push({
                            questionId: parseInt($scope.qFlags[i].qId),
                            optionId: parseInt(oArray.join(','))
                        });
                        // postData.options.push({
                        //     questionId: $scope.qFlags[i].qId,
                        //     optionId: oArray.join(',')
                        // });
                    }
                    $$loading.show();
                    $http({
                        method: 'POST',
                        url: $$requestUrl.getUrl("hefeiEvaluteController", {"toolId": $scope.data.toolBasicInfo.id, "nurseId": parseInt(localStorage.globalNurseId)}),
                        data: postData
                    }).success(function (response) {
                        $$loading.hide();
                        if (response.result.success != true) {
                            $$toast.show(response.result.displaymsg);
                        } else {
                            // $scope.result = response;
                            // $scope.step = 'result';
                            // $state.go('hefeiOrderDetail', {orderId: $stateParams.orderId, patientId: $stateParams.patientId});
                            history.go(-1);
                        }
                        $$log.debug('getToolAnswerAction.success');
                        $$log.info(response);
                    });
                } else {
                    $scope.currentIndex++;
                }
                swiper.slideNext();
                scrollTo(0, 0);
            };
            $scope.prevOption = function () {
                if ($scope.currentIndex > 0) {
                    $scope.currentIndex--;
                    swiper.slidePrev();
                    scrollTo(0, 0);
                } else {
                    $$toast.show("已经是第一题了！");
                }
            };
            $$log.debug('hefeiNurseToolDetailController');
            $$log.info($scope);
        }
    };
});