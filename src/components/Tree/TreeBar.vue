<template>
  <div class="tree-tab-bar-editable ys-main-wrapper">
    <div  :class="[treeOptions.length===1?'single-tab-wraper':'mult-tab-wraper']" >
      <div v-for="(item,index) in treeOptions" :class="{'tab-item': true, 'selected': index === currentTab ,}" :key="`org_${item.label}`" @click="onClickTab(index)">{{item.label}}</div>
    </div>
    <div class="content-container scroll">
      <!-- 全部 -->
      <div :class="{'all-container': true, 'selected': currentKey == ''}" @click="onClickAll">
        <div class="icon-container">
          <svg-icon :icon-class="'allicon'" class="action-svg" />
        </div>
        <span class="all-title">全部</span>
      </div>
      <!-- 内部组织 -->
      <div v-if="curentTree" class="tree-container" :key="curentTree.key" >
        <el-tree
          ref="treeRef"
          v-bind="curentTree "
          @node-click="onTreeNodeClick"
          :current-node-key="null"
          :expand-on-click-node="false"
          :load="asyncLoadTreeNode"
        >
          <template     v-slot="{ node, data }"  >
              <slot   :name="curentTree.name"  :node="node"  :data="data">
                  <span>{{node.label}}</span>
              </slot>
          </template>
        </el-tree>
      </div>
     
    </div>
      <slot name="bottomBtn"></slot>
    
  </div>
</template>
<script>

export default {
  name:'TreeBar',
  props: {
    treeOptions:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  data () {
    return {
   
      currentTab: 0,
      currentKey: ''
    }
  },
  computed:{
    curentTree(){
      return {key:this.treeOptions[this.currentTab].name,...this.treeOptions[this.currentTab],}
    }
  },
  methods: {
    refresh(){

    },
    onClickAll() {
      if (this.currentKey == '') return
      // 清空树形选中
      this.$refs.treeRef.setCurrentKey(null)
      this.currentKey = ''
      this.$emit('change', {id:this.curentTree.rootCode})
    },
    onClickTab(index) {
      debugger
      if (this.currentTab === index) return
      this.currentTab = index
    },
    asyncLoadTreeNode (node, resolve) {
      debugger
      const curentTree= this.curentTree
      const loadTreeNodeApi= curentTree.LoadTreeNodeFunc
      loadTreeNodeApi(node.level === 0 ? curentTree.rootCode:node.data[curentTree['node-key']]).then((list)=>{
         resolve(list)
      })
    },
     refreshNodeBy(id){
       debugger
         if(id ==this.curentTree.rootCode){
                this.$set(this.treeOptions[this.currentTab],'key',this.curentTree.name+ new Date().getTime())
                return 
             }
             let node = this.$refs.treeRef.getNode(id); // 通过节点id找到对应树节点对象
           
             node.loaded = false;
             node.expand(); // 主动调用展开节点方法，重新查询该节点下的所有子节点
      },
 
     
    onTreeNodeClick(nodeItem) {
      this.$refs.treeRef.setCurrentKey(null)
      this.currentKey = nodeItem.id
      this.$emit('change', nodeItem)
    },
 
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-tree-node{
  margin: 4px 0;
}
/deep/ .el-tree-node__content{
  height: 28px;
}
.single-tab-wraper{
  padding: 14px  24px;
    border-bottom:    1px solid #E6E6E6;

  .tab-item{
    width: 100%;
    font-size: 16px;
    line-height: 22px;
    text-align: left;
    cursor: pointer;
  }
}
.cursor-pointer {
  cursor: pointer;
}
.scroll {
  overflow: auto;
}
.scroll::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}
.scroll::-webkit-scrollbar-track {
  background: #efefef;
  border-radius: 2px;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}
.scroll::-webkit-scrollbar-corner {
  background: #ddd;
}
.tree-tab-bar-editable {
  height: calc(100vh - 185px);
  border: 1px solid #E6E6E6;
  border-radius: 2px;
  .mult-tab-wraper {
    display: flex;
    margin: 24px 29px 16px;
    border: 1px #DEE0DF solid;
    border-radius: 6px;
    font-weight: 400;
    color: #666666;
    .tab-item {
      flex: 1;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      border-right: 1px #DEE0DF solid;
      &:last-child {
        border-left: none;
      }
      &.selected {
        background-color: #129E9E;
        color: #FFFFFF;
      }
    }
  }
  .content-container {
    height: calc(100% - 70px);
    padding: 4px 8px;
    .all-container {
      display: flex;
      line-height: 28px;
      color: #606266;
      cursor: pointer;
      &.selected {
        background-color: #ecf7f7 !important;
      }
      &:hover {
        background-color: #F5F7FA;
      }
      .icon-container {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>