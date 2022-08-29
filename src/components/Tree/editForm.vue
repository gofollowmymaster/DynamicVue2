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

let form =  [
    {
        "categoryName": "",
        "isShow": true,
        "isTitleShow": false,
        "showExtend": true,
        "list": [
           
            {
              "type": "treeSearchAble",
              "label": "上级类型",
              "placeholder": "请选择上级类别",
               span:24,
               rootCode:'-1',
              loadListApi:()=>{},
              // loadTreeApi:getKnowCategory,
              'props':{
                nodeKey: 'id',
                nodeLabel: 'name',
              },
              "prop": "parentId",
              "asynchandler": (item, form) => {   },
              "required": true,
              "required_msg": "请选择上级类别",
            },
            {
                "type": "Input",
                "label": "类型名称",
                span:24,
                "placeholder": "请输入类型名称",
                "prop": "name",
                "asynchandler": (item, form) => {   },
                "required_msg": "请输入类型名称",
                "changehandler": (value, form, item, e, oldForm) => { }
            },
             
        ]
    },
 
]

 


  export default {
    name:"categoryDetail",
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
