<template>
              <component
                v-if="!formItem.hidden && formItem.type === 'slot'"
                :is="formItem.wrapertype||'div'"
                :key="formItem.key"
                :label="label"
                 v-bind="formItem.wraperProperties"
                  :class="setFormItemClass(formItem.wraperProperties.class)"
              >
                <slot :name="formItem.key"></slot>
              </component>
              <FormHide
                v-else-if="!formItem.hidden && formItem.type === 'FormHide'"
                v-model="label"
                :key="formItem.key"
              >
              </FormHide>
      <el-form-item
                v-else-if="!formItem.hidden"
                 :rules="!textModel ? formItem.rules : []"
                v-bind="formItem.wraperProperties"
                  :class="setFormItemClass(formItem.wraperProperties.class)"
                  :label="label"
                   :key="formItem.key"
                :prop="formItem.key">
                <template v-if="formItem.labelInfo" v-slot:label>
                   <LabelWithTip  :label="label" :tip="formItem.labelInfo" :icon="formItem.infoIcon"></LabelWithTip>
                </template>
                <component
                  v-model="val"
                  ref="formitem"
                  class="form-item-box"
                  :style="formItem.style||{}"
                  :class="`form-unqiue-${formItem.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
                  :is="formItem.type || 'FormInput'"
                  v-bind:item="formItem"
                  :key="formItem.key"/>
                   <div
                  v-if="!textModel && formItem.formTip"
                  class=" text-size12 form-tip lh22"
                >
                   {{ formItem.formTip }}
                </div>

              </el-form-item>

</template>
<script>

export default {
  name: 'DynamicFormItem',
  data () {
    return {

    }
  },
  props: {
    formItem: {
      type: Object,
      default: function () {
        return {}
      }
    },

    value: {
      type: [Object, Array, String, Boolean, Number],
      default: function () {
        return null
      }
    },
    label: String,
    textModel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }

  },

  inject: [
    'colNum',
    'changeData'
  ],
  watch: {

  },
  mounted () {
  },
  components: {

  },
  methods: {
    // ????????????????????????
    getTextModel () {
      if (this.changeData.textModel) {
        return true
      }
      return false
    },
    resetFields () {
      this.$refs.formitem.resetFields()
    },
    setFormItemClass (classList) {
      classList = Array.isArray(classList) ? classList : []
      classList = classList.filter((item) => {
        return !/^grid\-col\-\d$/.test(item)
      })
      const colNum = this.colNum >= 1 ? this.colNum : 1
      let layoutClass = 'grid-col-' + Math.ceil(24 / colNum)

      if (this.formItem.span) {
        layoutClass = 'grid-col-' + this.formItem.span
      }

      classList.push(layoutClass)

      return classList
    }
  }
}
</script>
<style lang="css" scoped>
</style>
