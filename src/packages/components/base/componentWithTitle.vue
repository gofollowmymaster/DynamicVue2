<template>
  <div class="flex flex-direction   ">
      <span v-if="title&&!$slots.header" class="text-size16 pl12 border-l mb12">{{title}}</span>
      <slot name="header"></slot>
      <component v-if="!$slots.body" class=" flex1"  :is="bodyComponent" v-bind="bindOptions"/>
      <slot  name="body"></slot>
  </div>
</template>
<script>

export default {
  name: 'componentWithTitle',
  components: {},
  props: {
    title:String,
    bodyComponent:{
      type:String,
      default:''
    },
  },
  data () {
    return {}
  },
  computed:{
    bindOptions(){
      const obj={...this.$attrs}
      delete obj.title
      delete obj.bodyComponent

      return  obj
    }
  },

  mounted () {
  },
  methods: {}
}
</script>

<style lang="css" scoped>
 .border-l{
   border-left: solid 4px var(--main-color);
 }
</style>
