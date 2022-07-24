<template>
    <!-- 普通输入框 -->
    <section
        :class="` ${
            bindOptions['list-type'] === 'table' && 'upload-table-list'
        }`"
        class=" full-width"
    >
        <el-upload
            v-if="!getTextModel"
            action=""
            :file-list="fileListInit"
            :before-upload="handleBeforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-change="handleChange"
            v-bind="bindOptions"
            :disabled="getDisabled"
        >
            <div v-if="bindOptions.drag">
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip">{{ item.tip }}</div>
            </div>
            <div v-else>
                <i
                    v-if="bindOptions['list-type'] === 'picture-card'"
                    class="el-icon-plus"
                />
                <el-button v-else size="small" icon="el-icon-upload">
                    {{
                        item.btn_text || '上传'
                    }}
                </el-button>
            </div>
            <div slot="tip" class="el-upload__tip">{{ item.tip }}</div>
        </el-upload>

        <section>
            <!-- 图片详情展示 -->
            <section v-if="getTextModel && fileList.length && accept == 'img'" class="flex ">
                <el-image
                    v-for="file in fileList"
                    :key="file.fileUrl"
                    class="mr12 my6 block "
                    style="width: 100px; height: 100px;"
                    :src="file.fileUrl"
                    :preview-src-list="fileList.map((file) => file.fileUrl)"
                />
            </section>

            <!-- 视屏详情展示 -->
            <section v-else-if="getTextModel && fileList.length && accept == 'video'">
                <video
                    v-for="file in fileList"
                    :key="file.fileUrl"
                    class="mr12"
                    style="width: 100px; height: 100px;"
                    :src="file.fileUrl"
                />
            </section>
            <!-- 文件详情展示 -->
            <DynamicCurd
                v-else-if="bindOptions['list-type'] == 'table' &&!getTextModel" class="mt8"
                :style="{ padding: 0 }"
                :fields="fileFields"
                :api-promises="apiPromises"
                :options-props="curdOptions"
                entity-label="附件"
            />
            <template v-else-if="getTextModel&&fileList.length">
                <ul v-for="file in fileList" :key="file.fileName">
                    <li class="mr12">
                        <dynamicActions
                            :actions="{download:downloadAction(file.fileName)}"
                            :action-data="file"
                        />
                        <!-- {{file.fileName}} -->
                    </li>
                </ul>
            </template>

            <div v-else-if="getTextModel" class=""> -- </div>
        </section>
        <!-- 图片预览 -->
        <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </section>
</template>

<script>
import FormMixin from './mixin'

const fileFields = [

    {
        key: 'fileName',
        label: '名称',
        tableOption: {},
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            }
        }
    },
    {
        key: 'fileSize',
        type: 'FormInput',
        label: '大小',
        // tableOption:true,
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            }
        }
    },
    {
        key: 'uploadTime',
        type: 'FormInput',
        label: '上传时间',
        tableOption: true,
        formOption: {
            wraperProperties: {
                class: ['grid-col-24']
            }
        }
    }
]

function getAccepts(accept) {
    switch (accept) {
        case 'img':
            return 'image/*'
        case 'video':
            return 'video/*'
        case 'doc':
            return `.doc,.docx,.xml,application/msword,
            application/pdf,application/vnd.ms-excel,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,`
        default:
            return '*'
    }
}
export default {
    name: 'FormUpload',
    mixins: [FormMixin],
    data() {
        const self = this
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            fileFields,
            apiPromises: {
                bulkdelete: file => {
                    const fileListNew = []
                    for (const fileItem in self.fileList) {
                        if (fileItem.fileId !== file.fileId) {
                            fileListNew.push(fileItem)
                        }
                    }
                    self.handleRemove(file, fileListNew)
                    return Promise.resolve({})
                },
                list: () =>
                    Promise.resolve({
                        list: self.fileList,
                        totalCount: self.fileList.length
                    }),
                detail: info => Promise.resolve(info)
            },

            fileListInit: [],
            downloadAction: fileName => ({
                apiPromise: this.item.downloadApi,
                actionType: 'downloadAction',
                label: fileName,
                component: 'div',
                componentProperties: {
                    class: 'text-blue cursor-point'
                }
            })

        }
    },
    computed: {
        accept() {
            debugger
            let accept = ''
            const listType = this.item['list-type']
            if (['picture', 'picture-card'].includes(listType)) {
                accept = 'img'
            }
            return accept || this.item.accept
        },
        // 扩展属性，直接将属性配置，传到表单组件内部（即 Element UI 上）
        // 忽略属性【key、size】
        bindOptions() {
            let obj = Object.assign({}, this.item)
            obj = { ...obj, ...obj.properties }
            obj.name = obj.key
            obj['http-request'] = obj.apiPromise
            obj.multiple = obj.limit !== 1
            obj.disabled = this.getTextModel ? true : obj.disabled
            obj.accept = getAccepts(this.accept)

            if (obj.drag) {
                obj['list-type'] = 'text'
            }
            delete obj.wraperProperties
            delete obj.key
            delete obj.size
            delete obj.type
            delete obj.label
            delete obj.readonly
            delete obj.rules
            delete obj.placeholder
            delete obj.prepend
            delete obj.append
            delete obj.defaultValue
            delete obj.apiPromise
            delete obj.downloadApi

            return obj
        },
        val: {
            get() {
                return this.value?.map(file => file.fileId || file.id) || []
            },
            set(v) {
                this.$emit('input', v)

                this.statusChangeFn.valueUpdateEvent({
                    [this.item.key]: v
                })
            }
        },
        fileList() {
            return Array.isArray(this.value)
                ? this.value.filter(file => file.fileId || file.id || file.uid)
                    .map(file => {
                        file.fileUrl = file.fileUrl ?  file.fileUrl : file.url
                        file.uploadTime = file.createTime || file.upLoadTime
                        file.fileName =
                            file.fileName || file.sourceName || file.saveName || file.name
                        file.fileId = file.fileId || file.id || file.uid
                        return file
                    })
                : []
        },
        curdOptions() {
            return {
                topToolBar: null,
                searchFields: null,
                listOption: {

                    hasCheckbox: false,
                    properties: {
                        border: !this.getTextModel
                    },
                    lineActions: {
                        update: null,
                        detail: null,
                        download: {
                            actionType: 'downloadAction',
                            apiPromise: this.item.downloadApi,
                            label: '下载'
                        }
                    }
                },
                pagination: null

            }
        }
    },
    mounted() {
        this.fileListInit = Array.isArray(this.value)
            ? this.value.filter(file => file.fileId || file.id)
                .map(file => {
                    const fileUrl =  file.fileUrl

                    return {
                        url: fileUrl,
                        fileId: file.fileId || file.id,
                        name:
                            file.fileName || file.sourceName || file.saveName || file.name,
                        fileSize: file.fileSize,
                        fileType: file.fileType,
                        uploadTime: file.createTime || file.upLoadTime
                    }
                })
            : []
    },
    methods: {
        handleRemove(file, fileList) {
            debugger
            this.val = this.value.filter(
                unit => {
                    const id = unit.id || unit.fileId
                    return unit.uid !== file.uid && id !== file.fileId
                }
            )
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        handleSuccess(res, file, fileList) {
            if (!res) return // 有重复请求   OPTION?
            if (!file.response) return //

            const fileId = file.response.fileId
            const fileUrl = file.response.fileUrl || file.url
            const fileName = file.raw.name
            const fileSize = file.raw.size
            const uploadTime = this.$datjs(new Date()).format('YYYY-MM-DD HH:mm:SS')
            const uid = file.uid
            const current = this.value || []
            current.push({
                fileId,
                fileUrl,
                fileName,
                fileSize,
                uploadTime,
                uid
            })
            this.val = current
        },
        handleError(err) {
            console.error(err)
        },
        handleBeforeUpload() {},
        handleChange(file, fileList) {
            if (!this.bindOptions['auto-upload']) {
                debugger
                this.val = fileList
            }
        }
    }
}
</script>

<style scoped lang="css">
.form-input-box /deep/ .el-input {
    position: relative;
    width: 100%;

    /* height: 36px; */
}
.upload-table-list >>> .el-upload-list {
    display: none;
}
</style>
