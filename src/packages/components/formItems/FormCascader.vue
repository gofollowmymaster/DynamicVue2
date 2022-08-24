<template>

    <section  >
        <el-cascader v-if="!isTextMode" ref="cascader" v-model.trim="val" :disabled="isDisabled" :options="item.options||[]" v-bind="bindOptions" />
        <el-cascader v-else class="form-input-text form-cascader-text  " v-model.trim="val"  :options="item.options" v-bind="bindOptions" />

        <!-- <div v-else :style="item.textStyle||{}" class="form-input-text">{{ textModeValue || '-' }}</div> -->
    </section>
</template>

<script>
import FormMixin from './mixin'
function initLeafItem(tree,childrenKey,leafKey){

  tree=tree.map((item)=>{
    if(item[childrenKey]?.length<1){
      item[leafKey]=true
      delete  item[childrenKey]
    }else{
        item[leafKey]=false
        item[childrenKey]  = initLeafItem(item[childrenKey],childrenKey,leafKey)
    }
    return item
  })

  return   tree
}
export default {
    name: 'FormCascader',
    mixins: [FormMixin],
    data() {
        return {
        }
    },
    mounted(){
        debugger
      if(typeof this.item.loadOptionsApi == 'function'){
           this.item.loadOptionsApi().then((data)=>{
           debugger  
           const childrenKey = this.item.props?.children||'children'
           const leafKey = this.item.props?.leaf||'leaf'

           data=initLeafItem(data,childrenKey,leafKey)
           this.$set(this.item,'options',data)
         })
      }
    },
    computed: {
        textModeValue() {
            return this.val.join(',')
        },
         val: {
      get () {
         
        return this.value
      },

      set (v) {
        debugger
        // console.log(`|${v}|`);
        this.$emit('input', v)
        this._valueLink(v);
        // 只有非子表单的情况下，才会冒泡上去数据变更
        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: this.$refs.cascader.getCheckedNodes()
        })
        }
      },
    }
}
</script>

<style scoped lang="css">
   .el-cascader {
        width: 100%;
    }
</style>

<style   lang="css">
  .form-cascader-text{
      pointer-events: none;
      cursor: text ;
  }
 .form-cascader-text .el-input  .el-input__inner{
    padding-left:0px;
    background-color: transparent;
    border: none;
    pointer-events: none;
    /* color: #C0C4CC; */
    cursor: text ;
  }

  .form-cascader-text .el-input  .el-input__suffix{
    display: none;
  }
</style>