import request from './request'

// const defaultConfig = {
//   method: 'post',
//   refuseToken: true,
//   json: true
// }

/*
 ********** 全局公用-开始 **********
 */

export function defaultAxios (axios = {}) {
  return request({
    ...axios
  })
}

// treeSelect异步加载tree数据
export function GlobalAsyncLoadTreeSelectTreeData (axios = {}) {
  return request({
    ...axios
  })
}

// treeSelect搜索查询列表数据
export function GlobalLoadTreeSelectSearchData (axios = {}) {
  return request({
    ...axios
  })
}
/*
 ********** 全局公用-结束 **********
 */

// 查询指定用户信息
export function SysUserGetUserInfo (axios = {}) {
  return request({
    url: '/sys/user/getUserInfo',
    ...axios
  })
}

// 分页查询用户信息
export function SysUserPageUserInfo (axios = {}) {
  return request({
    url: '/sys/user/pageUserInfo',
    ...axios
  })
}

// 修改用户状态
export function sysUserUpdateUserStatus (axios = {}) {
  return request({
    url: '/sys/user/updateUserStatus',
    ...axios
  })
}

// 重置密码
export function SysUserResetPassword (axios = {}) {
  return request({
    url: '/sys/user/resetPassword',
    ...axios
  })
}

// 新增用户信息
export function SysUserSaveUserInfo (axios = {}) {
  return request({
    url: '/sys/user/saveUserInfo',
    ...axios
  })
}

// 删除用户信息
export function SysUserDeleteUserInfo (axios = {}) {
  return request({
    url: '/sys/user/deleteUserInfo',
    ...axios
  })
}

// 修改用户信息
export function SysUserUpdateUserInfo (axios = {}) {
  return request({
    url: '/sys/user/updateUserInfo',
    ...axios
  })
}

// 导出用户信息列表
export function SysUserExportUserinfoList (axios = {}) {
  return request({
    url: '/sys/user/exportUserinfoList',
    json: true,
    ...axios
  })
}

// 列表查询行政区划树结构详细信息
export function SysAdmListAdmTreeInfo (axios = {}) {
  return request({
    url: '/sys/adm/listAdmTreeInfo',
    json: true,
    ...axios
  })
}

// 分页查询行政区划详细信息
export function SysAdmPageAdmInfo (axios = {}) {
  return request({
    url: '/sys/adm/pageAdmInfo',
    json: true,
    ...axios
  })
}

// 新增行政区划信息
export function SysAdmSaveAdmInfo (axios = {}) {
  return request({
    url: '/sys/adm/saveAdmInfo',
    json: true,
    ...axios
  })
}

// 删除行政区划信息
export function SysAdmDeleteAdmInfo (axios = {}) {
  return request({
    url: '/sys/adm/deleteAdmInfo',
    ...axios
  })
}

// 查询行政区划详细信息
export function SysAdmGetAdmInfo (axios = {}) {
  return request({
    url: '/sys/adm/getAdmInfo',
    ...axios
  })
}

// 修改行政区划信息
export function SysAdmUpdateAdmInfo (axios = {}) {
  return request({
    url: '/sys/adm/updateAdmInfo',
    json: true,
    ...axios
  })
}

// 导出登录日志列表
export function SysSyslogloginExportLoginLogList (axios = {}) {
  return request({
    url: '/sys/sysloglogin/exportLoginLogList',
    ...axios
  })
}

// 分页查询登录日志信息
export function SysSyslogloginPageLoginLog (axios = {}) {
  return request({
    url: '/sys/sysloglogin/pageLoginLog',
    ...axios
  })
}

// 删除内部组织信息
export function SysDeptDeleteDeptInfo (axios = {}) {
  return request({
    url: '/sys/dept/deleteDeptInfo',
    ...axios
  })
}

// 查询内部组织详细信息
export function SysDeptGetDeptInfo (axios = {}) {
  return request({
    url: '/sys/dept/getDeptInfo',
    ...axios
  })
}

// 列表查询内部组织树结构详细信息
export function SysDeptListDeptTreeInfo (axios = {}) {
  return request({
    url: '/sys/dept/listDeptTreeInfo',
    ...axios
  })
}

// 分页查询内部组织详细信息
export function SysDeptPageDeptInfo (axios = {}) {
  return request({
    url: '/sys/dept/pageDeptInfo',
    ...axios
  })
}

// 新增内部组织信息
export function SysDeptSaveDeptInfo (axios = {}) {
  return request({
    url: '/sys/dept/saveDeptInfo',
    ...axios
  })
}

// 修改内部组织信息
export function SysDeptUpdateDeptInfo (axios = {}) {
  return request({
    url: '/sys/dept/updateDeptInfo',
    ...axios
  })
}

// 删除外部组织信息
export function SysOutsideDeleteDeptOutsideInfo (axios = {}) {
  return request({
    url: '/sys/outside/deleteDeptOutsideInfo',
    ...axios
  })
}
// 查询外部组织详细信息
export function SysOutsideGetDeptOutsideInfo (axios = {}) {
  return request({
    url: '/sys/outside/getDeptOutsideInfo',
    ...axios
  })
}
// 列表查询外部组织树结构详细信息
export function SysOutsideListDeptOutsideTreeInfo (axios = {}) {
  return request({
    url: '/sys/outside/listDeptOutsideTreeInfo',
    ...axios
  })
}
// 分页查询外部组织详细信息
export function SysOutsidePageDeptOutsideInfo (axios = {}) {
  return request({
    url: '/sys/outside/pageDeptOutsideInfo',
    ...axios
  })
}
// 新增外部组织信息
export function SysOutsideSaveDeptOutsideInfo (axios = {}) {
  return request({
    url: '/sys/outside/saveDeptOutsideInfo',
    ...axios
  })
}
// 修改外部组织信息
export function SysOutsideUpdateDeptOutsideInfo (axios = {}) {
  return request({
    url: '/sys/outside/updateDeptOutsideInfo',
    ...axios
  })
}

// 删除字典类型
export function SysDictTypeDeleteDictTypeInfo (axios = {}) {
  return request({
    url: '/sys/dict/type/deleteDictTypeInfo',
    ...axios
  })
}
// 查询字典类型详细信息
export function SysDictTypeGetDictTypeInfo (axios = {}) {
  return request({
    url: '/sys/dict/type/getDictTypeInfo',
    ...axios
  })
}
// 分页查询字典类型信息
export function SysDictTypePageDictTypeInfo (axios = {}) {
  return request({
    url: '/sys/dict/type/pageDictTypeInfo',
    ...axios
  })
}
// 新增字典类型
export function SysDictTypeSaveDictTypeInfo (axios = {}) {
  return request({
    url: '/sys/dict/type/saveDictTypeInfo',
    ...axios
  })
}
// 修改字典类型
export function SysDictTypeUpdateDictTypeInfo (axios = {}) {
  return request({
    url: '/sys/dict/type/updateDictTypeInfo',
    ...axios
  })
}
// 删除字典数据
export function SysDictDataDeleteDictDataInfo (axios = {}) {
  return request({
    url: '/sys/dict/data/deleteDictDataInfo',
    ...axios
  })
}
// 查询字典数据详细信息
export function SysDictDataGetDictDataInfo (axios = {}) {
  return request({
    url: '/sys/dict/data/getDictDataInfo',
    ...axios
  })
}
// 分页查询字典数据信息
export function SysDictDataPageDictDataInfo (axios = {}) {
  return request({
    url: '/sys/dict/data/pageDictDataInfo',
    ...axios
  })
}
// 新增字典数据
export function SysDictDataSaveDictDataInfo (axios = {}) {
  return request({
    url: '/sys/dict/data/saveDictDataInfo',
    ...axios
  })
}
// 根据字典类型查询字典数据
export function SysDictDataSelectDictDataInfo (axios = {}) {
  return request({
    url: '/sys/dict/data/selectDictDataInfo',
    ...axios
  })
}
// 修改字典数据
export function SysDictDataUpdateDictDataInfo (axios = {}) {
  return request({
    url: '/sys/dict/data/updateDictDataInfo',
    ...axios
  })
}

// 删除岗位信息
export function SysPostDeletePostInfo (axios = {}) {
  return request({
    url: '/sys/post/deletePostInfo',
    ...axios
  })
}
// 查询岗位详细信息
export function SysPostGetPostInfo (axios = {}) {
  return request({
    url: '/sys/post/getPostInfo',
    ...axios
  })
}
// 列表查询岗位树结构详细信息
export function SysPostListPostTreeInfo (axios = {}) {
  return request({
    url: '/sys/post/listPostTreeInfo',
    ...axios
  })
}
// 分页查询岗位详细信息
export function SysPostPagePostInfo (axios = {}) {
  return request({
    url: '/sys/post/pagePostInfo',
    ...axios
  })
}
// 新增内部岗位信息
export function SysPostSavePostInfo (axios = {}) {
  return request({
    url: '/sys/post/savePostInfo',
    ...axios
  })
}
// 修改内部岗位信息
export function SysPostUpdatePostInfo (axios = {}) {
  return request({
    url: '/sys/post/updatePostInfo',
    ...axios
  })
}

// 删除角色信息
export function SysRoleDeleteRoleInfo (axios = {}) {
  return request({
    url: '/sys/role/deleteRoleInfo',
    ...axios
  })
}
// 查询角色详细信息
export function SysRoleGetPostInfo (axios = {}) {
  return request({
    url: '/sys/role/getPostInfo',
    ...axios
  })
}
// 分页查询角色详细信息
export function SysRolePagePostInfo (axios = {}) {
  return request({
    url: '/sys/role/pagePostInfo',
    ...axios
  })
}
// 新增内部角色信息
export function SysRoleSaveRoleInfo (axios = {}) {
  return request({
    url: '/sys/role/saveRoleInfo',
    ...axios
  })
}
// 修改内部角色信息
export function SysRoleUpdate (axios = {}) {
  return request({
    url: '/sys/role/update',
    ...axios
  })
}

// 删除菜单信息
export function SysMenuDelete (axios = {}) {
  return request({
    url: '/sys/menu/delete',
    ...axios
  })
}
// 查询菜单详细信息
export function SysMenuGetMenuInfo (axios = {}) {
  return request({
    url: '/sys/menu/getMenuInfo',
    ...axios
  })
}
// 列表查询菜单树结构详细信息
export function SysMenuListMenuTreeInfo (axios = {}) {
  return request({
    url: '/sys/menu/listMenuTreeInfo',
    ...axios
  })
}
// 分页查询菜单详细信息
export function SysMenuPageMenuInfo (axios = {}) {
  return request({
    url: '/sys/menu/pageMenuInfo',
    ...axios
  })
}
// 新增菜单信息
export function SysMenuSave (axios = {}) {
  return request({
    url: '/sys/menu/save',
    ...axios
  })
}
// 修改菜单信息
export function SysMenuUpdate (axios = {}) {
  return request({
    url: '/sys/menu/update',
    ...axios
  })
}
// 查询当前用户权限树菜单信息
export function SysMenuSelectAuthMenuTreeList (axios = {}) {
  return request({
    url: '/sys/menu/selectAuthMenuTreeList',
    ...axios
  })
}

// 导出操作日志列表
export function SysLogoperExportOperLogList (axios = {}) {
  return request({
    url: '/sys/logoper/exportOperLogList',
    ...axios
  })
}
// 查询操作日志详细信息
export function SysLogoperGetOperLogInfo (axios = {}) {
  return request({
    url: '/sys/logoper/getOperLogInfo',
    ...axios
  })
}
// 分页查询操作日志信息
export function SysLogoperPageOperLog (axios = {}) {
  return request({
    url: '/sys/logoper/pageOperLog',
    ...axios
  })
}

// 项目库分页查询
export function projectPage (axios = {}) {
  return request({
    method: 'post',
    json: true,
    url: '/project/page',
    ...axios
  })
}
