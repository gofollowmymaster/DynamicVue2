import request, { STATICENV } from './request'
import qs from 'qs'

import { isEmpty } from '@/common/utils'
export const staticUrl = STATICENV
const defaultConfig = {
  method: 'post',
  refuseToken: false,
  json: true
}

// 工程项目
// 下载附件  文件路径  文件名
export function downFile (fileUrl, fileName) {
  const url = staticUrl + fileUrl
  fetch(url).then(result => result.blob().then(blob => {
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }))
}
// 分页查询字典数据信息
export function SysDictDataPageDictDataInfo (axios = {}) {
  return request({
    url: '/sys/dict/data/pageDictDataInfo',
    method: 'get',
    ...axios
  })
}
// 查询承建商列表
export function getListContractorPage (axios = {}) {
  return request({
    url: '/project/contractor/manager/listContractorPage',
    method: 'post',
    json: true,
    data: { ...axios }
  })
}
// 承建商新增
export function contractorAdd (axios = {}) {
  return request({
    url: '/project/contractor/manager/insert',
    method: 'post',
    json: true,
    ...axios
  })
}
// 承建商修改
export function contractorUpdate (axios = {}) {
  return request({
    url: '/project/contractor/manager/update',
    method: 'post',
    json: true,
    ...axios
  })
}
// 承建商详情
export function contractorDetail (axios = {}) {
  return request({
    url: '/project/contractor/manager/getContractorInfo',
    method: 'get',
    json: true,
    params: { ...axios }
  })
}
// 承建商删除
export function contractorDelete (axios = {}) {
  return request({
    url: '/project/contractor/manager/delete',
    method: 'post',
    json: true,
    data: axios
  })
}
// 承建商更新标记
export function contractorUpdateStatus (axios = {}) {
  return request({
    url: '/project/contractor/manager/updateStatus',
    method: 'post',
    data: axios,
    json: false
  })
}
// 承建商id查询工程项目
export function contractorPageContractor (axios = {}) {
  return request({
    url: 'project/pageContractor',
    method: 'post',
    json: true,
    data: { ...axios }
  })
}
// --------项目概览--------
// 项目概览  综合概览
export function projectOverviewAll (axios = {}) {
  return request({
    url: '/project/overview/all',
    method: 'get',
    data: axios,
    json: false
  })
}
// 项目概览  数量
export function projectOverviewNumber (axios = {}) {
  return request({
    url: '/project/overview/number',
    method: 'get',
    data: axios,
    json: false
  })
}
// 项目概览  区域
export function projectOverviewArea (axios = {}) {
  return request({
    url: '/project/overview/area',
    method: 'get',
    data: axios,
    json: false
  })
}
// 项目概览  变化趋势
export function projectOverviewTrend (axios = {}) {
  return request({
    url: '/project/overview/trend',
    method: 'get',
    data: axios,
    json: false
  })
}

// ----------------------计划工程-------------------

export function projectListApi (params) {
  params.buildType = (!isEmpty(params.buildType)) ? [params.buildType] : []
  params.admId = params.admId?.[0]?.id || ''
  return request({
    ...defaultConfig,
    url: '/project/page',
    data: params
  })
}

export function planProjectListApi (params) {
  debugger
  params.admId = params.admId?.[0]?.id || ''
  return request({
    ...defaultConfig,
    url: '/project/library/page',
    data: params
  })
}

export function planProjectUpdateApi (params) {
  params.deptId = params.deptId[0]?.id
  params.projectContractorId = params.projectContractorId[0]?.id
  params.approveFileIds = Array.isArray(params.approveFileIds) ? params.approveFileIds.map(item => item.fileId) : []
  params.bidFileIds = Array.isArray(params.bidFileIds) ? params.bidFileIds.map(item => item.fileId) : []
  params.planFileIds = Array.isArray(params.planFileIds) ? params.planFileIds.map(item => item.fileId) : []
  params.admId = params.admId[0]?.id
  params.designFileIds = Array.isArray(params.designFileIds) ? params.designFileIds.map(item => item.fileId) : []

  return request({
    ...defaultConfig,
    url: '/project/library/update',
    data: params
  })
}

export function planProjectSaveApi (params) {
  params.deptId = params.deptId[0]?.id
  params.projectContractorId = params.projectContractorId[0]?.id
  params.approveFileIds = Array.isArray(params.approveFileIds) ? params.approveFileIds.map(item => item.fileId) : []
  params.bidFileIds = Array.isArray(params.bidFileIds) ? params.bidFileIds.map(item => item.fileId) : []
  params.planFileIds = Array.isArray(params.planFileIds) ? params.planFileIds.map(item => item.fileId) : []
  params.admId = params.admId[0]?.id
  params.designFileIds = Array.isArray(params.designFileIds) ? params.designFileIds.map(item => item.fileId) : []

  return request({
    ...defaultConfig,
    url: '/project/library/save',
    data: params

  })
}

// 删除工程项目 支持各种类型
export function projectDeleteApi (list) {
  debugger

  const ids = Array.isArray(list) ? list.map(item => item.id) : [list.id]

  return request({
    ...defaultConfig,
    url: '/project/delete',
    data: ids
  })
}

export function planProjectDetailApi (id) {
  debugger

  return request({
    ...defaultConfig,
    url: '/project/library/info?id=' + id,
    json: false,
    method: 'get'
  }).then((res) => {
    res.data.admId = [{
      id: res.data.admId,
      name: res.data.admName
    }]
    res.data.deptId = [{
      id: res.data.deptId,
      name: res.data.deptName
    }]
    res.data.projectContractorId = [
      { id: res.data.projectContractorId, name: res.data.projectContractorName }
    ]
    res.data.planFileIds = res.data.planFiles
    res.data.bidFileIds = res.data.bidFiles
    res.data.approveFileIds = res.data.approveFiles
    res.data.designFileIds = res.data.designFiles
    return res.data
  })
}

export function buildingProjectListApi (params) {
  params.admId = params.admId?.[0]?.id || ''
  debugger
  return request({
    ...defaultConfig,
    url: '/project/building/page',
    data: params
  })
}

export function buildingProjectSaveApi (params) {
  params.projectContractorId = params.projectContractorId[0]?.id
  params.fileIds = Array.isArray(params.fileIds) ? params.fileIds.map(item => item.fileId) : []
  params.buildingChild = Array.isArray(params.buildingChild) ? params.buildingChild : []

  return request({
    ...defaultConfig,
    url: '/project/building/save',
    data: params
  })
}

export function buildingProjectUpdateApi (params) {
  params.projectContractorId = params.projectContractorId[0]?.id
  params.fileIds = Array.isArray(params.fileIds) ? params.fileIds.map(item => item.fileId) : []

  return request({
    ...defaultConfig,
    url: '/project/building/update',
    data: params
  })
}

export function buildingProjectDetailApi (id) {
  return request({
    ...defaultConfig,
    url: '/project/building/info?projectLibraryId=' + id,
    method: 'get'
  }).then((res) => {
    debugger
    res.data.buildingChild = res.data.childList
    res.data.fileIds = res.data.fileList

    res.data.projectContractorId = [
      { id: res.data.projectContractorId, name: res.data.projectContractorName }
    ]

    return res.data
  })
}

export function projectProgressUpdateApi (params) {
  debugger
  delete params.monthDate
  return request({
    ...defaultConfig,
    url: '/project/progress/month/fill',
    data: params
  })
}

export function projectProgressListApi (params) {
  params.admId = params.admId?.[0]?.id || ''

  debugger
  return request({
    ...defaultConfig,
    url: '/project/progress/month/list?' + qs.stringify(params),
    data: params,
    method: 'get'

  }).then((res) => {
    debugger
    const list = res.data.monthProgressList
    delete res.data.monthProgressList
    list.push({
      monthDate: '当年累计',
      areaProportion: res.data.areaProportionYearAmount,
      buildingArea: res.data.buildingAreaYearAmount,
      buildingGreenArea: res.data.buildingGreenAreaYearAmount,
      buildingMoney: res.data.buildingMoneyYearAmount,
      buildingWaterArea: res.data.buildingWaterAreaYearAmount,
      greenAreaProportion: res.data.greenAreaProportionYearAmount,
      waterAreaProportion: res.data.waterAreaProportionYearAmount,
      isShow: false
    })
    list.push({
      monthDate: '总体累计',
      areaProportion: res.data.areaProportionAllAmount,
      buildingArea: res.data.buildingAreaAllAmount,
      buildingGreenArea: res.data.buildingGreenAreaAllAmount,
      buildingMoney: res.data.buildingMoneyAllAmount,
      buildingWaterArea: res.data.buildingWaterAreaAllAmount,
      greenAreaProportion: res.data.greenAreaProportionAllAmount,
      waterAreaProportion: res.data.waterAreaProportionAllAmount,
      isShow: false
    })
    return {
      totalCount: list.length,
      list
    }
  })
}

export function transProjectListApi (params) {
  params.admId = params.admId?.[0]?.id || ''

  debugger
  return request({
    ...defaultConfig,
    url: '/project/transfer/page',
    data: params
  })
}

export function transProjectSaveApi (params) {
  debugger
  params.fileIds = Array.isArray(params.fileIds) ? params.fileIds.map(item => item.fileId) : []

  let tempEvaluate = params.projectContractorEvaluate
  params.projectContractorEvaluate = tempEvaluate.evaluate
  params.projectContractorGrade = tempEvaluate.grade * 2
  tempEvaluate = params.projectEvaluate
  params.projectEvaluate = tempEvaluate.evaluate
  params.projectGrade = tempEvaluate.grade * 2
  // params.projectContractorEvaluate=params.projectContractorEvaluate.evaluate
  params.equipmentList = Array.isArray(params.equipmentList) ? params.equipmentList : []
  params.plantList = Array.isArray(params.plantList) ? params.plantList : []
  params.projectLibraryId = params.id
  params.projectContractorId = params.projectContractorId[0].id
  delete params.id
  return request({
    ...defaultConfig,
    url: '/project/transfer/save',
    data: params
  })
}

export function transProjectUpdateApi (params) {
  params.fileIds = Array.isArray(params.fileIds) ? params.fileIds.map(item => item.fileId) : []

  let tempEvaluate = params.projectContractorEvaluate
  params.projectContractorEvaluate = tempEvaluate.evaluate
  params.projectContractorGrade = tempEvaluate.grade * 2
  tempEvaluate = params.projectEvaluate
  params.projectEvaluate = tempEvaluate.evaluate
  params.projectGrade = tempEvaluate.grade * 2
  // params.projectContractorEvaluate=params.projectContractorEvaluate.evaluate
  params.equipmentList = Array.isArray(params.equipmentList) ? params.equipmentList : []
  params.plantList = Array.isArray(params.plantList) ? params.plantList : []
  // params.projectLibraryId=params.id

  params.projectContractorId = params.projectContractorId[0].id

  // delete params.id

  return request({
    ...defaultConfig,
    url: '/project/transfer/update',
    data: params
  })
}

export function transProjectDetailApi (id) {
  return request({
    ...defaultConfig,
    url: '/project/transfer/info?projectLibraryId=' + id,
    method: 'get'
  }).then((res) => {
    debugger
    res.data.fileIds = res.data.fileList

    res.data.projectContractorEvaluate = {
      grade: res.data.projectContractorGrade / 2,
      evaluate: res.data.projectContractorEvaluate
    }
    res.data.projectEvaluate = {
      grade: res.data.projectGrade / 2,
      evaluate: res.data.projectEvaluate
    }
    res.data.projectContractorId = [
      { id: res.data.projectContractorId, name: res.data.projectContractorName }
    ]

    return res.data
  })
}

export function completeProjectDetailApi (data) {
  return request({
    ...defaultConfig,
    url: '/project/finish/info?projectLibraryId=' + data.id,
    method: 'get'
  }).then((res) => {
    // debugger

    return res.data
  })
}

export function completeProjectUpdateApi (params) {
  // delete params.id

  return request({
    ...defaultConfig,
    url: '/project/finish/update',
    data: params
  })
}

export function completeProjectSaveApi (params) {
  debugger

  return request({
    ...defaultConfig,
    url: '/project/finish/save',
    data: params
  })
}

export function yearPlanListApi (params) {
  params.admId = params.admId?.[0]?.id || ''
  return request({
    ...defaultConfig,
    url: '/project/progress/year/page',
    data: params
  }).then((res) => {
    res.data.list = res.data.list.map((item) => {
      item.year = params.year
      return item
    })
    return res
  })
}

export function exportYearPlanApi (params) {
  return request({
    ...defaultConfig,
    url: '/project/progress/year/export',
    json: true,
    method: 'post',
    data: params,
    downLoadfile: true,
    responseOrigin: true

  })
}

export function planYearListApi () {
  return request({
    ...defaultConfig,
    url: '/project/progress/year/yearList',
    json: true,
    method: 'get'
  })
}

export function buildDynamicYearSelectOption (dictType) {
  return {
    key: 'id',
    value: 'id',
    label: 'dictLabel',
    apiPromise: () => {
      return planYearListApi().then((res) => res.data || [])
    }
  }
}

export function yearPlanUpdateApi (params) {
  return request({
    ...defaultConfig,
    url: '/project/progress/year/update',
    data: params
  })
}

// ----------------------社会项目-------------------
export function socialProjectListApi (params) {
  params.district = params.district?.[0]?.id
  return request({
    ...defaultConfig,
    url: '/project/society/manager/listSocietyProjectPage',
    data: params
  })
}

export function socialProjectUpdateApi (params) {
  debugger

  params.buildContractorId = params.buildContractorId[0]?.id
  params.contractContractorId = params.contractContractorId[0]?.id
  params.district = params.district[0]?.id
  params.files = Array.isArray(params.files) ? params.files.map(item => item.fileId) : []

  return request({
    ...defaultConfig,
    url: '/project/society/manager/update',
    data: params
  })
}

export function socialProjectSaveApi (params) {
  params.buildContractorId = params.buildContractorId[0]?.id
  params.contractContractorId = params.contractContractorId[0]?.id
  params.district = params.district[0]?.id
  params.files = Array.isArray(params.files) ? params.files.map(item => item.fileId) : []

  return request({
    ...defaultConfig,
    url: '/project/society/manager/insert',
    data: params

  })
}

export function socialProjectDeleteApi (list) {
  debugger

  const ids = Array.isArray(list) ? list.map(item => item.id) : [list.id]

  return request({
    ...defaultConfig,
    url: '/project/society/manager/delete',
    data: ids
  })
}

export function socialProjectDetailApi (data) {
  debugger

  return request({
    ...defaultConfig,
    url: '/project/society/manager/getProjectSocietyInfo',
    json: false,
    data: { id: data.id }
  }).then((res) => {
    debugger
    res.data.buildContractorId = [{
      id: res.data.buildContractorId,
      name: res.data.buildContractorName
    }]
    res.data.contractContractorId = [{
      id: res.data.contractContractorId,
      name: res.data.contractContractorName
    }]
    res.data.district = [
      { id: res.data.district, name: res.data.districtName }
    ]

    res.data.pics = res.data.imageFiles
    return res.data
  })
}

export function getSocialProjectAirInfoApi (id) {
  debugger
  return request({
    ...defaultConfig,
    url: '/project/society/air/getSocietyProjectAirInfo?orderManageId=' + id,
    method: 'get'
  }).then(res => {
    return res.data
  })
}

export function socialProjecValidSavetApi (params) {
  debugger
  params.files = Array.isArray(params.files) ? params.files.map(item => item.fileId) : []

  return request({
    ...defaultConfig,
    url: '/project/society/air/insert',
    data: params
  })
}

export function socialProjecValidUpdatetApi (params) {
  debugger
  params.files = Array.isArray(params.files) ? params.files.map(item => item.fileId) : []

  return request({
    ...defaultConfig,
    url: '/project/society/air/update',
    data: params
  })
}

export function mounthProgressYearListApi (id) {
  return request({
    ...defaultConfig,
    url: '/project/progress/month/yearList?projectLibraryId=' + id,
    method: 'get'
  })
}

export function yearProgressListApi () {
  return request({
    ...defaultConfig,
    url: '/project/progress/year/yearList',
    method: 'get'
  })
}
