<template>
    <div id="test-tools" class="flex  align-center">
        <!-- <el-select v-model="dataStatus" placeholder="请选择" size="mini">
      <el-option label="标准合法数据" value="standard" />
      <el-option label="合法边界数据" value="border" />
      <el-option label="非法超限数据" value="outlimit" />
    </el-select> -->
        <el-button size="mini" @click="makeTestData">生成测试数据</el-button>
    </div>
</template>
<script>
// 自动测试工具
// 目的是通过 refForm 获取表单组件，以及 fields 获取表单结构，自动推断出表单应该填写的内容
import TestValueCreator from './TestValueCreator'
import MockValueCreator from './MockValueCreator'

export default {
    name: 'TestTool',
    props: {
        // 数据状态
        // standard 合法标准随机数据
        // border 合法边界数据
        // outlimit 非法超限数据（需要将超限数据添加到 this.OutLimitKeys 里，否则生成随机数据）

        // 自定义校验函数
        // 字段是 key，值是函数，入参是：(this.DataType)
        customizeFn: {
            type: Object,
            default: () => {
                return {}
            }
        },
        // 超限数据的 key 的集合。只有启用超限模式才生效
        exceptOutLimitKeys: {
            type: Array,
            default: () => []
        },
        fields: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            TestValueCreator: null,
            dataStatus: 'standard'
        }
    },
    created() {
        if (this.$parent.$options.name !== 'DynamicFormContent') {
            console.error('获取表单示例失败!表单测试数据填充器必须包裹在DynamicFormContent内')
        }
        // this.TestValueCreator = new TestValueCreator(this.$parent);
        this.TestValueCreator = process.env.NODE_ENV === 'development' ? new MockValueCreator(this.$parent) : new TestValueCreator(this.$parent)
    },
    methods: {
        // getFields() {
        //   return this.$parent.formItemList;
        // },
        makeTestData() {
            // const fields = this.fields||this.getFields();
            // 更新生成数据类型
            this.TestValueCreator.setDataType(this.dataStatus)
            // 更新自定义生成数据函数
            this.TestValueCreator.customizeFn = this.customizeFn
            // 更新超限数据 key
            this.TestValueCreator.exceptOutLimitKeys = this.exceptOutLimitKeys
            // 随机生成数据
            const obj = this.TestValueCreator.makeValue()
            console.table(obj)
            // 更新数据
            this.$parent.updateFormData(obj)
        }
    }
}
</script>
<style scoped lang="css">
#test-tools {
    position: absolute;
    right: 0;
    background-color: #fff;
}
</style>
