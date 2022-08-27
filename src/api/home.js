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

 