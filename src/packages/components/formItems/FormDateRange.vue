<template>
    <!-- 日期范围选择框 -->
    <section >
        <el-date-picker v-model="val"
                        type="daterange"
                        :disabled="getDisabled"
                        :placeholder="getPlaceholder(item)"
                        @blur="e => onBlur(item, e)"
                        @focus="e => onFocus(item, e)"
                        value-format="yyyy-MM-dd"
                        :clearable="true"
                        v-bind="bindOptions"
                        v-if="!getTextModel"/>
        <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModelValue || '-' }}</div>
    </section>
</template>

<script>
import FormMixin from './mixin'

export default {
  name: 'FormDateRange',
  props: {
    value: {
      type: [String, Array],
      default: ''
    }
  },
  mixins: [FormMixin],
  computed: {
    val: {
      get () {
        if (this.value) {
          if (typeof this.value === 'string') return JSON.parse(this.value)
          return this.value
        } else {
          return []
        }
      },
      set (v) {
        this.$emit('input', v)

        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: v
        })
      }
    },
    textModelValue () {
      return this.val && this.val.join('至')
    }
  }
}
</script>

<style scoped lang="less">

    .form-item-box /deep/ .el-date-editor--daterange {
        position: relative;
        width: 100%;
        display: inline-flex;
        // height: 36px;

        .el-input__inner {
            position: absolute;
            width: 100%;
            // height: 36px;
            // line-height: 36px;
            padding-right: 10px;
            padding-left: 32px;
        }

        .el-range__icon {
            position: relative;
            left: 7px;
            width: 16px;
            // height: 36px;

            &:before {
                font-size: 16px;
                // line-height: 36px;
            }
        }

        .el-range-separator {
            line-height: 26px;
        }

        .el-input__icon.el-range__close-icon {
            position: absolute;
            right: 3px;
        }
    }
</style>
