<template>
<div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
    class="form-item-box"
  >
    <el-select ref="select"   placeholder="请选择"   @visible-change="visibleChange" clearable
     style="width: 100%;" @clear="clear" 
      v-model="val"
      :disabled="getDisabled"
      :placeholder="getPlaceholder(item,'请选择')"
        v-if="!getTextModel">
        <el-option ref="option" class="option" :value="optionData.id" :label="optionData.name">
            <el-tree ref="tree" class="tree"
                v-bind="item.options"
                :default-expanded-keys='[val]'
                @node-click="handleNodeClick"></el-tree>
        </el-option>
    </el-select>
    <div v-else :style="item.textStyle || {}" class="form-input-text">
      {{ textModelValue || "-" }}
    </div>
</div>

</template>

<script>


// {
//           load: asyncAdministractiveTreeNode,
//           'node-key': 'admCode',
//           fieldName: 'admIds',
//           props: {
//             label: 'admName',
//             children: 'children',
//             isLeaf: 'leaf'
//           }
//         }
import FormMixin from "./mixin";

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
            },

           
        },
        data() {
            return {
                optionData: {
                    id: '',
                    name: ''
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
                if(!this.isEmpty(val)){
                    this.init(this.value)
                }
            }
        },
        computed:{
             val: {
                get () {
                    
                    return this.value
                },

                set (v) {
                    // console.log(`|${v}|`);
                    this.$emit('input',  v[this.item.options['node-key']])
                    this._valueLink(v);
                    // 只有非子表单的情况下，才会冒泡上去数据变更
                    if (this.formItemType !== 'childForm') {
                    this.statusChangeFn.valueUpdateEvent({
                        [this.item.key]: v
                    })
                    } else {
                    // 如果是子表单的话，执行内置的变更
                    this.childChangeData.valueUpdateEvent()
                    }
                }
        },
        },
        mounted() {
        },
        methods: {
            // 是否为空
            isEmpty(val) {
                for (let key in val) {
                  return false
                }
                return true
            },
            handleNodeClick(data) {
                debugger
       
                this.val=data
                this.$refs.select.visible = false
            },
            init(val) {
                if (val) {
                    this.$nextTick(() => {
                        
                        this.$refs.tree.setCurrentKey(val)
                        let node = this.$refs.tree.getNode(val)
                        this.optionData.id = val
                        this.optionData.name = node.label
                    })
                } else{
                    this.$refs.tree.setCurrentKey(null)
                }
            },
            visibleChange(e) {
                if(e) {
                    let selectDom = this.$refs.tree.$el.querySelector('.is-current')
                    setTimeout(() => {
                        this.$refs.select.scrollToOption({$el: selectDom})
                    },0)
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