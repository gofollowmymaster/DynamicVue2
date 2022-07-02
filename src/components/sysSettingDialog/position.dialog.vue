<template>
  <!-- 岗位 dialog -->
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
    @loadSearchData="loadParentPosSearchData"
    @asyncLoadTreeData="asyncLoadParentPosTreeData"
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
      default: '选择岗位'
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
      ParentPosDialogInfo: {
        treeRootCode: '0'
      }
    }
  },
  methods: {
    loadParentPosSearchData (params, asyncCheckNode) {
      GlobalLoadTreeSelectSearchData({
        url: '/sys/post/pagePostInfo',
        method: 'get',
        params: {
          keyword: params.keyword,
          pageNo: params.pageNo,
          pageSize: params.pageSize
        }
      }).then((res) => {
        const list = (res?.data?.list ?? []).map((unit) => ({
          ...unit,
          name: unit.postName
        }))
        // 必须调用，否则异步加载的节点不会处于选中状态
        asyncCheckNode(list, {
          pageNo: res?.data?.currPage ?? 1,
          pageSize: res?.data?.pageSize ?? 10,
          total: res?.data?.totalCount ?? 0
        })
      })
    },
    asyncLoadParentPosTreeData (node, resolve, asyncCheckNode) {
      // 注意：异步加载时，需要先处理node.level===0的第一级数据，再去处理下级node.data的异步加载
      GlobalAsyncLoadTreeSelectTreeData({
        url: '/sys/post/listPostTreeInfo',
        method: 'get',
        params: {
          parentId:
            node.level === 0
              ? this.ParentPosDialogInfo.treeRootCode
              : node.data.id
        }
      }).then((res) => {
        const list = (res?.data ?? []).map((unit) => ({
          ...unit,
          name: unit.postName,
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
