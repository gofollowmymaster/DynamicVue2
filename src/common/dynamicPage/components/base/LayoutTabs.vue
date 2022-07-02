
<script>

export default {
  name: "LayoutTabs",
  props: {

  },
  data: function () {
    return {
      activeName:1
    }
  },

  components: {},
  mounted(){
    console.table('---slots------',this.$slots)
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
      },

     
  },
   render(createElement){
     debugger
        const subTTabs=this.$slots.default.map((item,index)=>{
          console.log('---slot-item----',item)
          return createElement('el-tab-pane',{
            on:{
            'tab-click':this.handleClick
          },props:{
            name:index+'',
            label:item.data?.attrs?.label||(index+''),
            ...(item.data?.attrs?.props||{})
          },
           attrs: {

           }
          },[item])
        })
        return  createElement('el-tabs',{props:this.$attrs,value:this.activeName},subTTabs)
      }
};
</script>
<style lang="less" scoped>
 
</style>
