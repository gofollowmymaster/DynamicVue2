<template>
  <div class="affix">
    <el-upload
      v-if="!$attrs.disabled"
      class="upload-demo"
      name="files"
      :accept="accept"
      :action="action"
      :headers="uploadHeaders"
      :data="uploadParams"
      :file-list="uploadFileList"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div> -->
    </el-upload>
    <el-table class="mt10" v-show="fileList.length" border :data="fileList">
      <el-table-column align="center" label="序号" prop="index" width="55">
        <template slot-scope="scope">
          <span class="ml10">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="名称"
      ></el-table-column>
      <el-table-column align="center" prop="operate" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="downloadFile(scope.row)"
            >下载</el-button
          >
          <span v-if="!$attrs.disabled">
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="delRow(scope)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { env } from '@/network/request.js'
import { globalDownloadBaseFileId } from '@/network/global'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { type: [Array, String], default: () => [] },
    url: {
      type: String,
      default: '/file/uploadFile'
    },
    headers: {
      type: Object,
      default () {
        return { token: localStorage.getItem('token') }
      }
    },
    params: {
      type: Object,
      default () {
        return { type: 1 }
      }
    },
    accept: {
      type: String,
      default () {
        return '*'
      }
    }
  },
  data () {
    return {
      action: env + '/file/uploadFile',
      uploadFileList: []
    }
  },
  computed: {
    uploadParams () {
      return Object.assign({ type: 1 }, this.params)
    },
    uploadHeaders () {
      return Object.assign(
        { token: localStorage.getItem('token') },
        this.headers
      )
    },
    fileList: {
      get () {
        return this.value
      },
      set (list) {
        if (list instanceof Array) {
          this.$emit('change', list)
        } else {
          this.$emit('change', [])
        }
      }
    }
  },
  methods: {
    beforeUpload (file) {
      const limit = 10 // M
      const fileSize = file.size / 1024 / 1024 // M
      if (fileSize > limit) {
        this.$message.error(`上传文件不允许超过${limit}M`)
        return false
      }
      const currentList = this.fileList
      currentList.push({ name: file.name })
      this.fileList = currentList
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    uploadSuccess (res, file, fileList) {
      this.loading.close()
      const currentList = this.fileList
      const lastIndex = currentList.length - 1
      if (res.code === '200') {
        this.$message({
          type: 'error',
          message: '上传成功'
        })
        currentList[lastIndex].id = res?.data[0]
      } else {
        this.$message({
          type: 'error',
          message: '文件上传失败'
        })
        currentList.splice(lastIndex, 1)
      }
      this.fileList = currentList
    },
    uploadError () {
      this.loading.close()
      const currentList = this.fileList
      const lastIndex = currentList.length - 1
      currentList.splice(lastIndex, 1)
      this.fileList = currentList
    },
    downloadFile (row) {
      globalDownloadBaseFileId(row.id)
    },
    delRow (scope) {
      const index = scope.$index
      const currentList = this.fileList
      currentList.splice(index, 1)
      this.fileList = currentList
    }
  },
  watch: {}
}
</script>

<style scoped>
.affix >>> .el-upload-list {
  display: none;
}
</style>
