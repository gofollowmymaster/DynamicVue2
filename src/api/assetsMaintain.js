
import { assetsFields, transFields, maintainFields, protectFields} from '@/views/dyexample/dycurd1/assetsListField'
import {apiListMock, apiDetailMock } from './mockUtil'
// import qs from 'qs'
const defaultConfig = {
    method: 'post',
    refuseToken: false,
    json: true
}
 

// -------维护记录--------------------
export function maintainListApi(params = {}) {
    // const handleTime= JSON.parse(params.handleTime)
    return apiListMock(maintainFields, params)
}

export function maintainUpdateApi(params) {
    return apiUpdateMock(maintainFields, params)
}

export function maintainSaveApi(params) {
    return apiSaveMock(maintainFields, params)
}

export function maintainDeleteApi(list) {
    return apiDeleteMock(maintainFields, list)
}

export function maintainDetailApi(data) {
    return apiDetailMock(maintainFields, data)
}

// -------保护记录--------------------
export function protectListApi(params = {}) {
    return apiListMock(protectFields, params)
}

export function protectUpdateApi(params) {
    return apiUpdateMock(protectFields, params)
    
}

export function protectSaveApi(params) {

    return apiSaveMock(protectFields, params)
}

export function protectDeleteApi(list) {
    return apiDeleteMock(protectFields, list)

}

export function protectDetailApi(data) {
    return apiDetailMock(protectFields, data)

}

// -------转移记录--------------------
export function transListApi(params = {}) {
    debugger
    return apiListMock(transFields, params)
}

export function transUpdateApi(params) {
    return apiUpdateMock(transFields, params)
}

export function transSaveApi(params) {
    return apiSaveMock(transFields, params)
}

export function transDeleteApi(list) {

    return apiDeleteMock(transFields, list)
}

export function transDetailApi(data) {
    return apiDetailMock(transFields, data)
}
