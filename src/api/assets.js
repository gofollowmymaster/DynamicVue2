import request from './request'
import { filterObjEmptyField } from '@/util/index'
import {apiListMock, apiDetailMock, apiDeleteMock, apiSaveMock, apiUpdateMock } from './mockUtil'
import { assetsFields} from '@/views/dyexample/dycurd1/assetsListField'
import  fixedAssetsFields from '@/views/dyexample/fixedAssetsFields.js'
import  {warningProcessedFields, warningFields} from '@/views/dyexample/warningFields.js'

const defaultConfig = {
    method: 'post',
    refuseToken: false,
    json: true
}

// ----------------------固定资产-------------------
export function assetsListApi(params) {
    debugger  
    return apiListMock(assetsFields, params)
 
}

export function assetsUpdateApi(params) {

    return apiUpdateMock(assetsFields, params)
   
}

export function assetsSaveApi(params) {
    return apiSaveMock(assetsFields, params)

}

export function assetsDeleteApi(list) {

    return apiDeleteMock(assetsFields, list)
}

export function assetsDetailApi(data) {
    return apiDetailMock(assetsFields, data)
}

export function assetsEditDetailApi(data) {
    return apiDetailMock(assetsFields, data)
}

// ----------------------不动产-------------------
export function treeStreetListApi(params) {
    return apiListMock(fixedAssetsFields, params)
}

export function treeStreetUpdateApi(params) {
    return apiUpdateMock(fixedAssetsFields, params)
}

export function treeStreetSaveApi(params) {
    return apiSaveMock(fixedAssetsFields, params)
}

export function treeStreetDeleteApi(list) {
    return apiDeleteMock(fixedAssetsFields, list)
}

export function treeStreetDetailApi(data) {
    return apiDetailMock(fixedAssetsFields, data)
}

export function exportassetsApi(params) {
    // return apiDetailMock(fixedAssetsFields, params)
}
 
// -------------告警信息--------------
export function warningPendingListApi(params = {}) {
    return apiListMock(warningFields, params)
 
}

export function warningProcessedListApi(params = {}) {
    return apiListMock(warningProcessedFields, params)
}

export function warningInfoDeleteApi(list = []) {
    return apiDeleteMock(warningProcessedFields, list)
}

export function warningPendingDeleteApi(list = []) {
    return apiDeleteMock(warningFields, list)
}

//

export function warningDetailApi(data) {
    return apiDetailMock(warningFields, data)
}

export function warningUnhandleApi(params) {
    params.handleUserId = params.handleUserId[0]?.id
    return request({
        ...defaultConfig,
        url: '/ancientTree/treeWarning/giveAnAlarm/handleGiveAnAlarm',
        data: params
    })
}

export function warningHandleApi(params) {
    params.handleUserId = params.handleUserId[0]?.id
    const pics = params.pic?.length > 0
        ? params.pic.map(file => {
            return {
                fileId: file.id || file.fileId,
                type: 2
            }
        })
        : []
    const videos = params.videos?.length > 0
        ? params.videos.map(file => {
            return {
                fileId: file.id || file.fileId,
                type: 3
            }
        })
        : []
    params.files = [...pics, ...videos]
    delete params.pic
    delete params.videos

    return request({
        ...defaultConfig,
        url: '/ancientTree/treeWarning/giveAnAlarm/handleGiveAnAlarm',
        data: params
    })
}

// -------------------- 固定资产统计--------------------
export function protectLevStatisticApi() {
    return request({
        ...defaultConfig,
        url: '/ancientTree/overview/protectLev',
        method: 'get'
    }).then(res => res.data)
}

//  固定资产   资产使用状况统计
export function growthSituationStatisticApi(district = '') {
    return request({
        ...defaultConfig,
        url: '/ancientTree/overview/growthSituation?district=' + district,
        method: 'get'
    }).then(res => res.data)
}

//  固定资产   使用年数统计
export function treeAgeStatisticApi(district = '') {
    return request({
        ...defaultConfig,
        url: '/ancientTree/overview/treeAge?district=' + district,
        method: 'get'

    }).then(res => res.data)
}

//  固定资产   资产类型统计
export function treeSpeciesStatisticApi(district = '') {
    return request({
        ...defaultConfig,
        url: '/ancientTree/overview/treeSpecies?district=' + district,
        method: 'get'

    }).then(res => res.data)
}

export function treeAndReserveRegionStatisticApi() {
    return request({
        ...defaultConfig,
        url: '/ancientTree/overview/treeAndReserveRegion',
        method: 'get'

    }).then(res => res.data)
}

// 资源数量统计
export function quantityStatisticsApi() {
    return request({
        ...defaultConfig,
        url: '/ancientTree/overview/quantityStatistics',
        method: 'get'

    }).then(res => res.data)
}

export function cureTypeCountNumStatisticsApi(protectLev = 1) {
    return request({
        ...defaultConfig,
        url: '/ancientTree/overview/cureTypeCountNum',
        method: 'post',
        data: { protectLev },
        json: false

    }).then(res => res.data)
}

export function protectTypeCountNumStatisticsApi(protectLev = 1) {
    return request({
        ...defaultConfig,
        url: '/ancientTree/overview/protectTypeCountNum',
        method: 'post',
        data: { protectLev },
        json: false
    }).then(res => res.data)
}
