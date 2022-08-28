import { deepMerge, superType, deepCopy } from './tool'
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
    type: 'FormInput'

}
// 字段分组处理
function formSectionPreHandle(fields, sections) {
    let formSections = fields.reduce((prev, next) => {
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
    formSections = Object.entries(formSections).map(([key, value]) => {
        const sectionInfo = sections[key] || {}
        return { label: key, children: value, ...sectionInfo }
    })

    // 只有一个section 不展示
    if (formSections.length === 1) {
        formSections[0].label = undefined
    }
    return formSections
}
// 表单字段预处理
export function preProcessFormFields(fields, formSections) {
    fields = fields.map(item => {
        return deepMerge(formOptionDefault, item, true)
    })
        .map(item => {
            // 填充预设的验证规则
            item.rules = item.rules
                .filter(rule =>
                    ['object', 'function', 'string'].includes(typeof rule)
                )
                .map(rule => {
                    return getRule(rule, item.type, item.label)
                })

            return item
        })
    return formSectionPreHandle(fields, formSections)
}
// 是否需要分拆字段配置
function isMultipleFields(fields) {

    return (fields[0]?.formOption || fields[0]?.detailOption || fields[0]?.tableOption || fields[0]?.searchOption) ||
       (fields[1]?.formOption || fields[1]?.detailOption || fields[1]?.tableOption || fields[1]?.searchOption)
    
}
// 生成表单字段
export function buildFormFields(fields, formSections = {}) {
    if (superType(fields) !== 'array') return []
    fields = deepCopy(fields)

    if (isMultipleFields(fields)) {
        fields = fields
            .filter(item => item.formOption)
            .map(item => {
                const formOption = item.formOption

                delete item.tableOption
                delete item.searchOption
                delete item.detailOption
                delete item.formOption
                return { ...item, ...formOption }
            })
    }

    return preProcessFormFields(fields, formSections)
}

const detailOptionDefault = {
    wraperProperties: {
        // class: presetConfig.getConfig('detailWraperClass')
    },
    rules: [],
    properties: {
    // size:'medium'
    },
    events: {},
    type: 'FormInput'
}

// 表单字段预处理
export function preProcessDetailFields(fields, formSections) {
    fields = fields.map(item => {
        return deepMerge(detailOptionDefault, item, true)
    })
    return formSectionPreHandle(fields, formSections)
}
export function buildDetailFields(fields, formSections = {}) {
    if (superType(fields) !== 'array') return []

    fields = deepCopy(fields)
    if (isMultipleFields(fields)) {
        // debugger
        fields = fields
            .filter(
                item => (item.formOption && item.detailOption !== false) || item.detailOption
            )
            .map(item => {
                const detailOption = deepMerge(item.formOption, item.detailOption, true)
                delete item.tableOption
                delete item.formOption
                delete item.detailOption
                delete item.searchOption
                return { ...item, ...detailOption }
            })
    }
    return preProcessDetailFields(fields, formSections)
}

const tableOptionDefault = {
    sort: 100
}

export function buildTableFields(fields, isEditable = false) {
    if (superType(fields) !== 'array') return []

    let fieldsClone = deepCopy(fields)
    if (isMultipleFields(fields)) {
        fieldsClone = fieldsClone
            .filter(item => item.tableOption || isEditable)
            .map(item => {
                if (isEditable) {
                    item.formOption = deepMerge(formOptionDefault, {...item.formOption, type: item.type}, true)

                    return item
                } else {
                    return { ...item, ...item.tableOption }
                }
            })
    }

    fieldsClone = fieldsClone.map(item => {
        item = deepMerge(tableOptionDefault, item, true)
        return item
    }).sort((prev, next) => {
        return prev.sort - next.sort
    }).map(item => {
        (!isEditable) && delete item.formOption
        delete item.detailOption
        delete item.searchOption
        delete item.tableOption
        delete item.sort

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
    },
    type: 'FormInput'
}
export function buildSearchFields(fields) {
    if (superType(fields) !== 'array') return []

    let fieldsClone = deepCopy(fields)
    if (isMultipleFields(fields)) {
        fieldsClone = fieldsClone
            .filter(item => item.searchOption)
            .map(item => {
                return { ...item, ...item.searchOption }
            })
    }
    fieldsClone = fieldsClone.map(item => {
        item = deepMerge(searchOptionDefault, item, true)
        return item
    }).sort((prev, next) => {
        return prev.sort - next.sort
    })
        .map(item => {
            delete item.tableOption
            delete item.formOption
            delete item.searchOption
            delete item.detailOption
            delete item.sort
            return item
        })

    return fieldsClone.length > 0 ? [{ children: fieldsClone }] : []
}
