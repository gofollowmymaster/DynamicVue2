<template>
  <main class="dynamic-form" :class="[mode + '-form']">
    <el-form
      v-bind="formProperties"
      :class="{ 'border-form': borderForm, 'form-text-mode': textModel }"
      :model="data"
      :validate-on-rule-change="true"
      ref="form"
    >
      <template v-for="formSection of formItemList">
        <main
          v-if="
            !formSection.hidden && filterFormHide(formSection.children).length
          "
          :key="formSection.label"
          :class="getBlockClass(formSection)"
          class="pb12 form-section"
        >
          <header
            v-if="formSection.label"
            class="block-nav flex justify-between"
          >
            <span class="block-text">{{ formSection.label }}</span>
            <span
              class="block-fold-btn"
              v-if="showFoldBtn"
              @click="foldBlock(formSection)"
            >
              {{ isBlocked(formSection) ? "展开" : "收起" }}
              <i
                :class="[
                  'el-icon-arrow-' + (isBlocked(formSection) ? 'down' : 'up'),
                ]"
              ></i>
            </span>
          </header>
          <article
            class="block-content relative"
            :class="[singleCol ? 'single-wrap' : 'grid-wrap']"
          >
            <!-- <section class="grid-wrap "> -->
            <template v-for="(formItem, index) in formSection.children">
              <component
                v-if="!formItem.hidden && formItem.type == 'slot'"
                class="grid-item"
                :is="formItem.wrapertype"
                :key="formItem.key"
                :label="getFormItemLabel(formItem)"
                v-bind="formItem.wraperProperties"
              >
                <slot :name="formItem.key"></slot>
              </component>
              <FormHide
                v-else-if="!formItem.hidden && formItem.type == 'FormHide'"
                v-model="data[formItem.key]"
                :key="formItem.key"
              >
              </FormHide>
              <!-- <div  v-else-if="formItem.type=='FormText'"
                  :key="formItem.key"
                v-bind="formItem.wraperProperties">
                 <FormText
                 v-bind:item="formItem"
                :key="formItem.key"
              >
              </FormText>
              </div> -->

              <el-form-item
                class="grid-item"
                v-else-if="!formItem.hidden"
                :key="formItem.key"
                v-bind="formItem.wraperProperties"
                :rules="!textModel ? formItem.rules : []"
                :label="getFormItemLabel(formItem)"
                :prop="formItem.key"
              >
                <component
                  v-model="data[formItem.key]"
                  :is="formItem.type || 'FormInput'"
                  :ref="formItem.key"
                  v-bind:item="formItem"
                  :key="formItem.key"
                />
                <div
                  v-if="!textModel && formItem.formTip"
                  class="text-size12 form-tip lh22"
                >
                  {{ formItem.formTip }}
                </div>
              </el-form-item>
            </template>
          </article>
        </main>
      </template>
    </el-form>
    <testTool
      v-if="showTestTool && !textModel && $dynamicConfig.isDebug"
      :fields="formItemList"
      refFormName="form"
    ></testTool>
  </main>
</template>

<script>
import { deepCopy, JSONDeepCopy, parseExpression } from '../utils/tool'

export default {
  name: 'DynamicFormContent',
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formProperties: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formItemList: {
      type: Array,
      default: () => []
    },

    // 是否显示收起、展开按钮
    showFoldBtn: {
      type: Boolean,
      default: false
    },

    // 全部表单元素禁用。通常用于提交时使用
    allDisabled: {
      type: Boolean,
      default: false
    },
    // 是否给表单显示border 外框，包含区块外侧有一个 boder，以及区块标题的灰色背景
    borderForm: {
      type: Boolean,
      default: true
    },
    // 文字模式。不显示表单组件，而是只显示纯文字内容
    // 同时，纯文本模式（即值为 true 的时候），会隐藏表单要素 label 左边的星号
    textModel: {
      type: Boolean,
      default: false
    },
    // 布局模式。
    singleCol: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'column'
    }
  },
  data () {
    return {
      showTestTool: process.env.NODE_ENV == 'development',
      changeData: {
        // 所有动态数据，更准确的说，是会重新赋值的，需要放到 data 里，才能实现响应式。这是因为 provide 本身的特性导致的
        allDisabled: this.allDisabled,
        textModel: this.textModel
        // formData:this.data
      },
      foldBlockList: [] // 收起的区块（放在这个里面，该区块就只显示区块标题，不显示内容）
    }
  },
  watch: {
    data: {
      handler (data) {
        this.computeExpressions()
      },
      deep: true,
      immediate: true
    }
  },
  components: {},
  provide () {
    return {
      // 状态切换函数
      statusChangeFn: {
        // 设置为禁用
        setElementDisable: this.setElementDisable,
        // 设置为隐藏
        setElementHidden: this.setElementHidden,
        // 设置为必填
        setElementRequired: this.setElementRequired,
        // 更新其他数据
        updateFormData: this.updateFormData,
        valueUpdateEvent: this.valueUpdateEvent
      },
      // 会动态变化的数据（注意，来自 props【更上级组件】的数据，不能放这个里面，只能显式的通过 props 往下面传）
      changeData: this.changeData,
      formData: this.getData,
      formItemType: '',
      childChangeData: {},

      transExpression: this.transExpression
    }
  },
  created () {
    // todo 问题 props 傳入formItemList 变化后 formItemListInit 不会变化
    // 是否允许props 傳入formItemList  动态更新
    // this.formItemListInit=deepCopy(this.formItemList)
    // Object.freeze(this.formItemList)
  },
  methods: {
    filterFormHide (items) {
      return items.filter((item) => item.type !== 'FormHide')
    },
    getFormItemListInit () {
      if (!this.formItemListInit) {
        this.formItemListInit = deepCopy(this.formItemList)
        Object.freeze(this.formItemListInit)
      }
      return this.formItemListInit
    },
    computeExpressions () {
      debugger
      const formItemListInit = this.getFormItemListInit()

      formItemListInit.forEach((formSection, index) => {
        const reg = /#\{(.+)?\}/

        if (typeof formSection.hidden === 'string' && reg.test(formSection.hidden)) {
          this.formItemList[index].hidden = this.transExpression(formSection.hidden)
        }
        if (typeof formSection.disabled === 'string' && reg.test(formSection.disabled)) {
          const disabled = this.transExpression(formSection.disabled)
          this.setSectionElementDisable(this.formItemList[index].children, disabled)
        }

        formSection.children.forEach((item, innerIndex) => {
          for (const key in item.properties) {
            const propertyValue = item.properties[key]
            let expressionValue; let isDynamicValue = false

            if (typeof propertyValue === 'string' && reg.test(propertyValue)) {
              expressionValue = this.transExpression(propertyValue)
              isDynamicValue = true
            }
            if (typeof propertyValue === 'function') {
              expressionValue = propertyValue(this.data[item.key], deepCopy(this.data))
              isDynamicValue = true
            }

            if (isDynamicValue) {
              switch (key) {
                case 'required':
                  this.setElementRequired(item.key, expressionValue)
                  break
                case 'value':
                  expressionValue != this.data[item.key] &&
                    this.$set(this.data, item.key, expressionValue)
                  break
                case 'hidden':
                  this.formItemList[index].children[innerIndex].hidden = expressionValue
                  break
                default:
                  this.formItemList[index].children[innerIndex].properties[key] = expressionValue
              }
            }
          }
        })
      })
    },
    transExpression (expression) {
      const instance = this.data
      return parseExpression(expression, instance)
    },
    // 监听值更新
    valueUpdateEvent (params) {
      this.$emit('formDataUpdated', this, params)
      const [key] = Object.keys(params)
      this.formItemForEach((formItem) => {
        if (formItem.key == key && formItem.changeHandle) {
          formItem.changeHandle(params[key], this)
        }
      })
    },

    getData () {
      return this.filterData(this.data)
    },
    // 更新数据
    updateFormData (data) {
      Object.keys(data).forEach((key) => {
        this.$set(this.data, key, data[key])
      })
    },

    validate (fn) {
      // 先校验父级表单的值
      this.$refs.form.validate((valid) => {
        if (!valid) return
        // 克隆一份数据
        const data = JSONDeepCopy(this.getData())

        // 判断是否需要校验子表单
        const childFormKeyList = []
        this.formItemList.forEach((filed) => {
          if (filed.children && filed.children.length > 0) {
            filed.children.forEach((formItem) => {
              // 如果某一项是
              if (formItem.type === 'child-form') {
                childFormKeyList.push(formItem.key)
              }
            })
          }
        })

        if (childFormKeyList.length === 0) {
          if (valid) {
            fn(true, data)
          } else {
            fn(false, data)
          }
        } else {
          const validateList = childFormKeyList.map((key) => {
            return this.$refs[key][0].validateForm()
          })
          Promise.all(validateList)
            .then(() => {
              // 父表单校验也通过了，才算都通过
              if (valid) {
                fn(true, data)
              } else {
                // 否则即使子表单校验通过，父表单校验没通过，也是算不通过的
                fn(false, data)
              }
            })
            .catch(() => {
              fn(false, data)
            })
        }
      })
    },
    filterData (data) {
      const filteredData = {}
      this.formItemForEach((formItem) => {
        if (!['slot', 'FormText'].includes(formItem.type)) {
          filteredData[formItem.key] = data[formItem.key] ?? ''
          if (Array.isArray(data[formItem.key])) {
            filteredData[formItem.key] = data[formItem.key].filter(
              (item) => item !== null && item !== undefined
            )
          }
        }
      })
      return filteredData
    },
    formItemForEach (func) {
      for (const formSection of this.formItemList) {
        if (formSection.children && formSection.children.length > 0) {
          for (const formItem of formSection.children) {
            const isOver = func(formItem)
            if (isOver) return
          }
        }
      }
    },

    // 设置某个要素必填
    // key：操作的 key
    // Required true，表示隐藏。而 false，表示取消隐藏
    setElementRequired (key, beRequired = true) {
      this.formItemForEach((formItem) => {
        if (formItem.key == key) {
          let rules = formItem.rules

          if (rules.length) {
            const requiredIndex = rules.findIndex(
              (item) => item.required !== undefined
            )
            if (requiredIndex >= 0) {
              rules[requiredIndex].required = beRequired
            } else {
              rules = rules.push({
                required: beRequired,
                message: '请输入',
                trigger: ['change']
              })
            }
          } else {
            rules = [
              {
                required: beRequired,
                message: '请输入',
                trigger: ['change']
              }
            ]
          }

          this.$set(formItem, 'rules', rules)
          return true
        }
      })
    },
    setSectionElementDisable (subFieldsList, beDisable = false) {
      subFieldsList.forEach((field, index) => {
        this.setElementDisable(field.key, beDisable)
      })
    },
    // 设置某个要素禁用
    // key：操作的 key
    // beDisable：必填，默认是 true，表示禁用。而 false，表示取消禁用
    setElementDisable (key, beDisable = true) {
      this.formItemForEach((formItem) => {
        if (formItem.key == key) {
          if (formItem.properties instanceof Object) {
            this.$set(formItem.properties, 'disabled', beDisable)
          } else {
            this.$set(formItem, 'properties', { disabled: beDisable })
          }
          return true
        }
      })
    },

    // 设置某个要素隐藏
    // key：操作的 key
    // beHidden：必填，默认是 true，表示隐藏。而 false，表示取消隐藏
    setElementHidden (key, beHidden = true) {
      this.formItemForEach((formItem) => {
        if (formItem.key == key) {
          this.$set(formItem, 'hidden', beHidden)
          return true
        }
      })
    },

    // 重置表单数据
    resetFields () {
      this.$refs.form.resetFields()
      this.formItemForEach((formItem) => {
        // 如果某一项是
        if (['FormChildForm', 'FormCurd'].includes(formItem.type)) {
          const a = this.$refs[formItem.key]
          if (a instanceof Array) {
            a[0].resetFields()
          } else if (a) {
            a.resetFields()
          }
        }
      })
    },
    // 收起/展开区块
    foldBlock (block) {
      const label = block.label
      const index = this.foldBlockList.indexOf(label)
      if (index === -1) {
        this.foldBlockList.push(block.label)
      } else {
        this.foldBlockList.splice(index, 1)
      }
    },
    isBlocked (formSection) {
      return this.foldBlockList.indexOf(formSection.label) > -1
    },
    // 获取区块的样式
    getBlockClass (blockItem) {
      const c = blockItem.class
      return Object.assign({}, c, {
        'block-item': this.borderForm,
        'block-hide': this.foldBlockList.indexOf(blockItem.label) > -1
      })
    },

    // 获取 label
    getFormItemLabel (formItem) {
      if (
        ['left', 'right'].includes(this.formProperties['label-position']) &&
        formItem.label
      ) {
        return formItem.label + ':'
      }
      return formItem.label
    }
  }
}
</script>

<style lang="less" scoped>
</style>
