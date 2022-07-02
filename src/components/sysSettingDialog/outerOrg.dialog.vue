<template>
  <!-- 外部组织 dialog -->
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
      }
    ]"
    :visible="visible"
    @loadSearchData="loadParentOrgSearchData"
    @asyncLoadTreeData="asyncLoadParentOrgTreeData"
    @ok="(list) => $emit('ok', list)"
    @cancel="$emit('close')"
  ></TreeSelect>
</template>

<script>
import TreeSelect from '@/components/source/TreeSelectDialog'

import {
  GlobalAsyncLoadTreeSelectTreeData,
  GlobalLoadTreeSelectSearchData
} from 'network/home'

export default {
  components: {
    TreeSelect
  },
  props: {
    title: {
      type: String,
      default: '选择外部组织'
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
      outerOrgDialogInfo: {
        treeRootCode: '0'
      }
    }
  },
  methods: {
    loadParentOrgSearchData (params, asyncCheckNode) {
      GlobalLoadTreeSelectSearchData({
        url: '/sys/outside/pageDeptOutsideInfo',
        method: 'get',
        params: {
          keyword: params.keyword,
          pageNo: params.pageNo,
          pageSize: params.pageSize
        }
      }).then((res) => {
        const list = (res?.data?.list ?? []).map((unit) => ({
          ...unit,
          name: unit.deptName,
          id: unit.deptId
        }))
        // 必须调用，否则异步加载的节点不会处于选中状态
        asyncCheckNode(list, {
          pageNo: res?.data?.currPage ?? 1,
          pageSize: res?.data?.pageSize ?? 10,
          total: res?.data?.totalCount ?? 0
        })
      })
    },
    asyncLoadParentOrgTreeData (node, resolve, asyncCheckNode) {
      // 注意：异步加载时，需要先处理node.level===0的第一级数据，再去处理下级node.data的异步加载
      GlobalAsyncLoadTreeSelectTreeData({
        url: '/sys/outside/listDeptOutsideTreeInfo',
        method: 'get',
        params: {
          parentId:
            node.level === 0
              ? this.outerOrgDialogInfo.treeRootCode
              : node.data.id
        }
      }).then((res) => {
        const list = (res?.data ?? []).map((unit) => ({
          ...unit,
          name: unit.deptName,
          id: unit.deptId,
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
