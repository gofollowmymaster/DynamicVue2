<template>
  <main
    :style="item.style || {}"
    :class="`form-unqiue-${item.key} ${getTextModel ? 'hz-text-box' : 'hz-untext-box'}`"
    class="form-input-box form-item-box"
  >
    <div class="flex">
      <el-input
        :value="val"
        :placeholder="getPlaceholder(item)"
        :disabled="getDisabled"
        type="text"
        v-bind="bindOptions"
        v-if="!getTextModel"
      >
      </el-input>
      <div v-else :style="item.textStyle || {}" class="form-input-text">
        {{ val || '-' }}
      </div>
      <el-button
        v-if="!getTextModel"
        @click="selectHandleer"
        size="small"
        :disabled="getDisabled"
        >选择</el-button
      >
    </div>  

    <tableSelector
      v-if="!getTextModel"
      title="选择固定资产"
      :visible="visible"
      :fields="fields"
      :optionsProps="pageOptions"
      width="50%"
      :selected="valueObj"  
      @change="change"
    >
    </tableSelector>
  </main>
</template>
<script>
import { appendToPreset } from '@/common/dynamicPage/utils/tool'
import FormMixin from '@/common/dynamicPage/components/formItems/mixin'
import { buildDynamicSelectOption } from '@/network/global'
import { oldtreeListApi } from '@/network/oldtree.js'
const fields = [
  {
    key: 'keyWord',
    type: 'FormInput',
    label: '关键字',
    searchOption: {
      wraperProperties: {
        class: ['grid-col-8'],
      },
 
    }
  },
  {
    key: 'treeNumber',
    type: 'FormInput',
    label: '固定资产编号',
    tableOption: {}
  },
  // {
  //   key: 'treeName',
  //   type: 'FormInput',
  //   label: '资产类型名称',
  //   tableOption: {
  //     sort: 2
  //   }
  // },

  {
    key: 'famousWood',
    type: 'FormSelect',
    label: '等级',
    options: buildDynamicSelectOption('tree_manage_famous_wood'),

    tableOption: {
      sort: 6
    },
    formOption: {
      rules: ['required']
    }
  },
  {
    key: 'age',
    type: 'FormDecimalNumber',
    label: '使用年数（年）',
    tableOption: {
      sort: 5
    },
    formOption: {
      properties: {
        required: '[3,2].includes(${famousWood})'
      }
    }
  },

  {
    key: 'districtName',
    type: 'FormAdministrativeSelector',
    label: '行政区划',
    searchOption: {
      wraperProperties: {
        class: ['grid-col-8'],
        'label-width': '90px',
      },
        key:'district'

    },
    tableOption: {
      width: 140,
      sort: 9,
      sortable: false,
      template (row) {
        return row.admName
      }
    }
  },

  {
    label: '详细地址',
    key: 'address',
    type: 'FormSelectPoint',
    tableOption: {}
  }
]
export default {
  name: 'FormOldtreeSelector',
  mixins: [FormMixin],

  props: {
    options: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  data () {
    return {
      visible: { value: false },
      fields,
      pageOptions: {
        searchOption: {
          showTestTool: false,
          searchClasses: ['grid-col-8'],
          properties: {
            'label-width': '70px',
            'label-position': 'right'
          }
        },
        tableOption: {
          loadListApi: oldtreeListApi
        }
      }
    }
  },
  computed: {
    
    valueArr () {
      if (this.value instanceof Array) return this.value.filter(item=>item)
      return []
    },
      valueObj () {
      if (this.value instanceof Array) return this.value.reduce((prev,next)=>{
        prev[next.id]=next
        return prev
      },{})
      return {}
    },
    val: {
      get () {
        //  let value = this.value||[]
        return this.valueArr.map((value) => value.treeName||value.name).join(',')
      },
      set (value) {
        
        this.$emit('input', value)
        this._valueLink(value)
        // 更新数据
        this.statusChangeFn.valueUpdateEvent({
          [this.item.key]: value
        })
      }
    }
  },
  methods: {
    selectHandleer () {
      this.visible.value = true
    },
    change(list){
      this.val=Object.values(list)
    }
    // saveAdministractive (list) {
    //   this.val = list
    //   this.visible.value = false
    // }
  },
  watch: {}
}
</script>
<style scoped lang="css"></style>
