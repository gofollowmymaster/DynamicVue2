import {
    buildFormFields,
    buildDetailFields
} from '../utils/fieldsConfigUtil'
import {
    loadActionTipConfig
} from '../utils/actionTools'

export default {
    props: {},
    computed: {},
    methods: {

        generateCreateOptions(mode = 'dialog') {
            const actionType =
        mode === 'router'
            ? 'routerDialogFormActionOption'
            : 'dialogFormActionOption'

            return {
                label: '新增',
                permission: this.scene !== 'page' ? '' : '新增',
                actionType,
                sort: 50,
                isLoadData: false,
                componentProperties: {
                    icon: 'el-icon-plus',
                    type: 'primary'
                },
                containerProperties: {
                    title: '新增' + this.entityLabel
                },
                formItemList: buildFormFields(this.fields, this.formSections),

                saveAction: {
                    apiPromise: this.apiPromises.create
                }
            }
        },
        generateBulkDeleteOptions() {
            const actionTipConfig = loadActionTipConfig()
            return {
                label: '批量删除',
                permission: this.scene !== 'page' ? '' : '批量删除',
                actionType: 'requestApiAction',
                actionDataKey: 'selected',
                apiPromise: this.apiPromises.bulkdelete || this.apiPromises.delete,
                ...actionTipConfig
            }
        },
        generateDeleteOptions() {
            const actionTipConfig = loadActionTipConfig()
            return {
                sort: 200,
                actionType: 'requestApiAction',
                label: '删除',
                permission: this.scene !== 'page' ? '' : '删除',
                componentProperties: {
                    class: ['text-grey-dark2']
                },
                apiPromise: this.apiPromises.delete || this.apiPromises.bulkdelete,
                ...actionTipConfig
            }
        },
        generateUpdateOptions(mode = 'dialog') {
            const actionType =
        mode === 'router'
            ? 'routerDialogFormAction'
            : 'dialogFormAction'

            return {
                label: '编辑',
                actionType,
                router: 'update',
                permission: this.scene !== 'page' ? '' : '编辑',
                apiPromise: this.apiPromises.detail,
                containerProperties: {
                    title: '编辑' + this.entityLabel
                },
                testTool: false,

                formItemList: buildFormFields(this.fields, this.formSections),
                saveAction: {
                    label: '保存',
                    apiPromise: this.apiPromises.update
                }
            }
        },
        generateDetailOptions(mode = 'dialog') {
            const actionType =
        mode === 'router'
            ? 'routerDialogFormActionOption'
            : 'dialogFormActionOption'

            return {
                label: '详情',
                actionType,
                permission: this.scene !== 'page' ? '' : '详情',
                apiPromise: this.apiPromises.detail,
                componentProperties: {
                    type: 'default'
                },
                containerProperties: {
                    title: this.entityLabel + '详情'
                },
                textMode: true,
                formItemList: buildDetailFields(this.fields, this.formSections),
                saveAction: null
            }
        },
        generateActionOptions(mode = 'dialog') {
            const createOptions = this.generateCreateOptions(mode)
            const bulkdeleteOptions = this.generateBulkDeleteOptions()
            const updateOptions = this.generateUpdateOptions(mode)
            const detailOptions = this.generateDetailOptions(mode)
            const deleteOptions = this.generateDeleteOptions()
            return {
                createOptions,
                bulkdeleteOptions,
                updateOptions,
                detailOptions,
                deleteOptions
            }
        },
        generatePageActionOptions(mode = 'dialog') {
            const create = this.generateCreateOptions(mode)
            const update = this.generateUpdateOptions(mode)
            const detail = this.generateDetailOptions(mode)
            return {
                create,
                update,
                detail
            }
        }
    }
}
