<template>
  <div
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-img-box' : ''}`"
    class="form-input-box form-item-box full-width"
  >
     <TableEditable
        class="table-wraper "
        :data="val"
        :table="item.tableOption"
        :columns="item.fields"
        :apiPromise="item.apiPromise"
        :pagination="item.pagination"
      ></TableEditable>
      
  </div>
</template>

<script>
import FormMixin from "./mixin";
 
export default {
  name: "FormTableEditable",
  mixins: [FormMixin],
   
  data() {
    return {
 
    };
  },

  watch: {
    
  },
  computed: {
  
    val: {
      get() {
        return this.value || [];
      },
      set(tableList) {
        this.$emit("input", tableList);

        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: tableList,
        });
      },
    },
 
  },
  mounted() {},
  methods: {
    resetFields() {
      localStorage.removeItem(this.localTableName);
      this.$refs.dynamiCurd && this.$refs.dynamiCurd.refresh();
    },
    
  },
};
</script>

<style scoped lang="less">
.form-input-box /deep/ .el-input {
  position: relative;
  width: 100%;
}
</style>
