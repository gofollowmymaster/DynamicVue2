

<template>
    <components  :is="layoutComp.name"    v-bind="layoutComp.properties" >
      <template  v-for="section in bodyShow">
          <component :key="section.key||(section.component+section.name)" :is="section.component"  :label="section.label"  
          :data="section.name=='@object@'?data:data[section.name]"  
          v-bind="section.props"  :props="section.props">
              <slot></slot>
          </component> 
      </template>

    </components>
</template>
<script>

export default {
  name:'DynamicSection',
  props: {
    data:{},
 
 
    body: {
      type: Array,
      default: function () {
        return [];
      },
    },
    
    layout:{
      type:[String,Object],
      default:'LayoutGrid'
    },
 
  },
  
  computed: {
    layoutComp(){
      if(typeof this.layout ==='string'){
        return {name:this.layout,properties:{}}
      }
      return this.layout
    },
    bodyShow(){
      return this.body.filter(item=>!item.hidden)
    }
  },
  mounted(){
  },
  components: { },
  methods: {
 
      
  },
};
</script>
<style lang="css" scoped>
 
</style>


