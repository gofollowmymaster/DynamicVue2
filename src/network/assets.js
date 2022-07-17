import request from './request'
import { filterObjEmptyField } from '@/packages/utils/tool'
const defaultConfig = {
  method: 'post',
  refuseToken: false,
  json: true
}

// ----------------------固定资产-------------------
export function assetsListApi (params) {
  console.log('--request---', params)
  debugger
  params.district = params.district?.[0]?.id || ''
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/listTreeMangePage',
    data: params
  })
}

export function assetsUpdateApi (params) {
  debugger

  params.manageUser = params.manageUser[0]?.id
  params.treeNameId = params.treeNameId[0]?.id
  params.unit = params.unit[0]?.id
  params.admId = params.admId[0]?.id

  const files = params.files.length > 0 ? params.files.map(file => {
    return {
      id: file.id || file.fileId,
      belongFileType: '2'
    }
  }) : []
  const pics = params.pics.length > 0 ? params.pics.map(file => {
    return {
      id: file.id || file.fileId,
      belongFileType: '1'
    }
  }) : []
  params.files = [...files, ...pics].filter(file => file.id)
  delete params.pics

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/update',
    data: params
  })
}

export function assetsSaveApi (params) {
  params.manageUser = params.manageUser[0]?.id
  params.treeNameId = params.treeNameId[0]?.id
  params.unit = params.unit[0]?.id
  params.admId = params.admId[0]?.id

  const files = params.files.length > 0 ? params.files.map(file => {
    return {
      id: file.id || file.fileId,
      belongFileType: '2'
    }
  }) : []
  const pics = params.pics.length > 0 ? params.pics.map(file => {
    return {
      id: file.id || file.fileId,
      belongFileType: '1'
    }
  }) : []
  params.files = [...files, ...pics].filter(file => file.id)
  delete params.pics

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/insert',
    data: params

  })
}

export function assetsDeleteApi (list) {
  debugger

  const ids = Array.isArray(list) ? list.map(item => item.id) : [list.id]

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/batchDelete',
    data: ids
  })
}

export function assetsDetailApi (data) {
  debugger

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/getTreeMangeInfo?id=' + data.id,
    json: false,
    method: 'get'
  }).then((res) => {
    res.data.treeNameId = [{
      id: res.data.treeNameId,
      name: res.data.treeName
    }]
    res.data.admId = [{
      id: res.data.admId,
      name: res.data.districtName
    }]
    res.data.unit = [
      { id: res.data.unit, name: res.data.unitName }
    ]
    res.data.manageUser = [
      { id: res.data.manageUser, name: res.data.manageUserName }
    ]
    res.data.pics = res.data.imageFiles
    return res.data
  })
}

export function assetsEditDetailApi (data) {
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/getTreeMangeUpdateInfo?id=' + data.id,
    json: false,
    method: 'get'
  }).then((res) => {
    res.data.treeNameId = [{
      id: res.data.treeNameId,
      name: res.data.treeName
    }]
    res.data.admId = [{
      id: res.data.admId,
      name: res.data.districtName
    }]
    res.data.unit = [
      { id: res.data.unit, name: res.data.unitName }
    ]
    res.data.manageUser = [
      { id: res.data.manageUser, name: res.data.manageUserName }
    ]
    res.data.pics = res.data.imageFiles

    return res.data
  })
}

// ----------------------不动产-------------------
export function treeStreetListApi (params) {
  params.area = params.area?.[0]?.id || ''
  params.treeName = params.treeName?.[0]?.id || ''

  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/list',
    data: params,
    json: false
  })
}

export function treeStreetUpdateApi (params) {
  debugger
  params.administrator = params.administrator[0]?.id
  params.unit = params.unit[0]?.id
  params.area = params.area[0]?.id
  params.pic = (params.pic?.length) ? params.pic.map(pic => pic.fileId) : []
  params.mainPlant = Object.values(params.mainPlant).map((item) => {
    item.treeId = item.treeId[0]?.id
    delete item.id
    return item
  })

  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/update',
    data: params

  })
}

export function treeStreetSaveApi (params) {
  debugger
  params.administrator = params.administrator[0]?.id
  params.unit = params.unit[0]?.id
  params.area = params.area[0]?.id
  params.pic = (params.pic?.length) ? params.pic.map(pic => pic.fileId) : []
  params.mainPlant = Object.values(params.mainPlant).map((item) => {
    item.treeId = item.treeId[0]?.id
    delete item.id
    return item
  })
  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/save',
    data: params
  })
}

export function treeStreetDeleteApi (list) {
  const ids = Array.isArray(list) ? list.map(item => 'ids=' + item.id).join('&') : 'ids=' + list.id

  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/delete?' + ids,
    json: false
  })
}

export function treeStreetDetailApi (data) {
  debugger
  return request({
    ...defaultConfig,
    url: '/shade/treestreetmanage/info?id=' + data.id,
    json: false,
    method: 'get'
  }).then((res) => {
    debugger
    res.data.administrator = [{
      id: res.data.administrator,
      name: res.data.administratorName
    }]
    res.data.area = [{
      id: res.data.area,
      name: res.data.areaName
    }]
    res.data.unit = [
      { id: res.data.unit, name: res.data.unitName }
    ]
    // res.data.administrator = [
    //   { id: res.data.administrator, name: res.data.manageUserName }
    // ]
    res.data.mainPlant = res.data.voList?.length ? res.data.voList.map((item) => {
      item.treeId = [{ id: item.treeId || item.id, name: item.treeName }]
      return item
    }) : []
    delete res.data.voList
    return res.data
  })
}

export function exportOldtreeApi (params) {
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeManage/manage/export',
    json: true,
    method: 'post',
    data: params,
    downLoadfile: true,
    responseOrigin: true
    // responseType:'',

  })
}

// -------资产类型管理--------------------
export function treeSpeciesListApi (params = {}) {
  debugger

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/listTreeSpeciesPage',
    // data: params,
    data: params.params,
    json: false

  })
}

export function treeSpeciesTreeApi (params = {}) {
  debugger

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/listTreeSpecies',
    // data: params,
    data: params.params,
    json: false

  })
}

export function treeSpeciesUpdateApi (params) {
  params.botanyId = params.botanyId[0].id
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/update',
    data: params
  })
}

export function treeSpeciesSaveApi (params) {
  params.botanyId = params.botanyId[0]?.id
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/insert',
    data: params
  })
}

export function treeSpeciesDeleteApi (ids) {
  debugger
  ids = Array.isArray(ids) ? ids.map(item => item.id).join(',') : [ids.id]
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/delete',
    data: ids
  })
}

export function treeSpeciesDetailApi (data) {
  debugger
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/speciesManage/getInfo',
    data: { id: data.id },
    json: false
  }).then((res) => {
    debugger
    res.data.botanyId = [{
      id: res.data?.botanyId,
      name: res.data?.botanyName
    }]

    return res.data || {}
  })
}

// -------------后备资源--------------
export function backupListApi (params = {}) {
  params.area = params.area?.[0]?.id || ''
  params = filterObjEmptyField(params)
  return request({
    ...defaultConfig,
    url: '/reserve/treeresourcemanage/list',
    // data: params,
    data: params,
    json: false
  })
}

export function backupUpdateApi (params) {
  params.treeId = params.treeId[0]?.id
  params.administrator = params.administrator[0]?.id
  params.unit = params.unit[0]?.id
  params.area = params.area[0]?.id

  params.pic = params.pic?.length > 0 ? params.pic.map(file => {
    return {
      fileId: file.id || file.fileId
    }
  }) : []
  return request({
    ...defaultConfig,
    url: '/reserve/treeresourcemanage/update',
    data: params
  })
}

export function backupSaveApi (params) {
  debugger
  params.treeId = params.treeId[0]?.id
  params.administrator = params.administrator[0]?.id
  params.unit = params.unit[0]?.id
  params.area = params.area[0]?.id

  params.pic = params.pic?.length > 0 ? params.pic.map(file => {
    return {
      fileId: file.id || file.fileId
    }
  }) : []

  return request({
    ...defaultConfig,
    url: '/reserve/treeresourcemanage/save',
    data: params
  })
}

export function backupDeleteApi (list) {
  debugger
  const ids = Array.isArray(list) ? list.map(item => 'ids=' + item.id).join('&') : 'ids=' + list.id

  return request({
    ...defaultConfig,
    url: '/reserve/treeresourcemanage/delete?' + ids
  })
}

export function backupDetailApi (data) {
  debugger
  return request({
    ...defaultConfig,
    url: '/reserve/treeresourcemanage/info?id=' + data.id,
    data: { id: data.id },
    json: false,
    method: 'get'
  }).then((res) => {
    res.data.treeId = [{
      id: res.data.treeId,
      name: res.data.treeName
    }]
    res.data.area = [{
      id: res.data.area,
      name: res.data.areaName
    }]
    res.data.unit = [
      { id: res.data.unit, name: res.data.unitName }
    ]
    res.data.administrator = [
      { id: res.data.administrator, name: res.data.administratorName }
    ]
    // res.data.pic =res.data.imageFiles
    return res.data
  })
}

// -------------告警信息--------------
export function warningPendingListApi (params = {}) {
  params.district = params.districtName?.[0]?.id || ''
  delete params.districtName
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/giveAnAlarm/listPending',
    // data: params,
    data: params
  })
}

export function warningProcessedListApi (params = {}) {
  params.district = params.districtName?.[0]?.id || ''
  delete params.districtName
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/giveAnAlarm/listProcessed',
    // data: params,
    data: params
  })
}

export function warningInfoDeleteApi (list = []) {
  const ids = Array.isArray(list) ? list.map(item => item.id).join(',') : [list.id]

  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/giveAnAlarm/delete',
    data: ids
  })
}

//

export function warningDetailApi (data) {
  debugger
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/giveAnAlarm/getTreeGiveAnAlarmInfo',
    data: { id: data.id },
    json: false,
    method: 'post'
  }).then((res) => {
    debugger
    const pics = []; const videos = []

    res.data.files.forEach((item) => {
      if (item.fileType == 2) {
        pics.push({
          fileId: item.sysFileId,
          fileUrl: item.fileUrl
        })
      }
      if (item.fileType == 3) {
        videos.push({
          fileId: item.sysFileId,
          fileUrl: item.fileUrl
        })
      }
    })

    res.data.pic = pics
    res.data.videos = videos

    res.data = res.data.treeGiveAnAlarmHandleVo ? { ...res.data, ...res.data.treeGiveAnAlarmHandleVo } : res.data
    delete res.data.treeGiveAnAlarmHandleVo
    delete res.data.treeGiveAnAlarmHandleVo

    return res.data
  })
}

export function warningUnhandleApi (params) {
  params.handleUserId = params.handleUserId[0]?.id
  return request({
    ...defaultConfig,
    url: '/ancientTree/treeWarning/giveAnAlarm/handleGiveAnAlarm',
    data: params
  })
}

export function warningHandleApi (params) {
  debugger
  params.handleUserId = params.handleUserId[0]?.id
  const pics = params.pic?.length > 0 ? params.pic.map(file => {
    return {
      fileId: file.id || file.fileId,
      type: 2
    }
  }) : []
  const videos = params.videos?.length > 0 ? params.videos.map(file => {
    return {
      fileId: file.id || file.fileId,
      type: 3
    }
  }) : []
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
export function protectLevStatisticApi () {
  return request({
    ...defaultConfig,
    url: '/ancientTree/overview/protectLev',
    method: 'get'
  }).then((res) => res.data)
}

//  固定资产   资产使用状况统计
export function growthSituationStatisticApi (district = '') {
  return request({
    ...defaultConfig,
    url: '/ancientTree/overview/growthSituation?district=' + district,
    method: 'get'
  }).then((res) => res.data)
}

//  固定资产   使用年数统计
export function treeAgeStatisticApi (district = '') {
  return request({
    ...defaultConfig,
    url: '/ancientTree/overview/treeAge?district=' + district,
    method: 'get'

  }).then((res) => res.data)
}

//  固定资产   资产类型统计
export function treeSpeciesStatisticApi (district = '') {
  return request({
    ...defaultConfig,
    url: '/ancientTree/overview/treeSpecies?district=' + district,
    method: 'get'

  }).then((res) => res.data)
}

export function treeAndReserveRegionStatisticApi () {
  return request({
    ...defaultConfig,
    url: '/ancientTree/overview/treeAndReserveRegion',
    method: 'get'

  }).then((res) => res.data)
}

// 资源数量统计
export function quantityStatisticsApi () {
  return request({
    ...defaultConfig,
    url: '/ancientTree/overview/quantityStatistics',
    method: 'get'

  }).then((res) => res.data)
}

export function cureTypeCountNumStatisticsApi (protectLev = 1) {
  return request({
    ...defaultConfig,
    url: '/ancientTree/overview/cureTypeCountNum',
    method: 'post',
    data: { protectLev },
    json: false

  }).then((res) => res.data)
}

export function protectTypeCountNumStatisticsApi (protectLev = 1) {
  return request({
    ...defaultConfig,
    url: '/ancientTree/overview/protectTypeCountNum',
    method: 'post',
    data: { protectLev },
    json: false
  }).then((res) => res.data)
}
