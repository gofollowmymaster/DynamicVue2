<template>
    <!-- 富文本 -->
    <div>
        <editor v-model="content" :init="init" :disabled="disabled" />
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
// import 'tinymce/icons/default/icons'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
// import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
// import 'tinymce/plugins/colorpicker'
// import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/code'
import 'tinymce/plugins/link'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/codesample'
// import 'tinymce/plugins/hr'
import 'tinymce/plugins/fullscreen'
// import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/template'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/insertdatetime'
// import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/autoresize'

export default {
    name: 'RicEditor',
    components: {
        Editor
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 750
        },
        plugins: {
            type: [String, Array],
            default:
                'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap nonbreaking insertdatetime advlist lists wordcount autosave autoresize'
        },
        toolbar: {
            type: [String, Array],
            default:
                'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link codesample | alignleft aligncenter alignright alignjustify outdent indent formatpainter | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap hr pagebreak insertdatetime | fullscreen preview'
        }
    },
    data() {
        return {
            // 初始化配置
            init: {
                // menubar: true, // 菜单栏显隐
                language_url: this.$dynamicConfig.tinymceLanguageUrl,
                // language_url: '../../static/tinymce/langs/zh_CN.js', // vue-cli2.x
                language: 'zh_CN',
                skin_url: this.$dynamicConfig.tinymceSkinUrl,
                // skin_url: '../../static/tinymce/skins/ui/oxide', // vue-cli2.x   '/static/tinymce/skins/ui/oxide'
                // content_css: '../../static/tinymce/skins/content/default/content.css',// vue-cli2.x
                height: this.height,
                min_height: this.height,
                max_height: this.height,
                toolbar_mode: 'wrap',
                plugins: this.plugins,
                toolbar: this.toolbar,
                content_style: 'p {margin: 5px 0;}',
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                font_formats:
                    '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
                branding: false,
                // 图片上传
                images_upload_handler: (blobInfo, success, failure) => {
                    // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                    // success(img)

                    const formData = new FormData()
                    formData.append('files', blobInfo.blob())
                    formData.append('type', 1)
                    this.$dynamicConfig.richUploadApi(formData)
                        .then(res => {
                            const [fileId] = res.data.data
                            const fileFormData = new FormData()
                            fileFormData.append('id', fileId)
                            this.$dynamicConfig.richFileInfoApi(fileFormData).then(res => {
                                // success(fileEnv + res.data.data.fileUrl)
                                this.$message({
                                    type: 'success',
                                    message: '上传文件成功'
                                })
                            })
                        })
                        .catch(err => {
                            console.error(err)
                            this.$message({
                                type: 'error',
                                message: '上传文件失败'
                            })
                        })
                }
            },
            content: this.value
        }
    },
    watch: {
        value(newValue) {
            this.content = newValue
        },
        content(newValue) {
            this.$emit('input', newValue)
        }
    },
    mounted() {
        tinymce.init({})
    },
    methods: {}
}
</script>
<style scoped lang="scss"></style>
