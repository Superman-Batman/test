//退出
‘signOut':'api/nurses/signout',
//登录
‘signIn:'api/nurses/signup/phone',
//邀请同事
‘inviteNurse’:'api/nurses/{id}/invite-via-sms',
//获得推送内容列表
‘getContentList':'api/nurses/cms-content',
 //传递设备ID和客户端ID
'createDeviceClient':'api/nurses/msg/push/client-infos',
//获得自己个人中心的信息
'getUserCenterInfo':'api/nurses/{id}/basic-info',
//获得验证码
'getPhoneCaptcha':'api/nurses/signup/phone-captcha',
//创建个人信息（第一次登录时）
'createRegisterInfo':'api/nurses/{id}/info',
//更新个人信息
‘updateNurseInfo’：’api/nurses/{id}/info’,
//获取医院列表
'getHospitalList':'api/hospitals/departments',
//新建医院信息
'createHospital':'api/organizations',
//获取该医院下的科室
'getHospitalDepartments':'api/hospitals/departments',
//新建该医院下的科室信息
'createHospitalDepartments':'api/departments',
//获得同事（护士）列表
'getNurseList':'api/nurses/{id}/contacts',
//获得同事（护士）详情信息
'getNurseDetail':'api/nurses/{id}/contacts',
//获得该科室下的所有护士的标签
'getAllNurseTag':'api/nurses/tags/departments/{id}',
// 新建该科室下护士标签
'createNurseTag':'api/users/tags',
//更新同事（护士）的标签
'updateNurseTags':'api/users/{id}/tags',
//获取全部患者列表
'getAllPatientList':'api/users/{id}/contacts',
//获取出/住院患者列表
'getOtherPatientList':'api/users/{id}/contacts',
//获得该科室下的所有患者的标签(标签筛选页) 
'getAllPatientTag':'api/departments/{departmentId}/users/tags',
//获得患者详情信息
'getPatientDetail':'api/users/{id}/basic-info',
//新建患者标签分类
'createPatientTagCategory':'api/users/tags/category',
//新建患者某个分类下的标签
'createPatientCategoryTag':'api/users/tags',
//更新患者标签
'updatePatientTag':'api/users/{id}/tags',
//获取选择沟通对象-nurse
'getSelectNurse':'api/nurses/{id}/contacts',
//获取选择沟通对象-patient
'getSelectPatient':'api/users/{id}/contacts',
//获取患者列表—根据标签筛选患者
‘getTagPatientList':'api/users/{id}/contacts',
//创建患护沟通—患者详情页中和患者发起沟通
'createPatientNurseChat':'api/nurses/msg/im/{fromId}/to-user/{toId}',
//创建护护沟通—同事详情页中和护士发起沟通
'createNurseNurseChat':'api/nurses/msg/im/{fromId}/to-nurse/{toId}',
//创建微信推送—标签筛选页面给多个患者进行微信推送
‘createPatientsWeiXinPush’:”api/nurses/msg/new-im",
//创建群聊
‘createGroupChat’：’api/nurses/im/{fromId}/to-nurse/{toId}’
//排班表通过班次切换视图
'changeSortClassList':'api/nurses/rosters/departments/{departmentId}',
//排班表通过某人切换视图
‘getSortClassList':'api/nurses/rosters/departments/{departmentId}/by-person',
//批量排班列表
‘createBatchSortClass':'api/nurses/rosters/departments/{departmentId}/by-person',
//在排班表中删除某人的排班
'dropSortClass': 'api/nurses/rosters/schedules/{rosterScheduleId}',
//给某人创建一次排班，添加至某日的班次视图上
'createSortClass': "api/nurses/rosters/schedules/batch-append",
//创建护士排班班次
'createNurseClass': 'api/nurses/rosters',
//选择护士排班班次
'chooseNurseClass': 'api/nurses/rosters',
//修改护士排班班次
'updateNurseClass': 'api/nurses/rosters/{id}',
//发起随访
"startFollowUp": 'api/nurses/followup/pages',
//创建随访模板 
‘createFollowUpTemplates’: 'api/nurses/followup/pages/templates',
//‘编辑随访模版’
‘editFollowUpTemplates’: 'api/nurses/followup/pages/templates',
//‘选择随访模板’
‘chooseFollowUpTemplates’: 'api/nurses/followup/pages/templates',
//更新模版
'updateFollowUpTemplates': 'api/followup/pages/templates/:id',
//随访填写记录
‘writeFollowUpRecord':'api/nurses/calendars/events/followup/{id}',
//更新随访记录
'updateFollowUpRecord':'api/nurses/calendars/events/followup/{id}',
//随访中建立单聊(和患者)
'setChatInFollowUp': 'api/nurses/im/{fromId}/to-user/{toId}',
//随访中微信推送按钮
"weiXinPushFollowUp”:”api/nurses/msg/wx-template-msg/followup" ,
//随访要调取的接口
'followMsg':'api/nurses/wx-template-msg/followup',
//选择提醒时间
"chooseRemindTime”: "api/nurses/followup/pages/templates/alerts",
//消息列表
'messageTagStateController': 'api/nurses/calendars/messagePage',
//近期日程
'recentCalenderStateController': 'api/nurses/calendars/messagePage',
//获取我的聊天信息
'getMyChatInfo': 'api/nurses/im/me',
//创建群聊
'createGroupChat':'api/nurses/im/group-chats',
//创建与护士单聊
'createC2CNurse':'api/nurses/im/{fromId}/to-nurse/{toId}',
//创建与用户单聊
'createC2CUser':'api/nurses/im/{fromId}/to-user/{toId}'
