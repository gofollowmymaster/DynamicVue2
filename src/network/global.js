import request from './request'
import qs from 'qs'

import { downFile } from '@/common/utils'
import { SysAdmListAdmTreeInfo } from '@/network/home'

/* **************************** 系统配置-相关 **************************** */

/* **************************** 文件下载-相关 **************************** */

export function globalFileGetFileList (idList) {
  return request({
    method: 'post',
    url: `/file/getFileList?${idList.map((unit) => `ids=${unit}`).join('&')}`
  })
}

export function globalDownloadBaseFileId (fileId) {
  return request({
    url: '/file/downloadFile',
    method: 'post',
    responseType: 'blob',
    responseOrigin: true,
    data: { id: fileId }
  }).then((response) => {
    const fileName = response.headers['content-disposition'].replace(
      /.*=(.*\.\w+)/g,
      '$1'
    )
    downFile(response.data, decodeURIComponent(fileName))
  })
}

/* 根据文件id下载文件
*/
export function globalDownloadFileById (params) {
  debugger
  const fileId = params.fileId || params.id
  return request({
    url: '/file/downloadFile',
    method: 'post',
    responseType: 'blob',
    responseOrigin: true,
    data: { id: fileId }
  })
}

export function elementUploadFileApi (options = {}) {
  debugger
  const { file, onSuccess, onError } = options
  const formData = new FormData()
  formData.append('files', file)
  return request({
    refuseToken: false,
    url: '/file/uploadFile?type=1',
    method: 'post',
    json: false,
    data: formData,
    uploadFile: true,
    Headers: {
      ContentType: 'multipart/form-data;'
    }
  })
    .then((res) => {
      debugger
      return { fileId: res.data[0] }
    })
    .then(onSuccess)
    .catch(onError)
}

/**
 * 根据字典Type 获取字典列表
 * @param {
          dictType: '***'
        } params   示例:
 * @returns   Promise
 */
export function selectDictDataInfoApi (params) {
  return request({
    url: '/sys/dict/data/selectDictDataInfo?' + qs.stringify(params),
    refuseToken: false,
    json: false,
    method: 'get'
  })
}

export function buildDynamicSelectOption (dictType) {
  return {
    key: 'id',
    value: 'id',
    label: 'dictLabel',
    apiPromise: () => {
      return selectDictDataInfoApi({ dictType }).then((res) => res.data || [])
    }
  }
}

const treeRootCode = window._config.regionCode

export function asyncAdministractiveTreeNode (node, resolve) {
  if (node.level === 0) {
    resolve([{ id: '2115', admName: '渝中区', ancestorAdmName: '重庆市渝中区', admCode: '500103000000', parentAdmCode: '500000000000', haveChildNode: true }])
    return
  }
  SysAdmListAdmTreeInfo({
    method: 'get',
    params: {
      parentAdmCode: node.level === 0 ? treeRootCode : node.data.admCode
    }
  }).then((res) => {
    const list = (res?.data ?? []).map((unit) => ({
      ...unit,
      leaf: !unit.haveChildNode
    }))
    // if( node.level === 0 )
    resolve(list)
  })
}

export function srcDownloadFileById (url) {
  return request({
    url,
    method: 'get',
    responseType: 'blob',
    responseOrigin: true
  }).then((response) => {
    const fileName = response.headers?.['content-disposition'] ? (response.headers['content-disposition'].replace(
      /.*=(.*\.\w+)/g,
      '$1'
    )) : '下载文件'
    downFile(response.data, decodeURIComponent(fileName))
  })
}
