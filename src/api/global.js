import request from './request'
import qs from 'qs'
import Mock from 'mockjs'

import { downFile } from '@/util/index'
import { dictMapDb } from './mockUtil'

/* **************************** 系统配置-相关 **************************** */

/* **************************** 文件下载-相关 **************************** */

export function globalFileGetFileList(idList) {
 
}

export function globalDownloadBaseFileId(fileId) {
    return request({
        url: '',
        method: 'post',
        responseType: 'blob',
        responseOrigin: true,
        data: { id: fileId }
    }).then(response => {
        const fileName = response.headers['content-disposition'].replace(
            /.*=(.*\.\w+)/g,
            '$1'
        )
        downFile(response.data, decodeURIComponent(fileName))
    })
}

/* 根据文件id下载文件
*/
export function globalDownloadFileById(params) {
    const fileId = params.fileId || params.id
    return request({
        url: '',
        method: 'post',
        responseType: 'blob',
        responseOrigin: true,
        data: { id: fileId }
    })
}

export function elementUploadFileApi(options = {}) {
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
        .then(res => {
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

export function selectDictDataInfoApi({dictType}) {
    if (!dictMapDb.get(dictType)) {
        dictMapDb.set(dictType, [
            {
                id: 1, dictLabel: Mock.mock('@cword(3)')
            },
            {id: 2, dictLabel: Mock.mock('@cword(3)')},
            {id: 3, dictLabel: Mock.mock('@cword(3)')}
        ])
    }

    return Promise.resolve(dictMapDb.get(dictType))
}
 

export function srcDownloadFileById(url) {
    return request({
        url,
        method: 'get',
        responseType: 'blob',
        responseOrigin: true
    }).then(response => {
        const fileName = response.headers?.['content-disposition']
            ? (response.headers['content-disposition'].replace(
                /.*=(.*\.\w+)/g,
                '$1'
            ))
            : '下载文件'
        downFile(response.data, decodeURIComponent(fileName))
    })
}
