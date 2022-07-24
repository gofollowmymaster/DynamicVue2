import request from './request'

// const defaultConfig = {
//   method: 'post',
//   refuseToken: true,
//   json: true
// }

/*
 ********** 全局公用-开始 **********
 */

export function defaultAxios(axios = {}) {
    return request({
        ...axios
    })
}

// treeSelect搜索查询列表数据
export function GlobalLoadTreeSelectSearchData(axios = {}) {
    return request({
        ...axios
    })
}
// treeSelect异步加载tree数据
export function GlobalAsyncLoadTreeSelectTreeData(axios = {}) {
    return request({
        ...axios
    })
}

/*
 ********** 全局公用-结束 **********
 */

// 分页查询用户信息
export function SysUserPageUserInfo(axios = {}) {
    return request({
        url: '/sys/user/pageUserInfo',
        ...axios
    })
}

// 列表查询行政区划树结构详细信息
export function SysAdmListAdmTreeInfo(axios = {}) {
    return request({
        url: '/sys/adm/listAdmTreeInfo',
        json: true,
        ...axios
    })
}

// 分页查询行政区划详细信息
export function SysAdmPageAdmInfo(axios = {}) {
    return request({
        url: '/sys/adm/pageAdmInfo',
        json: true,
        ...axios
    })
}

// 查询内部组织详细信息
export function SysDeptGetDeptInfo(axios = {}) {
    return request({
        url: '/sys/dept/getDeptInfo',
        ...axios
    })
}

// 分页查询内部组织详细信息
export function SysDeptPageDeptInfo(axios = {}) {
    return request({
        url: '/sys/dept/pageDeptInfo',
        ...axios
    })
}

// 查询外部组织详细信息
export function SysOutsideGetDeptOutsideInfo(axios = {}) {
    return request({
        url: '/sys/outside/getDeptOutsideInfo',
        ...axios
    })
}

// 分页查询外部组织详细信息
export function SysOutsidePageDeptOutsideInfo(axios = {}) {
    return request({
        url: '/sys/outside/pageDeptOutsideInfo',
        ...axios
    })
}
// 查询字典类型详细信息
export function SysDictTypeGetDictTypeInfo(axios = {}) {
    return request({
        url: '/sys/dict/type/getDictTypeInfo',
        ...axios
    })
}
// 分页查询字典类型信息
export function SysDictTypePageDictTypeInfo(axios = {}) {
    return request({
        url: '/sys/dict/type/pageDictTypeInfo',
        ...axios
    })
}
// 查询字典数据详细信息
export function SysDictDataGetDictDataInfo(axios = {}) {
    return request({
        url: '/sys/dict/data/getDictDataInfo',
        ...axios
    })
}
// 根据字典类型查询字典数据
export function SysDictDataSelectDictDataInfo(axios = {}) {
    return request({
        url: '/sys/dict/data/selectDictDataInfo',
        ...axios
    })
}
// 列表查询岗位树结构详细信息
export function SysPostListPostTreeInfo(axios = {}) {
    return request({
        url: '/sys/post/listPostTreeInfo',
        ...axios
    })
}
// 分页查询岗位详细信息
export function SysPostPagePostInfo(axios = {}) {
    return request({
        url: '/sys/post/pagePostInfo',
        ...axios
    })
}
// 分页查询角色详细信息
export function SysRolePagePostInfo(axios = {}) {
    return request({
        url: '/sys/role/pagePostInfo',
        ...axios
    })
}
