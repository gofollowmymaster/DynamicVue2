<template>
  <main>
    <el-steps
      simple
      :active="active"
      process-status="process"
      class="mx24 my12"
      align-center
    >
      <el-step>
        <template slot="title">
          <span @click="switchStep(0)">1. 报建</span>
        </template>
      </el-step>
      <el-step>
        <template slot="title">
          <span @click="switchStep(1)">2. 验收</span>
        </template>
      </el-step>
    </el-steps>
    <DynamicForm
      v-show="active === 0"
      class="relative"
      :formOption="formOption"
      :formItemList="baseFormItemList"
      :data="baseDetail"
      :actions="baseActions"
    ></DynamicForm>
    <DynamicForm
      v-show="active === 1"
      class="relative"
      :formOption="formOption"
      :formItemList="validFormItemList"
      :data="validDetail"
      :actions="actions"
    >
    </DynamicForm>
  </main>
</template>
<script>
import {
  socialProjectDetailApi,
  getSocialProjectAirInfoApi,
  socialProjectUpdateApi,
  socialProjecValidUpdatetApi
} from '@/network/orderManage.js'

import { fields, airFields } from './socialProjectFields.js'

export default {
  name: 'projectForm',
  props: {
    data: {
      type: [Object, Number, String, Array]
    },
    textModel: [Boolean]
  },
  data () {
    return {
      active: 0,
      // form字段
      formOption: this.$appendToPreset('formOption', {
        textModel: this.textModel,
        formProperties: {
          'label-width': '150px'
          // 'label-position': this.textModel ? 'right' : 'top'
        }
      }),
      baseFormItemList: this.$buildFormFields(fields),

      baseDetail: {},
      validFormItemList: this.$buildFormFields(airFields),

      validDetail: {},
      baseActions: {
        save: {
          label: '保存',
          actionType: 'submitAction',
          apiPromise: socialProjectUpdateApi,
          callback: {
            closeModal: false,
            refresh: false,
            reset: false,
            next: () => {
              this.active = 1
            }
          }
        }
      },
      actions: {

        save: {
          apiPromise: socialProjecValidUpdatetApi,
          actionType: 'submitAction',
          label: '保存'
        },
        prev: {
          isLoadData: false,
          actionType: 'customAction',
          label: '上一步',
          actionHandle: () => {
            this.active = 0
          }
        }
      }
    }
  },
  watch: {
    data: {
      handler (data) {
        debugger

        this.loadDetail(data)
      },
      immediate: true
    }
  },
  methods: {
    loadDetail (data) {
      debugger
      socialProjectDetailApi(data).then((data) => {
        this.baseDetail = data
        if (data.projectStatusInt === 2) {
          this.active = 1
          this.baseActions.save.label = '下一步'
          getSocialProjectAirInfoApi(data.id).then((data) => {
            this.validDetail = data
          })
        }
      })
    },
    switchStep (step) {
      if (this.baseDetail.projectStatusInt === 1 && step === 2) return
      this.active = step
    }
  }
}
</script>
<style lang="less" scoped></style>
