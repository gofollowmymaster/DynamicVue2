<template>
  <section  class="chilren-form-wrapper">
   <div class="text-right">
     <span class="px12 py6 text-size16" @click="addForm"><i class="el-icon-plus"></i></span>
   </div>
    <ul>
      <li   v-for="(formData,index) in val" :key="formData.id" class="children-form-item mt12 border-r4 flex align-center px12 pt8">
        <span>{{index}}</span>
           <DynamicFormContent
           class="ml12 "
      :data="formData"
      :formItemList="formItemList"

      v-bind="formOption"
      :allDisabled="getTextModel?true:getDisabled"
      :ref="'dynamicForm'+formData.id"
    ></DynamicFormContent>
      </li>
    </ul>
   
  </section>
</template>

<script>
import FormMixin from './mixin'
     import presetConfig  from "../../presetConfig"
export default {
  name: 'FormChildrenForm',
  mixins: [FormMixin],
  data () {
    return {
      formDataList: []
    }
  },

  watch: {

  },
  computed: {
    formOption(){
      return {...presetConfig.getConfig('formOption'),formProperties:{'label-width':'80px'}, colNum:4,...this.item.formOption}
    },
    formItemList(){
      return this.$buildFormFields(this.item.fields)
    },
    val: {
      get () {
        return this.value || []
      },

      set (tableList) {
        this.$emit('input', tableList)

        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: tableList
        })
      }
    }

  },
  mounted () {},
  methods: {
    resetFields () {
        this.val.forEach((item,index)=>{
          this.$refs['dynamicForm'+item.id][0].resetFields()

        })
    },
    addForm () {
      // this.formList.push({})
       this.val.push({id:new Date().getTime()})
    },
    validateForm(){
        let formValid=true
         
          this.val.forEach((item,index)=>{
            this.$refs['dynamicForm'+item.id][0].validate((valid)=>{
                if(!valid)formValid=false
            })

          })
          return  formValid
        
        
    }
  }
}
</script>

<style scoped  lang="css">
 .children-form-item{
   border: solid 1px var(--grey);
 }
/deep/ .chilren-form-wrapper .children-form-item .dynamic-form .block-content {
    width: 100%;
}
</style>
