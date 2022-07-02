<template>
  <!-- 角色 dialog -->
  <TableSelectPersonDialog
    :visible="visible"
    :title="title"
    :type="type"
    :defaultCheckedList="defaultCheckedList"
    :tableItems="[
      {
        key: 'roleName',
        title: '名称'
      },
      {
        key: 'remark',
        title: '备注'
      }
    ]"
    @loadSearchData="loadRolesSearchData"
    @ok="(list) => $emit('ok', list)"
    @cancel="$emit('close')"
  ></TableSelectPersonDialog>
</template>

<script>
import TableSelectPersonDialog from '@/components/source/TableSelectPersonDialog'

import { GlobalLoadTreeSelectSearchData } from 'network/home'

export default {
  components: { TableSelectPersonDialog },
  props: {
    title: {
      type: String,
      default: '选择角色'
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
    return {}
  },
  methods: {
    loadRolesSearchData (params, asyncCheckNode) {
      GlobalLoadTreeSelectSearchData({
        url: '/sys/role/pagePostInfo',
        method: 'get',
        params: {
          ...params,
          keyword: params.keyword,
          pageNo: params.pageNo,
          pageSize: params.pageSize
        }
      }).then((res) => {
        const list = res?.data?.list ?? []
        // 必须调用，否则异步加载的节点不会处于选中状态
        asyncCheckNode(list, {
          pageNo: res?.data?.currPage ?? 1,
          pageSize: res?.data?.pageSize ?? 10,
          total: res?.data?.totalCount ?? 0
        })
      })
    }
  }
}
</script>

<style scoped></style>
