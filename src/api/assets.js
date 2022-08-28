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
export function fixedAssetsListApi(params) {
    return apiListMock(fixedAssetsFields, params)
}

export function fixedAssetsUpdateApi(params) {
    return apiUpdateMock(fixedAssetsFields, params)
}

export function fixedAssetsSaveApi(params) {
    return apiSaveMock(fixedAssetsFields, params)
}

export function fixedAssetsDeleteApi(list) {
    return apiDeleteMock(fixedAssetsFields, list)
}

export function fixedAssetsDetailApi(data) {
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
    return apiSaveMock([],params )
}

export function warningHandleApi(params) {
    params.handleUserId = params.handleUserId[0]?.id
    

    return apiSaveMock([],params )
}

// -------------------- 固定资产统计--------------------
export function protectLevStatisticApi() {
    return Promise.resolve(
        [{"categoryName":"一级","countNumber":2,"proportion":50.0},
        {"categoryName":"二级","countNumber":1,"proportion":25.0},
        {"categoryName":"三级","countNumber":1,"proportion":25.0}])
}

//  固定资产   资产使用状况统计
export function growthSituationStatisticApi(district = '') {
    return Promise.resolve(
        [{"categoryName":"损坏","countNumber":0,"proportion":0.0},{"categoryName":"闲置","countNumber":3,"proportion":75.0},
        {"categoryName":"正常","countNumber":1,"proportion":25.0},{"categoryName":"废弃","countNumber":0,"proportion":0.0}])
}

//  固定资产   使用年数统计
export function assetAgeStatisticApi(district = '') {
    return Promise.resolve( [{"categoryName":"50,100","countNumber":0,"proportion":0.0},{"categoryName":"100,200","countNumber":2,"proportion":50.0},
    {"categoryName":"200,300","countNumber":1,"proportion":25.0},{"categoryName":"300以上","countNumber":1,"proportion":25.0}])
}

//  固定资产   资产类型统计
export function assetSpeciesStatisticApi(district = '') {
    return Promise.resolve( [{"categoryName":"切割机","countNumber":1,"proportion":null},{"categoryName":"焊机","countNumber":2,"proportion":null},
    {"categoryName":"中文名TestTestTestT","countNumber":0,"proportion":null},{"categoryName":"asda","countNumber":0,"proportion":null},{"categoryName":"21312","countNumber":0,"proportion":null},{"categoryName":"12改002","countNumber":0,"proportion":null},
    {"categoryName":"撒旦法1","countNumber":0,"proportion":null},{"categoryName":"中文名TestTestTest1","countNumber":0,"proportion":null},
    {"categoryName":"工业机器人","countNumber":0,"proportion":null},{"categoryName":"12改001","countNumber":0,"proportion":null},
    {"categoryName":"12","countNumber":0,"proportion":null},{"categoryName":"1","countNumber":0,"proportion":null},
    {"categoryName":"中文名TestTestTestTes","countNumber":0,"proportion":null},{"categoryName":"21312","countNumber":0,"proportion":null},
    {"categoryName":"中文名TestTestTest","countNumber":0,"proportion":null}])
}
 

 
 
