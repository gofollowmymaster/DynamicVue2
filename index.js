import dynamicVue2 from './src/packages/index'
import DynamicFormContent from './src/packages/components/DynamicFormContent'
import DynamicForm from './src/packages/components/DynamicForm'
import DynamicSearchForm from './src/packages/components/DynamicSearchForm'
import DynamicTable from './src/packages/components/DynamicTable'
import DynamicSection from './src/packages/components/DynamicSection'

import TableColMixin from './src/packages/components/tableColItem/mixin'
import FormMixin from './src/packages/components/formItems/mixin'
import popMixin from './src/packages/components/popContents/mixin'
import presetConfig from './src/packages/presetConfig'

import {  appendToPreset, deepMerge } from './src/packages/utils/tool'
import { buildSearchFields, buildTableFields, buildDetailFields, buildFormFields } from './src/packages/utils/fieldsConfigUtil'

import globalDialogForm from './src/packages/utils/globalDialogForm'
import globalDialogPage from './src/packages/utils/globalDialogPage'
import { generateActionOption } from './src/packages/utils/actionTools'

import './src/packages/css/index.less'

export {
    dynamicVue2,
    DynamicFormContent,
    DynamicForm,
    DynamicSearchForm,
    DynamicTable,
    DynamicSection,
    TableColMixin,
    FormMixin,
    popMixin,
    presetConfig,

    buildSearchFields, buildTableFields,
    buildDetailFields, buildFormFields,
   
    appendToPreset, deepMerge,
    globalDialogForm,
    globalDialogPage,
    generateActionOption
}

export default dynamicVue2
