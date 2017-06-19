# YHZS-V1.2
优护助手v1.2
======
#页面分工
##消息列表-dongsj
msgItemController
chatListController
##聊天-dongsj
chatCometController
##语音聊天-dongsj
chatCometController
##今日日程-lix
todoListController
##排班表-lix
dutyCalendarController
##批量排班-lix
dutyListController
dutyCalendarController
##单独排班-lix
##新建／编辑班次-lix
##新建／编辑随访-lix
##推送内容-yih
contentListController



##推送列表-yih
pushListController
##选择沟通对象,选择排班对象,推送对象
selectListController


##患者列表-yih
patientListController
##患者筛选-yih
patientTagController  
patientListController
##患者详情-yih
patientDetailController
##工具列表-yih
toolListController
##同事列表-yih
nurseListController
##同事详情-yih
nurseDetailController
##同事+患者列表-yih
patientListController
nurseListController
##个人信息-yih
userCenterController
##登陆／注册-lix
##注册过程-lix
##邀请-yih
inviteNurseController


#目录结构
* public
    * img  
    图片资源
* css
    * baseSize  
    各种尺寸和颜色，只在已有变量内增加通用尺寸
    * controller      
    存放各个controller的scss（命名规则为xxxController），controller不一定要与directive一一对应。注意：此文件夹内不包含state的controller。
    * state    
    存放各个state的scss（命名规则为xxxStateController）
    * function      
    存放scss函数
    * lib    
    存放第三方css   
    * base.scss    
    根据baseSize生成全局的class。不要添加也不要使用@extend引用。
    * reset.scss  
    reset样式
    * YHZS.scss  
    主scss
* iconfont
    * commonIconfont   
     内容用iconfont
    * projectIconfont    
    项目用iconfont
* js
    * directive  
存放directive的js（命名规则为xxxController）
    * external   
    存放拓展函数
    * factory  
    存放angular的factory
    * ng-config
 存放angular的各类配置
    * state
    存放state的js（命名规则为xxxStateController）
    * lib    
    存放第三方js
* json
  存放本地接口测试文件，如接口地址为 yh/demo，则文件路径为json/yh/demo.json
* templates
    * controller
    存放各个controller的js（命名规则为xxxController），controller不一定要与directive一一对应。注意：此文件夹内不包含state的controller。
    * state
    存放各个state的js（命名规则为xxxStateController）

---
#各类命名规则
 * css的通用class  
    使用"-"连接单词，如float-left
 * 其他css的class  
    使用驼峰命名
 * js的变量名和函数名  
    使用驼峰命名
 * controller/directive   
    js 和 css 都命名为 xxxxController，文件名同理
 * state
    config内的state名定义不需加StateController，   
    js 和 css 都命名为config内的State名加StateContriller，如xxxxStateController，文件名同理。
 * requestUrl内的接口名称   
    resolve 内的接口调用在requestUrl内定义名同 state 名相同，如xxxxStateController。
    页面内的操作结合 state 名和实际功能命名，如登陆的接口名可定义为loginStateController.login
 * 页面url
    尽量使用单一单词或路径表示，如多个单词则使用"-"连接单词。
   
---
#日志相关
不要使用console，全部使用$$log来打印日志  
调试用的日志在使用后需注释掉  
$$log.debug来显示const的文本日志  
$$log.info来显示变量内的数据  
$$log.warn来显示警告  
$$log.error来显示错误  
state／controller内需在最后添加日志以便调试，如：$$log.debug('xxxController');$$log.info($scope);  

planType: 1.随访 2.排班 3.协同
taskStatus: 1.执行确认 2.执行未确认 3.执行失败待重试 4.执行失败 5.放弃执行
任一项可以为空。
时间维度和人维度各自至少一个查询条件（避免大量查询）。
动作类型 1.记录 2.微信推送 3.打电话 4.发短信
action的content的示例待补充。可以查看Tables.md的Task表字段。
注意plan的title和task的title是一个父子关系。如对于随访来说，对外包装的event显示的title不同场景不一样。在消息中心显示“张三的随访-第一次”，在随访的详情页面则只显示第一次。在使用上需要灵活搭配。

#排班全局变量
 * admissionTime 存放排班时间
 * orderObjArr 存放排班数据
 * obj 初始化排班数据
 * isAddOrder 判断第一次进入还是是返回上一页
 * delCalender 存放应该删除排班数据
 * rosterData 存放需修改排班数据
 * remindArr 提醒日期
 * colorName 颜色名
 * classArr 选择班次数组

#随访全局变量
 * globalTemplateData 存放随访模板数据(新增,编辑)
 * templateTime 设置随访时间
 * templateObj 存放随访模板数据
 
#requestUrl命名规则
 * 路由内resolve的url命名为xxxStateController
 * 获取数据使用get命名，更新数据使用update命名，新建数据使用create命名，删除数据使用drop命名
 * 用户主动操作导致的动作使用动作+修饰+名词的方式，如上传个人头像命名为updateUserHead
 * 原则上不允许出现多个接口使用同一个requestUrl字段
 