
import request from './request'
// import qs from 'qs'
const defaultConfig = {
  method: 'post',
  refuseToken: false,
  json: true
}

// -------养护记录--------------------
export function maintainListApi (params = {}) {
  // const handleTime= JSON.parse(params.handleTime)
  params.startTime = params.handleTime?.[0]
  params.endTime = params.handleTime?.[1]
  delete params.handleTime

  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/list',
    // data: params,
    data: params,
    json: false
  })
}

export function maintainUpdateApi (params) {
  params.treeManageId = params.treeManageId[0]?.id
  params.userId = params.userId[0]?.id

  const filesBefore = params.filesBefore.length > 0 ? params.filesBefore.map(file => {
    return {
      fileId: file.fileId,
      fileStatus: 1,
      fileType: 1
    }
  }) : []
  const filesAfter = params.filesAfter.length > 0 ? params.filesAfter.map(file => {
    return {
      fileId: file.fileId,
      fileStatus: 2,
      fileType: 1
    }
  }) : []
  params.time = params.cureTime
  params.types = params.cureType
  delete params.cureType
  delete params.cureTime

  params.vo = [...filesBefore, ...filesAfter]
  delete params.filesBefore
  delete params.filesAfter
  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/update',
    data: params
  })
}

export function maintainSaveApi (params) {
  params.treeManageId = params.treeManageId[0]?.id
  params.userId = params.userId[0]?.id

  const filesBefore = params.filesBefore.length > 0 ? params.filesBefore.map(file => {
    return {
      fileId: file.fileId,
      fileStatus: 1,
      fileType: 1
    }
  }) : []
  const filesAfter = params.filesAfter.length > 0 ? params.filesAfter.map(file => {
    return {
      fileId: file.fileId,
      fileStatus: 2,
      fileType: 1
    }
  }) : []
  params.time = params.cureTime
  params.types = params.cureType

  delete params.cureType
  delete params.cureTime

  params.vo = [...filesBefore, ...filesAfter]
  delete params.filesBefore
  delete params.filesAfter

  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/save',
    data: params
  })
}

export function maintainDeleteApi (list) {
  debugger
  const ids = Array.isArray(list) ? list.map(item => 'ids=' + item.id).join('&') : 'ids=' + list.id
  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/delete?' + ids

  })
}

export function maintainDetailApi (data) {
  return request({
    ...defaultConfig,
    url: '/tree/protect/cure/info?id=' + data.id,
    json: false,
    method: 'get'
  }).then((res) => {
    res.data.treeManageId = [{
      id: res.data.treeId,
      name: res.data.treeName
    }]
    res.data.unit = [
      { id: res.data.unit, name: res.data.unitName }
    ]
    res.data.userId = [
      { id: res.data.userId, name: res.data.userName }
    ]
    res.data.filesBefore = res.data.vo.filter(file => file.fileStatus == 1)
    res.data.filesAfter = res.data.vo.filter(file => file.fileStatus == 2)
    return res.data
  })
}

// -------保护记录--------------------
export function protectListApi (params = {}) {
  params.startTime = params.handleTime?.[0]
  params.endTime = params.handleTime?.[1]
  delete params.handleTime
  return request({
    ...defaultConfig,
    url: '/tree/protect/list',
    // data: params,
    data: params,
    json: false
  })
}

export function protectUpdateApi (params) {
  params.treeManageId = params.treeManageId[0]?.id
  params.userId = params.userId[0]?.id

  const filesBefore = params.filesBefore.length > 0 ? params.filesBefore.map(file => {
    return {
      fileId: file.fileId,
      fileStatus: 1,
      fileType: 2
    }
  }) : []
  const filesAfter = params.filesAfter.length > 0 ? params.filesAfter.map(file => {
    return {
      fileId: file.fileId,
      fileStatus: 2,
      fileType: 2
    }
  }) : []
  params.vo = [...filesBefore, ...filesAfter]
  delete params.filesBefore
  delete params.filesAfter

  params.types = params.protectType

  delete params.protectType

  return request({
    ...defaultConfig,
    url: '/tree/protect/update',
    data: params
  })
}

export function protectSaveApi (params) {
  debugger

  params.treeManageId = params.treeManageId[0]?.id
  params.userId = params.userId[0]?.id

  const filesBefore = params.filesBefore.length > 0 ? params.filesBefore.map(file => {
    return {
      fileId: file.fileId,
      fileStatus: 1,
      fileType: 2
    }
  }) : []
  const filesAfter = params.filesAfter.length > 0 ? params.filesAfter.map(file => {
    return {
      fileId: file.fileId,
      fileStatus: 2,
      fileType: 2
    }
  }) : []

  params.types = params.protectType

  delete params.protectType

  params.vo = [...filesBefore, ...filesAfter]
  delete params.filesBefore
  delete params.filesAfter

  return request({
    ...defaultConfig,
    url: '/tree/protect/save',
    data: params
  })
}

export function protectDeleteApi (list) {
  const ids = Array.isArray(list) ? list.map(item => 'ids=' + item.id).join('&') : 'ids=' + list.id

  return request({
    ...defaultConfig,
    url: '/tree/protect/delete?' + ids
  })
}

export function protectDetailApi (data) {
  return request({
    ...defaultConfig,
    url: '/tree/protect/info?id=' + data.id,
    json: false,
    method: 'get'
  }).then((res) => {
    debugger
    res.data.treeManageId = [{
      id: res.data.treeId,
      name: res.data.treeName
    }]
    res.data.unit = [
      { id: res.data.unit, name: res.data.unitName }
    ]
    res.data.userId = [
      { id: res.data.userId, name: res.data.userName }
    ]
    res.data.filesBefore = res.data.vo.filter(file => file?.fileStatus == 1)
    res.data.filesAfter = res.data.vo.filter(file => file?.fileStatus == 2)

    res.data.time = res.data.cureTime
    return res.data
  })
}

// -------移植记录--------------------
export function transListApi (params = {}) {
  debugger
  params.manageUnit = params.manageUnit?.[0]?.id
  params.removeUnit = params.removeUnit?.[0]?.id
  params.startTime = params.handleTime?.[0]
  params.endTime = params.handleTime?.[1]
  delete params.handleTime
  return request({
    ...defaultConfig,
    url: '/tree/protect/treetransplant/list',
    // data: params,
    data: params,
    json: true
  })
}

export function transUpdateApi (params) {
  params.filesBefore = params.filesBefore || []
  params.filesAfter = params.filesAfter || []

  params.treeManageId = params.treeManageId[0]?.id
  params.district = params.district[0]?.id
  params.manageUser = params.manageUser[0]?.id

  params.removeManageUser = params.removeManageUser[0]?.id
  params.removeUnit = params.removeUnit[0]?.id
  params.unit = params.unit[0]?.id

  params.vo = [...params.filesBefore?.map(file => {
    return { fileId: file.fileId, fileStatus: 1 }
  }), ...params.filesAfter?.map(file => {
    return { fileId: file.fileId, fileStatus: 2 }
  })]

  delete params.filesBefore
  delete params.filesAfter
  delete params['unitName-old']
  delete params['manageUserName-old']
  delete params['manageUserPhone-old']
  delete params['address-old']
  delete params['lonLat-old']
  delete params['district-old']
  delete params.treeNumber

  return request({
    ...defaultConfig,
    url: '/tree/protect/treetransplant/update',
    data: params
  })
}

export function transSaveApi (params) {
  debugger
  params.filesBefore = params.filesBefore || []
  params.filesAfter = params.filesAfter || []

  params.treeManageId = params.treeManageId[0]?.id
  params.district = params.district[0]?.id
  params.manageUser = params.manageUser[0]?.id

  params.removeManageUser = params.removeManageUser[0]?.id
  params.removeUnit = params.removeUnit[0]?.id
  // params.removeUnit= params.removeUnits[0]?.id

  params.unit = params.unit[0]?.id

  params.vo = [...params.filesBefore?.map(file => {
    return { fileId: file.fileId, fileStatus: 1 }
  }), ...params.filesAfter?.map(file => {
    return { fileId: file.fileId, fileStatus: 2 }
  })]

  delete params.filesBefore
  delete params.filesAfter

  delete params['unitName-old']
  delete params['manageUserName-old']
  delete params['manageUserPhone-old']
  delete params['address-old']
  delete params['lonLat-old']
  delete params['district-old']
  delete params.treeNumber

  return request({
    ...defaultConfig,
    url: '/tree/protect/treetransplant/save',
    data: params
  })
}

export function transDeleteApi (list) {
  debugger

  const ids = Array.isArray(list) ? list.map(item => 'ids=' + item.id).join('&') : 'ids=' + list.id
  return request({
    ...defaultConfig,
    url: '/tree/protect/treetransplant/delete?' + ids
  })
}

export function transDetailApi (data) {
  debugger
  return request({
    ...defaultConfig,
    url: '/tree/protect/treetransplant/info?id=' + data.id,
    json: false,
    method: 'get'
  }).then((res) => {
    debugger

    res.data.treeManageId = [{
      id: res.data.treeId,
      name: res.data.treeName
    }]

    res.data.unit = [
      { id: res.data.removeUnit, name: res.data.removeUnitName }
    ]

    res.data.removeUnit = [
      { id: res.data.removeUnits, name: res.data.removeUnitsName }
    ]
    res.data['unitName-old'] = res.data.unitName
    res.data['manageUserName-old'] = res.data.userName
    res.data['manageUserPhone-old'] = res.data.manageUserPhone
    res.data['address-old'] = res.data.address
    res.data['lonLat-old'] = res.data.lonLat
    res.data.lonLat = res.data.moveLonLat
    res.data['district-old'] = res.data.districtName

    res.data.address = res.data.moveAddress
    res.data.manageUser = [
      { id: res.data.moveManageUser, name: res.data.moveManageUserName }
    ]
    res.data.removeManageUser = [
      { id: res.data.moveManageUsers, name: res.data.moveManageUsersName }
    ]

    res.data.district = [
      { id: res.data.moveDistrict, name: res.data.moveDistrictName }
    ]

    res.data.filesBefore = res.data.vo.filter(file => file.fileStatus === 1)
    res.data.filesAfter = res.data.vo.filter(file => file.fileStatus === 2)

    res.data.removeUserPhone = res.data.removeManageUsersPhone
    res.data.removeManageUserPhone = res.data.moveManageUserPhone
    // res.data.removeUserPhone= res.data.removeManageUsersPhone
    return res.data
  })
}
