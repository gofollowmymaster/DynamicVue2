import { deepMerge,superType,deepCopy} from "./tool"
import { getRule } from './validate'
import presetConfig from '../presetConfig'


const formOptionDefault = {
  wraperProperties: {
    // class: presetConfig.getConfig('formWraperClass')
  },
  rules: [],
  properties: {
    // size:'medium'
  },
  events: {},
 
}

export function buildFormFields (fields, formSections = {}) {
  if (superType(fields) !== 'array') return []

  fields = deepCopy(fields)
  // debugger
  fields = fields
    .filter((item) => item.formable || item.formOption)
    .map((item) => {
      const formOption = deepMerge(formOptionDefault, item.formOption, true)
      delete item.tableOption
      delete item.formOption
      delete item.searchable
      delete item.formable
      delete item.tableable
      const extra = formOption.extra
      delete formOption.extra
      delete item.detailable
      delete item.detailOption

      item.type = item.type || 'FormInput'

      return { ...item, ...formOption, ...extra }
    })
    .map((item) => {
      // 填充预设的验证规则
      item.rules = item.rules
        .filter((rule) =>
          ['object', 'function', 'string'].includes(typeof rule)
        )
        .map((rule) => {
          return getRule(rule, item.type, item.label)
        })


      return item
    })
    .reduce((prev, next) => {
      // 按formSection分组
      const formSection = next.formSection ? next.formSection : presetConfig.getConfig('baseFormSectionName')
      delete next.formSection 
      if (prev[formSection]) {
        prev[formSection] = prev[formSection].concat([{ ...next }])
      } else {
        prev[formSection] = [{ ...next }]
      }
      return prev
    }, {})
  // 组建标准数据
  fields = Object.entries(fields).map(([key, value]) => {
    const sectionInfo = formSections[key] || {}
    return { label: key, children: value, ...sectionInfo }
  })
  // 只有一个section 不展示
  if (fields.length === 1) {
    fields[0].label = undefined
  }
  return fields
}

const detailOptionDefault = {
  wraperProperties: {
    class: presetConfig.getConfig('detailWraperClass')
  },
  rules: [],
  properties: {
    // size:'medium'
  },
  events: {},
 
}

export function buildDetailFields (fields, formSections = {}) {
  if (superType(fields) !== 'array') return []

  fields = deepCopy(fields)
  // debugger
  fields = fields
    .filter(
      (item) =>
        ((item.formable || item.formOption) &&
          item.detailable !== false &&
          item.detailOption !== false) ||
        item.detailable === true ||
        item.detailOption
    )
    .map((item) => {
      let detailOption = deepMerge(detailOptionDefault, item.formOption, true)
      detailOption = deepMerge(detailOption, item.detailOption, true)

      delete item.tableOption
      delete item.formOption
      delete item.searchable
      delete item.formable
      delete item.tableable
      delete item.detailable
      delete item.detailOption

      const extra = detailOption.extra
      delete detailOption.extra
      item.type = item.type || 'FormInput'

      return { ...item, ...detailOption, ...extra }
    })
    .reduce((prev, next) => {
      // 按formSection分组
      const formSection = next.formSection ? next.formSection : ''
      next.formSection = undefined
      if (prev[formSection]) {
        prev[formSection] = prev[formSection].concat([{ ...next }])
      } else {
        prev[formSection] = [{ ...next }]
      }
      return prev
    }, {})
  // 组建标准数据
  fields = Object.entries(fields).map(([key, value]) => {
    const sectionInfo = formSections[key] || {}
    return { label: key, children: value, ...sectionInfo }
  })
  // 只有一个section 不展示
  if (fields.length === 1) {
    fields[0].label = undefined
  }
  return fields
}

const tableOptionDefault = {
  // template (row, key) {
  //   return row[key] ?? ''
  // }
}

export function buildEditTableFields(fields){
  if (superType(fields) !== 'array') return []
  let fieldsClone = deepCopy(fields)
  fieldsClone = fieldsClone
  .filter((item) => item.tableable || item.tableOption)
  .map((item) => {
    item.tableOption = deepMerge(tableOptionDefault, item.tableOption, true)
    item.formOption = deepMerge(formOptionDefault, item.formOption, true)

    return { ...item,   sort: 100  }
  })
  .sort((prev, next) => {
    return prev.tableOption.sort - next.tableOption.sort
  })
  .map((item) => {
    
    delete item.searchable
    delete item.searchOption

    delete item.formable
    delete item.tableable
    // delete item.type
    delete item.tableOption.sort
    return item
  })

return fieldsClone
}
export function buildTableFields (fields) {
  if (superType(fields) !== 'array') return []

  // debugger
  let fieldsClone = deepCopy(fields)

  fieldsClone = fieldsClone
    .filter((item) => item.tableable || item.tableOption)
    .map((item) => {
      item.tableOption = deepMerge(tableOptionDefault, item.tableOption, true)
      return { ...item, ...{ sort: 100, ...item.tableOption } }
    })
    .sort((prev, next) => {
      return prev.tableOption.sort - next.tableOption.sort
    })
    .map((item) => {
      delete item.formOption
      delete item.searchable
      delete item.formable
      delete item.tableable
      delete item.type
      delete item.tableOption.sort
      return item
    })

  return fieldsClone
}

const searchOptionDefault = {
  wraperProperties: {
    class: presetConfig.getConfig('searchFormWraperClass')
  },
  properties: {
    // size:'small'
  }
}
export function buildSearchFields (fields) {
  if (superType(fields) !== 'array') return []

  let fieldsClone = deepCopy(fields)
  fieldsClone = fieldsClone
    .filter((item) => item.searchable || item.searchOption)
    .map((item) => {
      const searchOption = deepMerge(
        searchOptionDefault,
        item.searchOption,
        true
      )
      delete item.tableOption
      delete item.formOption
      delete item.searchOption
      delete item.detailOption

      const type = item.type

      return { ...item, type, sort: 10, ...searchOption }
    })
    .sort((prev, next) => {
      return prev.sort - next.sort
    })

  return fieldsClone.length > 0 ? [{ children: fieldsClone }] : []
}