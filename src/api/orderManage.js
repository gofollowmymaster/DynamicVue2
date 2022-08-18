import qs from 'qs'
import {apiListMock, apiDetailMock, apiDeleteMock, apiSaveMock, apiUpdateMock } from './mockUtil'

import { isEmpty } from '@/util/index'

import orderFields  from '@/views/dyexample/order/orderFields'
import planFields  from '@/views/dyexample/order/planFields'

import buildingProjectFields from '@/views/dyexample/order/buildingFields'
import buildingProgressFields from '@/views/dyexample/order/progressFields'
import transFields from '@/views/dyexample/order/transFields'
import completeFields from '@/views/dyexample/order/progressFields'



const defaultConfig = {
    method: 'post',
    refuseToken: false,
    json: true
}


  
// ----------------------计划订单-------------------

export function orderListApi(params) {
    apiListMock(planFields,params)
    apiListMock(buildingProjectFields,params)
    apiListMock(transFields,params)
    apiListMock(completeFields,params)


    return apiListMock(orderFields,params)
   
}

export function planProjectListApi(params) {
    
}

export function planProjectUpdateApi(params) {
    return apiUpdateMock(planFields,params)
    
}

export function planProjectSaveApi(params) {
    return apiSaveMock(planFields,params)
   
}

// 删除订单订单 支持各种类型
export function orderDeleteApi(list) {
    return apiDeleteMock(orderFields,list)
    
}

export function planProjectDetailApi(id) {
    return apiDetailMock(planFields,{id})
    
}

export function buildingProjectListApi(params) {


   
}

export function buildingProjectSaveApi(params) {
    return apiSaveMock(buildingProjectFields,params)
    
}

export function buildingProjectUpdateApi(params) {
    return apiUpdateMock(buildingProjectFields,params)

   
}

export function buildingProjectDetailApi(id) {
    return apiDetailMock(buildingProjectFields,{id})
}

export function orderProgressUpdateApi(params) {
    return apiUpdateMock(buildingProgressFields,params)
   
}

export function orderProgressListApi(params) {
    return apiDetailMock(buildingProgressFields,params)
    
}

export function transProjectListApi(params) {
     
}

export function transProjectSaveApi(params) {
     
}

export function transProjectUpdateApi(params) {
    
}

export function transProjectDetailApi(id) {
    return apiDetailMock( transFields,{id})
}

export function completeProjectDetailApi(id) {
    return apiDetailMock( completeFields,{id})
}

export function completeProjectUpdateApi(params) {
    
}

export function completeProjectSaveApi(params) {

   
}

export function yearPlanListApi(params) {
   
}

export function exportYearPlanApi(params) {
   
}

export function planYearListApi() {
    
}

export function buildDynamicYearSelectOption(dictType) {
    
}

export function yearPlanUpdateApi(params) {
    
}

// ----------------------社会订单-------------------
export function socialProjectListApi(params) {
    
}

export function socialProjectUpdateApi(params) {

    
}

export function socialProjectSaveApi(params) {
    
}

export function socialProjectDeleteApi(list) {

    
}

export function socialProjectDetailApi(data) {

    
}

export function getSocialProjectAirInfoApi(id) {
   
 
}

export function socialProjecValidSavetApi(params) {
   
    params.files = Array.isArray(params.files) ? params.files.map(item => item.fileId) : []

    
}

export function socialProjecValidUpdatetApi(params) {
   
    params.files = Array.isArray(params.files) ? params.files.map(item => item.fileId) : []
 
}

export function mounthProgressYearListApi(id) {
   
}

export function yearProgressListApi() {
    
}
