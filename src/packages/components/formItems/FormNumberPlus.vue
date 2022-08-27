<template>
    <!-- 数字输入框 -->
    <section :class="getClass()">
        <template v-if="!isTextMode">
            <el-input v-model.trim="tempVal"
                      :placeholder="placeholder"
                      :disabled="isDisabled"
                      class="input-wr"
                      type="number"
                      v-bind="bindOptions"
                      :clearable="true"
                      @keydown.native="onKeydown($event)"
                      @blur="e => onBlur(item, e)"
                      @focus="e => onFocus(item, e)"
            >
                <template v-if="prepend" slot="prepend">{{ prepend }}</template>
                <template v-if="append" slot="append">{{ append }}</template>
            </el-input>
            <el-input v-model.trim="dealInputValue"
                      :placeholder="placeholder"
                      :disabled="isDisabled"
                      class="input-readonly"
                      type="input"
                      v-bind="bindOptions"
                      :clearable="true"
            >
                <template v-if="prepend" slot="prepend">{{ prepend }}</template>
                <template v-if="append" slot="append">{{ append }}</template>
            </el-input>
        </template>
        <div v-else :style="item.textStyle||{}" class="form-input-text">
            {{ prepend }}
            {{ dealInputValue || '-' }}
            {{ append }}
        </div>
    </section>
</template>

<script>
/* 配置属性：
    * positive：默认 false，true 的时候禁止输入负号（但理论上 js 给的负数值不会变化，下同）；
    * onlyInt：默认 false，true 的时候禁止输入小数点；
    * zeroPadding：默认为空，number 类型，指自动补零到指定位数；
    * decimalLimit：默认为空，number 类型，最大小数位数，小数位数超过这个长度的部分，将被自动截掉；
    * prefix：默认为空，string 类型，前置符号；
    * suffix：默认为空，string 类型，后置符号；
    * */
import FormMixin from './mixin'
import { isEmpty } from '../../utils/tool'

export default {
    name: 'FormNumberPlus',
    mixins: [FormMixin],
    data() {
        return {
            readonly: true,
            // 在编辑模式下，使用这个 tempVal 替代真实的 val
            // 在触发 blur 事件时，用这个更新原来的 val
            tempVal: ''
        }
    },
    computed: {
        // 千分位的数字
        dealInputValue() {
            if (isEmpty(this.value, true)) {
                return ''
            }
            const n = String(this.value)
            const res = n.toString().replace(/\d+/, n => {
                return n.replace(/(\d)(?=(\d{3})+$)/g, $1 => {
                    return $1 + ','
                })
            })
            return res
        },
        // 前置符号
        prepend() {
            // 兼容性处理
            if (this.item.prepend) {
                return this.item.prepend
            } else if (this.item.prefixMsg) {
                return this.item.prefixMsg
            } else if (this.item.symbolBeforeMsg) {
                return this.item.symbolBeforeMsg
            } else {
                return ''
            }
        },
        // 后置符号
        append() {
            // 兼容性处理
            if (this.item.append) {
                return this.item.append
            } else if (this.item.suffixMsg) {
                return this.item.suffixMsg
            } else if (this.item.symbolAfterMsg) {
                return this.item.symbolAfterMsg
            } else {
                return ''
            }
        },
        val: {
            get() {
                if (isEmpty(this.value, true)) {
                    return ''
                }
                return this.value
            },
            set(v) {
                if (isEmpty(this.value, true)) {
                    this.$emit('input', v)
                
                    this.formMethods.valueUpdateEvent({
                        [this.item.key]: v
                    })
                   
                    return
                }
                const newVal = v
                let n = String(newVal)
                // 假如禁止输入负数，那么小于 0 则自动变为 0
                if (this.item.positive && n && Number(n) < 0) {
                    n = '0'
                }

                // 这里主要目的是限制小数位数超过限制的
                if (
                    (this.item.decimalLimit && this.item.decimalLimit > 0) ||
                    (this.item.zeroMsg && this.item.zeroMsg > 0)
                ) {
                    // 兼容性设置
                    const limit = this.item.decimalLimit || this.item.zeroMsg

                    // 包含小数点，并且小数点后面有数字
                    if (n.includes('.') && n.split('.').length > 1) {
                        const currentLength = n.split('.')[1].length
                        if (currentLength > limit) {
                            const s = n.split('.')
                            n = `${s[0]}.${s[1].slice(0, limit)}`
                        }
                    }
                }

                // 假如禁止输入负数，那么小于 0 则自动变为 0
                if (this.item.positive && n && Number(n) < 0) {
                    n = '0'
                }
                this.$emit('input', n)
                
                this.formMethods.valueUpdateEvent({
                    [this.item.key]: n
                })
                
            }
        }
    },
    methods: {
        onKeydown(e) {
            // 假如禁止输入负数，那么干掉负号
            if (this.item.positive) {
                if (e.key === '-' || e.code === 'Minus') {
                    e.preventDefault()
                    return
                }
            }
            // 假如只允许输入整数，那么干掉小数点
            if (this.item.onlyInt) {
                if (e.key === '.' || e.code === 'Period') {
                    e.preventDefault()
                }
            }
        },
        getClass() {
            const c1 = `form-unqiue-${this.item.key} ${this.isTextMode ? 'hz-text-box' : 'hz-untext-box'}`
            const c2 = this.readonly ? 'is-readonly' : 'is-wr'
            return {
                [c1]: true,
                [c2]: true
            }
        },

        onBlur() {
            this.readonly = true
            if (this.tempVal === '') {
                this.$emit('input', this.tempVal)

                this.formMethods.valueUpdateEvent({
                    [this.item.key]: this.tempVal
                })
                return
            }

            let newVal = this.tempVal

            // 如果需要补零
            if (this.item.zeroPadding && this.item.zeroPadding > 0) {
                const l = String(newVal).split('.')
                // 如果没有小数点（说明只有整数位），自动补零
                if (l.length === 1) {
                    // 判断 l[0].length 是否为 0，为 0 则说明没填，啥事都不做
                    if (l[0].length === 0) {
                        newVal = ''
                    } else {
                        // 自动补零
                        newVal += '.' + '0'.padEnd(this.item.zeroPadding, '0')
                    }
                } else {
                    // 此时说明有小数点，那么小数位数多，则去掉多余的。位数小，则补零
                    const currentLength = l[1].length
                    // 小数位数少，则补零
                    if (currentLength < this.item.zeroPadding) {
                        newVal = l[0] + '.' + l[1].padEnd(this.item.zeroPadding, '0')
                    }
                    // 如果大于
                    if (currentLength > this.item.zeroPadding) {
                        newVal = String(l[0]) + '.' + l[1].slice(0, this.item.zeroPadding)
                    }
                }
            }
            newVal = String(newVal)
            newVal = newVal.split('.').map((s, index) => {
                if (index !== 0) {
                    return s
                }
                // 通过正则，匹配首位开始的所有 0（用于去除整数部分开始的 0）
                const newS = s.replace(/$0+/g, '')
                // 如果只有 0，那么最后返回 0，确保小数点前有数字
                if (newS.length === 0) {
                    return '0'
                } else {
                    return newS
                }
            }).join('.')

            // 假如禁止输入负数，那么小于 0 则自动变为 0
            if (this.item.positive && newVal < 0) {
                newVal = 0
            }

            this.tempVal = this.throwPointLeftZero(this.tempVal)
            this.tempVal = this.throwPointRightZero(this.tempVal)
            this.val = newVal
        },
        onFocus() {
            const newValue = this.value
            this.tempVal = String(newValue)
            this.readonly = false
        }
    }
}
</script>

<style scoped lang="less">
                                                                                                                                                                                .input-wr {
    z-index: 100;
}
.input-readonly {
        position: absolute;
        left: 0;
    top: 0;
}
.is-wr {
    .input-wr {
        opacity: 1;
        }
    .input-readonly {
        display: none;
    }
}
.is-readonly {
    .input-wr {
        opacity: 0;
    }
    .input-readonly {
    }
}
                                                                                                                                                                                .input-wr /deep/ .el-input__inner {
    line-height: 1px !important;
}
</style>
