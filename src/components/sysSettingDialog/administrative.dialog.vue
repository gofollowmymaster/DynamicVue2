<template>
  <!-- 行政区划 dialog -->
  <TreeSelect
    :title="title"
    :lazy="true"
    :type="type"
    :treeProps="{
      label: 'name',
      children: 'children',
      isLeaf: 'leaf'
    }"
    treeNodeKey="id"
    :defaultCheckedList="defaultCheckedList"
    :tableItems="[
      {
        key: 'name',
        title: '名称'
      },
      {
        key: 'admCode',
        title: '编码'
      }
    ]"
    :visible="visible"
    @loadSearchData="loadParentAdministractiveSearchData"
    @asyncLoadTreeData="asyncLoadParentAdministractiveTreeData"
    @ok="(list) => $emit('ok', list)"
    @cancel="$emit('close')"
  ></TreeSelect>
</template>

<script>
import TreeSelect from '@/components/source/TreeSelectDialog'
import {
  GlobalAsyncLoadTreeSelectTreeData,
  GlobalLoadTreeSelectSearchData
} from '@/network/home'
const treeRootCode = window._config.regionCode

export default {
  components: {
    TreeSelect
  },
  props: {
    title: {
      type: String,
      default: '选择行政区划'
    },
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'radio'
    },
    defaultCheckedList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      ParentAdministractiveDialogInfo: {
        treeRootCode
      }
    }
  },
  methods: {
    loadParentAdministractiveSearchData (params, asyncCheckNode) {
      GlobalLoadTreeSelectSearchData({
        url: '/sys/adm/pageAdmInfo',
        method: 'get',
        params: {
          keyword: params.keyword,
          pageNo: params.pageNo,
          pageSize: params.pageSize
        }
      }).then((res) => {
        const list = (res?.data?.list ?? []).map((unit) => ({
          ...unit,
          name: unit.admName
        }))
        // 必须调用，否则异步加载的节点不会处于选中状态
        asyncCheckNode(list, {
          pageNo: res?.data?.currPage ?? 1,
          pageSize: res?.data?.pageSize ?? 10,
          total: res?.data?.totalCount ?? 0
        })
      })
    },
    asyncLoadParentAdministractiveTreeData (node, resolve, asyncCheckNode) {
      debugger
      // 注意：异步加载时，需要先处理node.level===0的第一级数据，再去处理下级node.data的异步加载
      GlobalAsyncLoadTreeSelectTreeData({
        url: '/sys/adm/listAdmTreeInfo',
        method: 'get',
        params: {
          parentAdmCode:
            node.level === 0
              ? this.ParentAdministractiveDialogInfo.treeRootCode
              : node.data.admCode
        }
      }).then((res) => {
        const list = (res?.data ?? []).map((unit) => ({
          ...unit,
          name: unit.admName,
          leaf: !unit.haveChildNode
        }))
        resolve(list)
        asyncCheckNode(list) // 必须调用，否则异步加载的节点不会处于选中状态
      })
    }
  }
}
</script>

<style scoped></style>
