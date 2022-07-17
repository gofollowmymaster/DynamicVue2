<template>
  <section  class="chilren-form-wrapper">
   <div class="text-right ">
     <span class="px12 py6 text-size16" @click="addForm"><i class="el-icon-plus"></i></span>
   </div>
    <ul class="">
      <li   v-for="(formData,index) in val" :key="formData.id" class="children-form-item relative mt12 border-r4 flex align-center pl6 pr28 pt8">
        <span class="absolute top6 left6">{{index+1}}</span>
        <i class="action-icon absolute top3 right3 el-icon-delete" @click="deleteItem(index)"></i>
           <DynamicFormContent
           class="  "
      :data="formData"
      :formItemList="formItemList"
      v-bind="formOption"
      :allDisabled="getTextModel?true:getDisabled"
      :ref="'dynamicForm'+formData.id"
      :testTool="false"
    ></DynamicFormContent>
      </li>
    </ul>

  </section>
</template>

<script>
import FormMixin from './mixin'
import presetConfig from '../../presetConfig'
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
    formOption () {
      return { ...presetConfig.getConfig('formOption'), formProperties: { 'label-width': '80px' }, borderForm: false, colNum: 4, ...this.item.formOption }
    },
    formItemList () {
      debugger
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
      this.val.forEach((item, index) => {
        this.$refs['dynamicForm' + item.id][0].resetFields()
      })
    },
    addForm () {
      // this.formList.push({})
      this.val.push({ id: new Date().getTime() })
    },
    deleteItem (index) {
      this.val.splice(index, 1)
    },
    validateForm () {
      let formValid = true

      this.val.forEach((item, index) => {
        this.$refs['dynamicForm' + item.id][0].validate((valid) => {
          if (!valid)formValid = false
        })
      })
      return formValid
    }
  }
}
</script>

<style scoped  lang="css">
 .children-form-item{
   border: solid 1px var(--grey);
 }
 .action-icon{
   padding: 2px;
   border-radius: 50%;
 }
  .children-form-item:hover .action-icon{
    color: var(--white);
    background-color: var(--main-color);
  }
 .chilren-form-wrapper {
       border:solid 1px var(--main-color);
    padding:8px;
 }

</style>
<style    lang="css">
  .chilren-form-wrapper .children-form-item .dynamic-form .block-content {
    width: 100%;

}
</style>
