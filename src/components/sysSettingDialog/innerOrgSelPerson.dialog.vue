<template>
  <!-- 内部组织选人 dialog -->
  <TreeTableSelectPersonDialog
    :visible="visible"
    :title="title"
    :type="type"
    :lazy="true"
    :treeProps="{
      label: 'deptName',
      children: 'children',
      isLeaf: 'leaf'
    }"
    treeNodeKey="id"
    :treeCurSelectedNode="DutierDialogInfo.treeCurSelectedNode"
    :defaultCheckedList="defaultCheckedList"
    :tableItems="[
      {
        key: 'name',
        title: '姓名'
      },
      {
        key: 'phoneNum',
        title: '手机号'
      },
      {
        key: 'postNames',
        title: '岗位'
      }
    ]"
    @loadSearchData="loadDutierSearchData"
    @asyncLoadTreeData="asyncLoadDutierTreeData"
    @ok="(list, treeNode) => $emit('ok', list, treeNode)"
    @cancel="$emit('close')"
  ></TreeTableSelectPersonDialog>
</template>

<script>
import TreeTableSelectPersonDialog from '@/components/source/TreeTableSelectPersonDialog'

import {
  GlobalAsyncLoadTreeSelectTreeData,
  GlobalLoadTreeSelectSearchData
} from 'network/home'

export default {
  components: {
    TreeTableSelectPersonDialog
  },
  props: {
    title: {
      type: String,
      default: '选择人员'
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
      DutierDialogInfo: {
        treeRootCode: '0',
        treeCurSelectedNode: null
      }
    }
  },
  methods: {
    loadDutierSearchData (params, asyncCheckNode) {
      GlobalLoadTreeSelectSearchData({
        url: '/sys/user/pageUserInfo',
        method: 'get',
        params: {
          deptId: params.id,
          keyword: params.keyword,
          pageNo: params.pageNo,
          pageSize: params.pageSize
        }
      }).then((res) => {
        const list = (res?.data?.list ?? []).map((unit) => ({
          ...unit,
          name: unit.userName
        }))
        // 必须调用，否则异步加载的节点不会处于选中状态
        asyncCheckNode(list, {
          pageNo: res?.data?.currPage ?? 1,
          pageSize: res?.data?.pageSize ?? 10,
          total: res?.data?.totalCount ?? 0
        })
      })
    },
    asyncLoadDutierTreeData (node, resolve, asyncCheckNode) {
      // 注意：异步加载时，需要先处理node.level===0的第一级数据，再去处理下级node.data的异步加载
      GlobalAsyncLoadTreeSelectTreeData({
        url: '/sys/dept/listDeptTreeInfo',
        method: 'get',
        params: {
          parentId:
            node.level === 0 ? this.DutierDialogInfo.treeRootCode : node.data.id
        }
      }).then((res) => {
        const list = (res?.data ?? []).map((unit) => ({
          ...unit,
          name: unit.userName,
          leaf: !unit.haveChildNode
        }))
        resolve(list)
        if (list.length && !this.DutierDialogInfo.treeCurSelectedNode) {
          this.DutierDialogInfo.treeCurSelectedNode = list[0]
          asyncCheckNode(list[0])
        }
      })
    }
  }
}
</script>

<style scoped></style>
