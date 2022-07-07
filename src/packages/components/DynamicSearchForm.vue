<template>
  <main class="flex relative search-container">
    <DynamicFormContent :formItemList="formFields" ref="searchOption" @formDataUpdated="change"
      v-bind="options"  :formProperties="options.properties"  :data="data" >
      <template  #actionBtnSlot>
        <section class="  "  >
          <el-button class="lh10" type="primary" size="small" @click="submit" v-if="options.trigger=='click'"   icon="el-icon-search">{{options.searchLabel||'搜索'}}</el-button>
          <el-button class="lh10" @click="reset" size="small" v-if="options.resetable" icon="el-icon-refresh" >重置</el-button>
        </section>
      </template>
    </DynamicFormContent>
      <el-button @click="switchSearchBar" class="ml12 align-self-start "  type="text" size="small"   v-if="options.mainNum<fields[0].children.length"  >高级筛选
        <i :class="[isExpand?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
      </el-button>
  </main>
</template>
<script>
import { deepCopy, loadPresetConfig } from '../utils/tool'

export default {
  name: 'DymamicSearchForm',
  props: {
    data: {
      type: [Object],
      default () {
        return {}
      }
    },
    fields: {
      type: Array,
      default: function () {
        return []
      }
    },
    options: {
      type: Object,
      default: function () {
        return loadPresetConfig('searchOption')
      }
    }
  },
  data: function () {
    return {
      isExpand: false
    }
  },
  computed: {
    formFields () {
      const fieldsClone = deepCopy(this.fields)
      if (!this.isExpand) {
        const mainNum = this.options.mainNum || 5
        if (fieldsClone[0].children.length >= mainNum) {
          fieldsClone[0].children.splice(mainNum)
        }
      }
      fieldsClone[0].children.push({
        type: 'slot',
        wrapertype: 'div',
        key: 'actionBtnSlot',
        label: '',
        wraperProperties: {
          class: this.isExpand ? ['grid-col-24'] : this.options.searchClasses,
          style: { 'margin-left': this.isExpand ? (this.options.properties['label-width'] || '100px') : '12px' }
        }
      })
      return fieldsClone
    }

  },
  components: {},
  mounted () {

  },
  methods: {
    switchSearchBar () {
      debugger
      this.isExpand = !this.isExpand
    },
    change () {
      if (this.options.trigger == 'change') {
        this.$nextTick(() => {
          this.submit()
        })
      }
    },
    submit () {
      const data = this.$refs.searchOption.getData()
      delete data.actionBtnSlot
      this.$emit('search', data)
    },
    reset () {
      this.$refs.searchOption.resetFields()
      const data = this.$refs.searchOption.getData()
      delete data.actionBtnSlot
      this.$emit('search', data)
    }
  }
}
</script>
<style lang="css" scoped>
 .search-container {
  --layout-row-gap:24px;
  --layout-gap:4px;
}
.align-self-start{
  align-self: flex-start;
}
</style>
