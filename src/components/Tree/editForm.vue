<template>
      <section  >
          <dynamicForm ref="vuform"  
         class="pb24"
        :dialogtitle="title"
        dialogWidth="32%"
        :dialogVisible="dialogVisible"
        :isdialog="isdialog"  
         :formItem="form"
        :formData="form_data"
        :form_handler="from_handler" 
        labelWidth='120px'    
         @cancelDialog="closeDialog"
        :span = "24">
      
    </dynamicForm>

    </section>

</template>
<script>
 
 


  export default {
    name:"editForm",
    components: {
     
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false
      },
      formData:{
        type:Object,
        default:function(){
          return {}
        }
      },
      apiPromises:{
        type:Object,
        default:function(){
          return {
        //       updateApi:updataKnowCategory,
        // saveApi:saveKnowCategory,
        // detailApi:findKnowCategory,
          }
        }
      }

    },
    data() {
       
      return {
        title:'',
        isdialog:true,
      
        
        // 表单配置
        form,
        form_data:{}
      }
    },

    watch: {
       formData:{
         handler(formData){
           this.form_data= {...this.initData(form),...formData}
         },
         deep:true,
         immediate:true, 
         
      },
  
    },
    methods: {
      afterFormSubmit(){
         const parentId = this.form_data.parentId
         this.$emit('formSubmited',parentId)
      }
      
      
    },
   
  }
</script>
<style lang="scss" scoped>
// @import '@/assets/css/standardUse.scss';
::v-deep .titleStyle{
  span{
    color: blue
  }
}
::v-deep .el-dialog__body{
  padding: 20px 0px 30px 0px;
}
</style>
