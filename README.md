 
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">Dynamic-Vue2</h1>
<h4 align="center">只需要配置JSON数据，就可以实现功能健全的后台管理页面</h4>
 

## 初衷


  管理后台的前端页面开发过程中，大量的时间投入到高度类似的页面功能中，在相似的页面中复制-粘贴-修改倍感疲惫。如何高效的完成类似页面的开发，解放双手，做有意义的事-摸鱼，正是Dynamic-Vue将要解决的问题。如果有这样的*理想*,不妨继续往下看

### 欢迎Star 
## 简介
- 基于 vue element-ui 的JSON配置式页面生成组件库。可以减少页面开发工作量，极大提升效率。
- 当前版本基于Vue2.6  elment-Ui


## 功能
- JSON配置动态表单
- JSON配置动态表格
- JSON配置表格表单页面
- 便捷的支持扩展表单、表格组件
- 配置便捷而丰富


## 快速上手

### 安装
``` js
npm install dyvue2
```

### 引入

``` js
import dynamicVue2  from 'dyvue2'
import 'dyvue2/lib/dyvue2.css'
```

``` html
<template>
  <DynamicCurdPage
    :entityLabel="entityLabel"
    :fields="fields"
    :apiPromises="apiPromises"
  ></DynamicCurdPage>
</template>
<script>

const entityLabel = '****'
const fields  =[
 { key: "keyWord", type: "FormInput", label: "关键字", searchable: true },
  {key:'id'},
  {
    key: "sName",
    type: "FormInput",
    label: "姓名",

    formOption: {
      properties:{
        disabled:true
      }
    },
    tableOption: {
      sort:2
    },
  },
  {
    key: "latinSciName",
    type: "FormInput",
    label: "外号",
    tableOption:true,
    formOption: {
      properties:{
        disabled:true
      }
    },
  },
  {
    key: "originalNumber",
    type: "FormInput",
    label: "编号",   
    tableOption:true,
    formOption: true,
  }, 
  {
    key: "investNumber",
    type: "FormNumber",
    label: "顺序号",
    tableOption:true,
    formOption:true
  },
]

export default {
  data () {
    return {
      // form字段
      fields,
      entityLabel,
       // 页面配置
      apiPromises:{
        create:tablkeinfoSaveApi,
        bulkdelete:tablkeinfoDeleteApi,
        list:tablkeinfoListApi,
        detail:tablkeinfoDetailApi,
        update:tablkeinfoUpdateApi
      },
      // 页面配置
    //   pageOptions: {
    //   },
      }
    }
  }

</script>
<style lang="css" scoped></style>

```
 
 ## 文档&演示
 文档 [http://alerting.gitee.io/dy-vue2/](http://alerting.gitee.io/dy-vue2/)
 <!-- 演示 [http://alerting.gitee.io/dy-vue2/](http://alerting.gitee.io/dy-vue2/) -->

