

import { hasValue } from '../../utils/tool'
export default {
    props: {
        properties: {
            type: Object,
            default: () => ({}),
        },  
        'cancel-button-text':{
            type:String,
            default:'不用了'
          },
          'confirm-button-text':{
            type:String,
            default:'是的'
          },
          'confirm-button-type':{
            type:String,
            default:'primary'
          },
          'cancel-button-type':{
            type:String,
            default:'text'
          },
    },
   
    computed: {
        // 扩展属性，直接将属性配置，传到表单组件内部（即 Element UI 上）
        // 忽略属性【key、size】
        bindOptions() {
            let obj = Object.assign({}, this.properties);
           
            obj={...obj,...obj.properties}
 
            delete obj.component;
            delete obj.properties;

            return obj;
        },

    },
    mounted() {
        //todo 初始化时候触发valueLink  （数据第一次加载时触发不是表单渲染出来触发）
        // this._valueLink&&this._valueLink(this.val);
    },
    methods: {
       
    },
};
