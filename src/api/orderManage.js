import qs from 'qs'
import {apiListMock, apiDetailMock, apiDeleteMock, apiSaveMock, apiUpdateMock } from './mockUtil'

import { isEmpty } from '@/util/index'

import orderFields  from '@/views/dyexample/order/orderFields'
import planFields  from '@/views/dyexample/order/planFields'

import buildingOrderFields from '@/views/dyexample/order/buildingFields'
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
    apiListMock(planFields, params)
    apiListMock(buildingOrderFields, params)
    apiListMock(transFields, params)
    apiListMock(completeFields, params)

    console.log('---orderListApi----',)

    return apiListMock(orderFields, params)
   
}

export function planOrderListApi(params) {
    
}

export function planOrderUpdateApi(params) {
    return apiUpdateMock(planFields, params)
    
}

export function planOrderSaveApi(params) {
    return apiSaveMock(planFields, params)
   
}

// 删除订单订单 支持各种类型
export function orderDeleteApi(list) {
    return apiDeleteMock(orderFields, list)
    
}

export function planOrderDetailApi(id) {
    console.log('----planOrderDetailApi----', id)
    return apiDetailMock(planFields, {id})
    
}

export function buildingOrderListApi(params) {
   
}

export function buildingOrderSaveApi(params) {
    return apiSaveMock(buildingOrderFields, params)
    
}

export function buildingOrderUpdateApi(params) {
    return apiUpdateMock(buildingOrderFields, params)
   
}

export function buildingOrderDetailApi(id) {
    console.log('----buildingOrderDetailApi----', id)

    return apiDetailMock(buildingOrderFields, {id})
}

export function orderProgressUpdateApi(params) {
    return apiUpdateMock(buildingProgressFields, params)
   
}

export function orderProgressListApi(params) {
    return apiListMock(buildingProgressFields, params)
    
}

export function transOrderListApi(params) {
     
}

export function transOrderSaveApi(params) {
    return apiDetailMock(transFields, params)
}

export function transOrderUpdateApi(params) {
    return apiDetailMock(transFields, params)
    
}

export function transOrderDetailApi(id) {
    console.log('----transOrderDetailApi----', id)

    return apiDetailMock(transFields, {id})
}

export function completeOrderDetailApi(id) {
    return apiDetailMock(completeFields, {id})
}

export function completeOrderUpdateApi(params) {
    return apiDetailMock(completeFields, params)
}

export function completeOrderSaveApi(params) {
    return apiDetailMock(completeFields, params)
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
  

export function mounthProgressYearListApi(id) {
   
}

export function yearProgressListApi() {
    
}
