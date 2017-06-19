/**
 * Created by dongsj on 16/7/15.
 * 接口地址
 *
 * **************************
 *
 * $requestUrl.getUrl 获取对应环境和对应的接口地址
 */
app.factory('$$requestUrl', function ($$env, $$log,$$shence) {
    var base = '';
    var debugBase = 'json/';
    var staBase = 'http://api.zhushou.staging.youhujia.com/';
    var devBase = 'http://api.zhushou.dev.youhujia.com/';
    var proBase = 'http://api.zhushou.youhujia.com/';
    var urlList = {

        'demo': 'yh/{id1}/{id2}/demo',

        //--------------lix
        //DONE(check API):发起随访
        "startFollowUpStateController": 'api/nurses/followup/pages',
        //TODO(check API):发起随访时建立聊天
        'startFollowUpChat':'api/nurses/msg/im/{fromId}/to-user/{toId}',
        //DONE(check API):创建随访模板
        'createFollowUpTemplatesStateController': 'api/nurses/followup/pages/templates',
        //DONE(check API):选择随访模板
        'chooseFollowUpTemplatesStateController': 'api/nurses/followup/pages/templates',
        //DONE(check API):更新模版
        'updateTemplate': 'api/nurses/followup/pages/templates/{id}',
        //DONE(check API):随访填写记录
        'getFollowUpRecord':'api/nurses/calendars/events/followup/{id}',
        //DONE(check API):更新随访记录
        'updateFollowUpRecord':'api/nurses/calendars/events/followup/{id}',
        //DONE(check API):随访中建立单聊(和患者)
        'setChatFollowUp': 'api/nurses/msg/im/{fromId}/to-user/{toId}',
        //DONE(check API):随访中微信推送
        "weiXinPushFollow":"api/nurses/msg/wx-template-msg/followup" ,
        //TODO(check API):随访要调取的微信接口
        'followMsg':'api/nurses/wx-template-msg/followup',
        //DONE(check API):选择提醒时间
        "chooseRemindTimeStateController": "api/nurses/followup/pages/templates/alerts",
        //DONE(check API):创建排班
        //'sorts': 'api/nurses/rosters/schedule/append/batch',
        //Done(check API):排班表通过班次切换视图
        'changeScheduleClassStateController':'api/nurses/rosters/departments/{departmentId}',
        //Done(check API):排班表通过某人切换视图
        'changeSchedulePersonStateController':'api/nurses/rosters/departments/{departmentId}/by-person',
        //Done(check API):批量排班列表
        'batchSchedulesStateController':'api/nurses/rosters/departments/{departmentId}/by-person',
        //Done(check API):在排班表中删除某人的排班
        'dropSchedule': 'api/nurses/rosters/schedules/{rosterScheduleIds}',
        //Done(check API):给某人排班, 添加至某日的班次上
        'createSchedule':'api/nurses/rosters/schedules/append',
        //Done(check API):如果有排班先删除某人的排班
        'dropSortSchedule': 'api/nurses/rosters/schedules/{rosterScheduleIds}',
        //Done(check API):给多人排班，班次、执行人、观察者都可能是多个
        'createSortScheduleStateController':  "api/nurses/rosters/schedules/batch-append",
        //DONE(check API):创建创建护士排班班次
        'createNurseScheduleStateController': 'api/nurses/rosters',
        //Done(check API):修改护士排班班次
        'updateNurseSchedule': 'api/nurses/rosters/{rosterId}',
        //DONE(check API):选择护士排班班次
        'chooseNurseScheduleStateController': 'api/nurses/rosters',
        //DONE(check API):护士班次列表
        'NurseScheduleListStateController': 'api/nurses/rosters',
        // 'submitPerson': 'api/nurses/{id}/occupational-info',
        'nursePlanCounterStateController': 'api/ns/planCount',
        'nurseToolCounterStateController': 'api/ns/toolCount',
        'statisticStateController':'api/nurses/metadata/shence',
        //康复计划统计
        'planCountStateController': 'api/nurses/metadata/plan',
        //康复工具统计
        'toolCountStateController': 'api/nurses/metadata/tool',
        //公告板
        'messageContent':'api/nurses/calendars/events/announcement/v1/{id}',
        //TODO(check API):公告事件
        'messageEvent':'api/nurses/calendars/events/announcement/v1/{id}',
        //TODO(check API):新建公告
        'createAnnouncementStateController':'api/nurses/calendars/events/announcement/v1',
        //TODO(check API):更新公告
        'updateAnnouncement':'api/nurses/calendars/events/announcement/v1/{id}',
        //TODO(check API):---------------lix


        //TODO(check API):---------------yih
        //DONE(check API):退出
        'signOut':'api/nurses/signout',
        //DONE(check API):登录
        'signIn':'api/nurses/signup/phone',
        //DONE(check API):邀请同事
        'createInviteNurse':'api/nurses/{nurseId}/invite-via-sms',
        //DONE(check API):推送内容页
        'contentListStateController':'api/nurses/cms-content',
        //DONE(check API):传递设备ID和客户端ID
        'createDeviceClient':'api/nurses/msg/push/client-infos',
        //DONE(check API):注册信息,修改个人信息 个人中心页
        'userCenterInfoStateController':'api/nurses/{nurseId}/info',
        //DONE(check API):登录时获得验证码
        'getLoginPhoneCaptcha':'api/nurses/signup/phone-captcha',
        //DONE(check API):修改个人信息中修改个人手机号时获得验证码
        'getAlertPhoneCaptcha':'api/nurses/signup/phone-captcha',
        //创建个人基本信息（第一次登录时）
        'createBasicInfo':'api/nurses/{nurseId}/info',
        //创建个人职业信息（第一次登录时）
        'createProfessionInfo':'api/nurses/{nurseId}/info',
        //获得个人的所有信息（基本信息和职业信息）
        'alterNurseInfoStateController':'api/nurses/{nurseId}/info',
        //更新个人信息
        'updateNurseInfo':'api/nurses/{nurseId}/info',
        //DONE(check API):获取医院
        'choiceHospitalStateController':'api/departments',
        //DONE(check API):新增医院
        'createHospital':'api/organizations',
        //DONE(check API):获取该医院下的科室
        'choiceDepartmentStateController':'api/departments',
        //DONE(check API):新增该医院下的科室
        'createDepartment':'api/departments',
        //DONE(check API):全部病人列表页面
        'allPatientListStateController':'api/nurses/{nurseId}/patients',
        //出/住院病人列表页面
        'otherPatientListStateController':'api/nurses/{nurseId}/patients',
        //DONE(check API):同事列表页
        'nurseListStateController':'api/nurses/{nurseId}/colleagues',
        //DONE(check API):同事详情页
        'nurseDetailStateController':'api/nurses/{nurseId}/colleagues',
        //DONE(check API):患者详情页
        'patientDetailStateController':'api/nurses/users/{userId}/info',
        //DONE(check API):标签筛选页,获得该科室下的患者标签
        'patientTagStateController':'api/departments/{departmentId}/tags/users',
        //DONE(check API):获得该科室下护士的标签
        'alterNurseTagStateController':'api/departments/{departmentId}/tags/nurses',
        //DONE(check API):添加该科室下的标签
        'createNurseTag':'api/nurses/tags',
        //DONE(check API):提交同事的标签
        'updateNurseTags':'api/nurses/{nurseId}/tags',
        //DONE(check API):增加患者标签分类
        'createPatientTagCategory':'api/nurses/users/tags',
        //DONE(check API):增加患者某个分类下的标签
        'createPatientCategoryTag':'api/nurses/users/tags',
        //DONE(check API):更新患者标签
        'updatePatientTag':'api/nurses/users/{userId}/tags',
        //DONE(check API):选择沟通对象-nurse
        'getSelectNurseStateController':'api/nurses/{nurseId}/colleagues',
        //DONE(check API):选择沟通对象-patient
        'getSelectPatientStateController':'api/nurses/{nurseId}/patients',
        //DONE(check API):标签筛选病人
        'getTagPatientList':'api/nurses/{nurseId}/patients',
        //DONE(check API):患者详情页中患者和护士发起沟通
        'createPatientChat':'api/nurses/msg/im/{fromId}/to-user/{toId}',
        //DONE(check API):同事详情页中和护士发起沟通
        'createNurseChat':'api/nurses/msg/im/{fromId}/to-nurse/{toId}',
        //DONE(check API):标签筛选页面给多个患者对象微信推送
        'createPatientsWeiXinPush':"api/nurses/msg/new-im",

        //获得该科室下患者的标签
        'patientTagManageStateController':'api/departments/{departmentId}/tags/users',
        //获得该科室下护士的标签
        'nurseTagManageStateController':'api/departments/{departmentId}/tags/nurses',
        //删除该科室下护士的标签
        'deleteNurseTag':'api/nurses/tags/delete',
        //修改该科室下护士的标签
        'updateNurseTag':'api/nurses/tags',
        //删除该科室下的患者标签
        'deletePatientTag':'api/nurses/users/tags/delete',
        //修改该科室下患者的标签
        'updateDepartmentPatientTag':'api/nurses/users/tags',

        //在标签管理中添加护士的标签
        'createNurseTagInManage':'api/nurses/tags',
        //在标签管理中添加患者的标签
        'createPatientCategoryTagInManage':'api/nurses/users/tags',
        //在标签管理中添加患者标签分类
        'createPatientTagCategoryInManage':'api/nurses/users/tags',
        //---------------yih

        // 关注/取消关注 患者
        'attentionTagStateController': 'api/nurses/users/{nurseId}/tags',
        // 加入/移出 科室黑名单
        'blackListTagStateController': 'api/nurses/users/{nurseId}/tags',
        // 获取科室tag
        'allDepartmentTags': 'api/departments/{departmentId}/tags/nurses',
        //批量移出黑名单
        'removeBlackList':'api/nurses/users/bulk/tags',
        //黑名单列表
        'blackList': 'api/nurses/{nurseId}/patients/blacklist',

        //DONE(check API):消息列表
        'messageTagStateController': 'api/nurses/calendars/v2/events',
        //DONE(check API):近期日程
        'recentCalenderStateController': 'api/nurses/calendars/v2/events',
        //DONE(check API):获取我的聊天信息
        'getMyChatInfo': 'api/nurses/msg/im/me',
        //DONE(check API):创建群聊
        'createGroupChat':'api/nurses/msg/im/group-chats',
        //DONE(check API):创建与护士单聊=
        'createC2CNurse':'api/nurses/msg/im/{fromId}/to-nurse/{toId}',
        //DONE(check API):创建与用户单聊
        'createC2CUser':'api/nurses/msg/im/{fromId}/to-user/{toId}',
        //获取版本要求
        'getVersion':'api/nurses/calendars/app/version',

        //-----lsh
        //DONE(check API):工作台
        'chooseToolPage': 'api/nurses/order/v1/workbench',
        //DONE(check API):订单列表
        'hefeiOrderListStateController': 'api/nurses/order/v1',
        'hefeiOrderListAcceptedController': 'api/nurses/order/v1',
        //DONE(check API):护士接单
        'hefeiNurseAcceptOrder': 'api/nurses/order/v1/{orderId}/accept',
        //DONE(check API):订单详情
        'hefeiOrderDetailStateController': 'api/nurses/order/v1/{orderId}/detail',
        //DONE(check API):护士取消订单
        'hefeiNurseCancelOrder': 'api/nurses/order/v1/orderId/nurseCancel',
        //DONE(check API):护士申请运营介入
        'hefeiNurseApplyRun': 'api/nurses/order/v1/refund/orderId',
        //DONE(check API):护士退款操作
        'hefeiNurseRefundOperation': 'api/nurses/order/v1/{orderId}/nurseOpinion',
        //DONE(check API):护士完成服务内容
        'hefeiNurseCompleteService': 'api/nurses/order/v1/{orderId}/completeService',
        //TODO(check API):护士完成订单
        'hefeiNurseFinishOrder': 'api/nurses/order/v1/orderId/nurseComplete',
        //DONE(check API):项目管理
        'hefeiServiceConfigStateController': 'api/nurses/order/v1/{nurseId}/serviceManager',
        //DONE(check API):接收消息
        'hefeiPushService': 'api/nurses/order/v1/{nurseId}/pushService',
        //DONE(check API):选择可服务项目
        'hefeiUpdateItemService': 'api/nurses/order/v1/{serviceId}/updateService',
        //TODO(check API):护士评估
        'hefeiNurseToolStateController': 'api/wbreaker/v1/nurses/{nurseId}/tools/{toolId}',
        //TODO(check API):评估提交
        'hefeiEvaluteController': 'api/wbreaker/v1/nurses/{nurseId}/tools/{toolId}/answer'
        //------lsh
    };
    return {
        getUrl: function (name, ps) {
            switch ($$env.getEnvirement()) {
                case 100:
                case 101:
                    base = proBase;
                    break;
                case 3:
                    base = staBase;
                    break;
                case 2:
                    base = proBase;
                    break;
                case 1:
                    base = devBase;
                    break;
                case 0:
                    base = debugBase;
                    break;
                default:
                    $$log.info("default1");
                    base = proBase;
            }
            var url = base + urlList[name] + ($$env.getEnvirement() === 0 ? '.json' : '');
            for (var p in ps) {
                // url=url.replace('{' + p + '}', ps[p]);
                url = url.replace('{' + p + '}', ($$env.getEnvirement() === 0 ? p : ps[p]));
            }
            $$log.debug('requestUrl.getUrl:' + name);
            //$$log.debug(ps);
            if (url.split('{').length > 1) {
                $$log.warn('please check params');
            }
            $$log.info(url);
            $$shence.track('_' + name);
            return url;
        }
    };
});

