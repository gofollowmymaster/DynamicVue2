<template>
    <div id="test-tools" class="flex  align-center">

        <el-tooltip class="item" effect="dark" content="快速生成测试数据" placement="top">
            <el-button size="small" icon="el-icon-lollipop" circle @click="makeTestData" />
        </el-tooltip>
    </div>
</template>
<script>
import TestValueCreator from './NormalValueCreator'
// import MockValueCreator from './MockValueCreator'

export default {
    name: 'TestTool',
    props: {
       
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
            valueCreator: null,
            dataStatus: 'standard'
        }
    },
    created() {
        if (this.$parent.$options.name !== 'DynamicFormContent') {
            console.error('获取表单示例失败!表单测试数据填充器必须包裹在DynamicFormContent内')
            return 
        }
        this.valueCreator=    new TestValueCreator(this.$parent)
        // import('./NormalValueCreator.js').then(({default:valueCreator})=>{
        //     this.valueCreator =new valueCreator(this.$parent) 
        // })

        // require(['./NormalValueCreator.js'],({default:valueCreator})=>{
        //     debugger
        //     this.valueCreator =new valueCreator(this.$parent) 
        // })
    },
    methods: {

        makeTestData() {
            // 更新生成数据类型
            this.valueCreator.setDataType(this.dataStatus)
            // 更新自定义生成数据函数
            this.valueCreator.customizeFn = this.customizeFn
            // 更新超限数据 key
            this.valueCreator.exceptOutLimitKeys = this.exceptOutLimitKeys
            // 随机生成数据
            const obj = this.valueCreator.makeValue()
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
    right: 20px;
    top: 48px;
    background-color: #fff;
}
</style>
