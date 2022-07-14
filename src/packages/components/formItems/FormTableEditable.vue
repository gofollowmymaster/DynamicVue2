<template>
  <section    class=" full-width" >
     <TableEditable
        class="table-wraper "
        :data="val"
        :table="item.tableOption"
        :columns="item.fields"
        :apiPromise="item.apiPromise"
        :pagination="item.pagination"
        :isTextMode="getTextModel"
        size="small"
      ></TableEditable>
      
  </section>
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

<style scoped lang="css">
 
</style>
