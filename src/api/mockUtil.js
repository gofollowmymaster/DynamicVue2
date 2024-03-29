
import Mock from 'mockjs'

const Random = Mock.Random

const mockDb = new Map()
export const dictMapDb = new Map()

export function mockDyFields(fields) {
    const mockInfo = {}
    fields.forEach(field => {
        switch (field.type) {
            case 'FormDate':
                mockInfo[field.key + '|1'] = '@date'
                break
            case 'FormDateTime':
                mockInfo[field.key + '|1'] = '@datetime'
                break
            case 'FormRadio':
            case 'FormCheckbox':
            case 'FormSelect':
                mockInfo[field.key + '|0-2'] = 1
              
                // mockInfo[field.key + '|0-3'] = 1
                break
            case 'FormNumber':
                mockInfo[field.key + '|1-100'] = 1
                break
            case 'FormNumberPlus':
                mockInfo[field.key + '|1-100.1-3'] = 1
                break
            case 'FormHide':
                mockInfo[field.key + '|1-1000000'] = 1
                break
            case 'FormInput':
            case 'FormTextarea':
                mockInfo[field.key + '|1'] =  '@cword(3)'
                break
            case 'FormDrawElement':
                mockInfo[field.key] = '[]'
                break
            case 'FormOldtreeSelector':
            case 'FormCurd':
                mockInfo[field.key] = []
                break
            case 'FormDynamicSelect':
                console.log('--dictMapDb.get(field.dictType)?.[0]?.id---', field.dictType, dictMapDb.get(field.dictType)?.[0])
                mockInfo[field.key] = dictMapDb.get(field.dictType)?.[0]?.id ?? 1
                break
            default:
                mockInfo[field.key + '|1'] = '@cword(3)'
        }
    })
    return  mockInfo
}
 
export function  apiListMock(fields, params) {
    params.pageSize = params.pageSize || 10
    params.pageNo  = params.pageNo || 1
    let res = mockDb.get(fields)
    
    if (!res) {
        res = Mock.mock({
            ['list|' + 100]: [mockDyFields(fields)],
            totalCount: 100
        })
        mockDb.set(fields, res)
    }
    return  Promise.resolve({list: res.list.slice(params.pageSize * (params.pageNo - 1), params.pageSize * params.pageNo), totalCount: res.list.length})
}

export function  apiDetailMock(fields, data) {
    debugger
    let {list} = mockDb.get(fields) || {}, res
    
    if (list && list.length) {
        const index = list.findIndex(item => item.id == data.id)
        res = list[index] || Mock.mock(mockDyFields(fields)) 
    } else {
        res = Mock.mock(mockDyFields(fields)) 
    }
    return  Promise.resolve(res)
}

export function  apiDeleteMock(fields, data) {

    let {list} = mockDb.get(fields)
    data = Array.isArray(data) ? data : [data]
    if (list && list.length) {
        data.forEach((item, index) => {
            const listIndex = list.findIndex(listItem => item.id == listItem.id)
            listIndex >= 0 && list.splice(listIndex, 1)
        })
      
    } 
    return  Promise.resolve({})
}
export function  apiSaveMock(fields, data) {

    let {list = []} = mockDb.get(fields) ||{}
    data.id = Math.random() * 100000
    if (list && list.length) {
        
    } 
    list.push(data)

    return  Promise.resolve({})
}
export function  apiUpdateMock(fields, data) {

    let {list} = mockDb.get(fields)||{}
    
    if (list && list.length) {
        const index = list.findIndex(item => item.id == data.id)
        list[index] = data
    } 
    return  Promise.resolve({})
}
