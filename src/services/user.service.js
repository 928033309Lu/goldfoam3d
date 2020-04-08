import httpService from './http.service';

const baseUrl = '/api/user-service'
const projectUrl = '/api/project-service'

export default {
  //获取企业列表
  getList() {
    return httpService.get(baseUrl+`/admin/enterprises`, {}, true);
  },
  //根据企业id获取企业信息
  getEnterpriseInfo(id) {
    return httpService.get(baseUrl+`/admin/enterprises/${id}`, {}, true);
  },
  //添加企业
  addEnterprise(data) {
    return httpService.post(baseUrl+`/admin/enterprises`, data, true);
  },
  //更改企业状态
  updateStatus(id,status){
    return httpService.put(baseUrl+`/admin/enterprises/${id}/status?status=${status}`, {}, true);
  },
  //系统管理员修改企业管理员信息
  fixUserInfo(id,data){
    return httpService.put(baseUrl+`/admin/enterprises/${id}/managers`, data, true);
  },
  //系统管理员操作
  addMoney(data,id){
    return httpService.post(baseUrl+`/admin/enterprises/${id}/bills`, data, true);
  },
  //系统管理员操作记录
  getLogs(id){
    return httpService.get(baseUrl+`/admin/enterprises/${id}/bills`, {}, true);
  },
  //普通用户登录
  common(telephone,password) {
    return httpService.post(baseUrl+`/users/login`, {telephone,password}, false);
  },
  //企业用户登录
  enterAdminLogin(enterpriseCode,password) {
    return httpService.post(baseUrl+`/managers/login`, {enterpriseCode,password}, false);
  },
  //企业用户信息
  getLoginEnterpriseInfo() {
    return httpService.get(baseUrl+`/managers/enterprises`, {}, true);
  },
  //企业管理员操作
  billsHandle(data,id){
    return httpService.post(baseUrl+`/managers/users/${id}/bills`, data, true);
  },
  //企业管理员修改密码
  updatePassword(data,oldPassword){
    return httpService.put(baseUrl+`/managers/updatePassword?oldPassword=${oldPassword}`, data, true);
  },
  //企业管理员通过手机号修改密码
  updatePasswordByPhone(data){
    return httpService.post(baseUrl+`/managers/password`, data, true);
  },
  //系统用户登录
  sysAdminLogin(userName,password) {
    return httpService.post(baseUrl+`/admin/login`, {userName,password}, false);
  },
  //获取短信验证码
  getMessageCode(telephone){
    return httpService.get(baseUrl+`/auth/sms/xcode/${telephone}`, {}, true);
  },
  //普通用户忘记密码
  resetPwd(data) {
    return httpService.post(baseUrl+`/users/resetPassword`, data, true);
  },
  //注册
  register(data,xcode) {
    return httpService.post(baseUrl+`/users/register?xcode=${xcode}`, data, true);
  },
  //获取注册用户列表
  getRegisterUserList(page=1,pageSize=10000){
    return httpService.get(baseUrl+`/managers/registers?page=${page}&pageSize=${pageSize}`, {}, true);
  },
  //获取用户列表
  getUserList(page=1,pageSize=10000){
    return httpService.get(baseUrl+`/managers/users?page=${page}&pageSize=${pageSize}`, {}, true);
  },
  //企业管理员审核注册信息
  examineUser(userId,status){
    return httpService.put(baseUrl+`/managers/registers/${userId}?status=${status}`, {}, true);
  },
  //删除用户前检查是否存在项目
  checkUser(userId){
    return httpService.get(baseUrl+`/managers/users/${userId}/checkProjects`, {}, true);
  },
  //删除用户
  deleteUser(userId){
    return httpService.deleteOut(baseUrl+`/managers/users/${userId}`, {}, true);
  },
  //根据用户id查询项目列表
  getProjectList(userId){
    return httpService.get(projectUrl+`/project/${userId}/projectListByUserId`, {}, true);
  },
  //根据用户id查询项目列表
  transferProject(id ,projectId,targetUserId){
    return httpService.put(projectUrl+`/project/${projectId}/handover?id=${id}&targetUserId=${targetUserId}`, {}, true);
  },
  //企业账单
  getEnterpriseBill(data){
    return httpService.get(baseUrl+`/managers/bills`, data, true);
  },
  //用户账单
  getUserBill(data){
    return httpService.get(baseUrl+`/users/bills`, data, true);
  },
  ///users/getProjectNameList 模糊查询项目名称列表
  getProjectNameList(projectName){
    return httpService.get(baseUrl+`/users/getProjectNameList?projectName=${projectName}`, {}, true);
  },
  //获取分享信息
  getShare(params){
    return httpService.get(baseUrl+`/users/getShare`, params, true);
  },
  //生成分享id
  createShareId(params){
    return httpService.get(baseUrl+`/users/createShareId`, params, true);
  },
  //生成分享id
  deleteShareId(params){
    return httpService.deleteOut(baseUrl+`/users/deleteShareId`, params, true);
  },
  //判断是否需要加密
  checkAccess(params){
    return httpService.get(baseUrl+`/users/checkAccess`, params, false);
  },
  //解析分享id
  analysisShareId(params){
    return httpService.get(baseUrl+`/users/analysisShareId`, params, false);
  },
  //分享id延期
  delayShareId(params){
    return httpService.get(baseUrl+`/users/delayShareId`, params, true);
  },
}
