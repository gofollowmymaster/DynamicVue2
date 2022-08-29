<template>
  <div class="tree-tab-bar-editable">
     <TreeBar   class="width280px relative"  :treeOptions="treeOptions" ref="treeBar" v-on="$listeners">
          <template v-if="editable" v-slot:categoryTree="{node,data}" >
            <div class="flex full-width">
              <span class="tree-label lh28" > {{node.label}}</span>
              <span class="flex1 text-right lh28 pr12" @click.stop="()=>{}"> 
                <el-dropdown trigger="hover" :show-timeout="100" @command="(command)=>handleCommand(command,node, data)">
                  <span class="el-dropdown-link">
                     <svg-icon slot="reference" :icon-class="'moreaction'" class="action-svg" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item  command='add'>
                       新增 
                    </el-dropdown-item>
                    <el-dropdown-item command="update">
                      修改
                    </el-dropdown-item>
                    <el-dropdown-item  command="delete">
                         删除
                      
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </div>
          </template>
          
          <template v-if="editable" v-slot:bottomBtn>
              <div  class="tree-bottom">
               <svg-icon @click="addCategory()" :icon-class="'addicon'" class="action-svg cursor-pointer" />
            </div>
           </template>
        </TreeBar>

      <editForm  
        v-if="editable" 
        :dialogVisible.sync="categoryDialogShow"
        :formData="categoryFormData"
        :action="action"
        :apiPromises="apiPromises"
        @formSubmited="formSubmited">
      </editForm>
  </div>
</template>
<script>
import TreeBar from "./TreeBar.vue";
import editForm from "./editForm";



export default {
  name:'categoryTree',
  components:{
    TreeBar,editForm
  },
  props: {
    editable:{
      type:Boolean,
      default:false
    },
    treeOptions:{
      type:Array,
      default(){
        return [
        { 
          name:'categoryTree',
          label: '知识分类',  
          // LoadTreeNodeFunc : ,
          rootCode: -1,
          'node-key':"id",
          'props':{
            label: 'name',
            children: 'children',
            isLeaf: 'leaf'
          },
        },
      ]
      }
    }
  },
  data () {
    return {
      action:'create',
        categoryFormData:{parentId: []},
        categoryDialogShow:false,

    
    }
  },
  computed:{
   
  },
  methods: {
    handleCommand(command,node,data){
      debugger
        switch (command) {
          case 'add':
            this.addCategory(node,data)
            break;
          case 'update':
          this.modifyCategory(node,data)
          break;
          case 'delete':
          this.deleteCategory(node,data)
          break;
        }
    },
    deleteCategory(node,data){
      debugger
      delKnowCategory(data.id).then(()=>{
      const parentId=data.parentId
      this.$refs.treeBar.refreshNodeBy(parentId)
      })
    },
    modifyCategory(node,data){
      debugger
      this.title = '编辑专家知识类型';
      this.action ='update'
      this.categoryDialogShow = true;
      this.categoryFormData.parentId = [];
      const parentName=data.parentId=='-1'?'顶级分类':data.parentName

      //新增----保存选中节点为上级
      this.$set(this.categoryFormData,'parentId',[{name:parentName,id:data.parentId}]) ;
      this.$set(this.categoryFormData,'name',data.name) ;
      this.categoryFormData.id=data.id
    },
 
     // 新增分类
    addCategory(node, data) {
      debugger
      // 新增
      this.title = '新增专家知识类型';
      this.action ='create'
      this.categoryDialogShow = true;
       this.categoryFormData.parentId = [];
      if (data) {
        //新增----保存选中节点为上级
        this.$set(this.categoryFormData,'parentId',[{name:data.name,id:data.id}]) ;
        this.$set(this.categoryFormData,'name','') ;
        this.categoryFormData.id=null

      } 
    },
    formSubmited(parentId){
      debugger
      parentId=parentId[0]?.id
      this.$refs.treeBar.refreshNodeBy(parentId)
    }

  }
}
</script>
<style lang="less" scoped>
  
.tree-bottom{
  position: absolute;
  bottom: 12px;
  width: 100%;
  text-align: center;
  font-size: 24px;
  &:hover{
    color: #129E9E;
  }
}

</style>