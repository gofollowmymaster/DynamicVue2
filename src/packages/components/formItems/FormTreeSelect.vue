<template>
    <section>
        <el-select v-if="!isTextMode" ref="select" v-model="val"
                   clearable style="width: 100%;"
                   :disabled="isDisabled"
                   :placeholder="placeholder"
                   @visible-change="visibleChange"
                   @clear="clear"
        >
            <el-option ref="option" class="option" :value="optionData.id" :label="optionData.name">
                <el-tree ref="tree" class="tree"
                         v-bind="item.options"
                         :default-expanded-keys="[val]"
                         @node-click="handleNodeClick"
                />
            </el-option>
        </el-select>
        <div v-else :style="item.textStyle || {}" class="form-input-text">
            {{ textModeValue || "-" }}
        </div>
    </section>
</template>

<script>

import FormMixin from './mixin'

export default {
    name: 'FormTreeSelect',
    mixins: [FormMixin],

    props: {

        // 树形的数据
        data: {
            type: Array,
            default: function() {
                return []
            }
        }

    },
    data() {
        return {
            optionData: {
                id: '',
                name: ''
            }
        }
    },
    computed: {
        val: {
            get() {
                return this.value
            },

            set(v) {
                // console.log(`|${v}|`);
                this.$emit('input', v[this.item.options['node-key']])
                this.formMethods.valueUpdateEvent({
                    [this.item.key]: v
                })
            
            }
        }
    },
    watch: {
        value: {
            handler(val) {
                debugger
                if (val) {
                    this.init(val)
                }
            },
            immediate: true
        },
        data: function(val) {
            if (!this.isEmpty(val)) {
                this.init(this.value)
            }
        }
    },
    mounted() {
    },
    methods: {
        // 是否为空
        isEmpty(val) {
            for (const key in val) {
                return false
            }
            return true
        },
        handleNodeClick(data) {
            debugger

            this.val = data
            this.$refs.select.visible = false
        },
        init(val) {
            if (val) {
                this.$nextTick(() => {
                    this.$refs.tree.setCurrentKey(val)
                    const node = this.$refs.tree.getNode(val)
                    this.optionData.id = val
                    this.optionData.name = node.label
                })
            } else {
                this.$refs.tree.setCurrentKey(null)
            }
        },
        visibleChange(e) {
            if (e) {
                const selectDom = this.$refs.tree.$el.querySelector('.is-current')
                setTimeout(() => {
                    this.$refs.select.scrollToOption({ $el: selectDom })
                }, 0)
            }
        },
        clear() {
            this.$emit('input', '')
        }
    }
}
</script>

<style lang="scss" scoped>
.option {
    height: auto;
    line-height: 1;
    padding: 0;
    background-color: #fff;
}
.tree {
    padding: 4px 20px;
    font-weight: 400;
}
</style>
