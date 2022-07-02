<template>
  <el-tree
    ref="treeRef"
    :highlight-current="true"
    :data="treeData"
    :lazy="lazy"
    :accordion="accordion"
    :nodeKey="treeNodeKey"
    :props="treeProps"
    :load="lazyLoadTreeNode"
    :show-checkbox="true"
    :check-strictly="checkStrictly"
    :expand-on-click-node="true"
    :default-expand-all="defaultExpandAll"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys"
    @check-change="treeCheckChange"
  >
  </el-tree>
</template>

<script>
import {
  GlobalAsyncLoadTreeSelectTreeData,
  SysUserPageUserInfo
} from 'network/home'
export default {
  props: {
    lazy: {
      // 懒加载
      type: Boolean,
      default: true
    },
    accordion: {
      // 手风琴
      type: Boolean,
      default: true
    },
    treeNodeKey: { type: String, default: '$id' },
    treeProps: {
      type: Object,
      default () {
        return {
          label: '$name',
          children: 'children',
          isLeaf: 'leaf'
        }
      }
    },
    checkStrictly: {
      // 父子节点是否不关联,true表是不关联
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      // 默认展开all
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: {
      // 默认展开的key
      type: Array,
      default () {
        return []
      }
    },

    // 默认选中key
    defaultCheckedList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  model: {
    event: 'change',
    prop: 'defaultCheckedList'
  },
  components: {},
  computed: {
    defaultCheckedKeys () {
      const nodeKey = this.treeNodeKey
      return this.defaultCheckedList.map((unit) => unit[nodeKey])
    }
  },
  data () {
    return {
      treeData: [],
      treeCheckedNodes: [],
      orgInfo: {
        treeRootCode: '0'
      }
    }
  },
  methods: {
    treeCheckChange (data, checked, indeterminate) {
      const checkedNodes = this.$refs.treeRef.getCheckedNodes()
      this.$emit('change', checkedNodes, data, checked)
    },
    async lazyLoadTreeNode (node, resolve) {
      // 注意：异步加载时，需要先处理node.level===0的第一级数据，再去处理下级node.data的异步加载
      if (node.level === 0) {
        const res = await GlobalAsyncLoadTreeSelectTreeData({
          url: '/sys/outside/listDeptOutsideTreeInfo',
          method: 'get',
          params: {
            parentId: this.orgInfo.treeRootCode
          }
        })
        const list = (res?.data ?? []).map((unit) => ({
          ...unit,
          leaf: !unit.haveChildNode,
          id: unit.deptId,
          name: unit.deptName,
          $id: unit.deptId,
          $name: unit.deptName,
          $type: 'outer'
        }))
        resolve(list)
      } else {
        const orgRes = await GlobalAsyncLoadTreeSelectTreeData({
          url: '/sys/outside/listDeptOutsideTreeInfo',
          method: 'get',
          params: {
            parentId: node.data.id
          }
        })
        const orgList = (orgRes.data || []).map((unit) => ({
          ...unit,
          leaf: !unit.haveChildNode,
          id: unit.deptId,
          name: unit.deptName,
          $id: unit.deptId,
          $name: unit.deptName,
          $type: 'outer'
        }))
        const userRes = await SysUserPageUserInfo({
          method: 'get',
          params: {
            pageNo: 1,
            pageSize: 100,
            deptId: node.data.id
          }
        })
        const userList = (userRes.data.list || []).map((unit) => ({
          ...unit,
          leaf: true,
          $id: unit.id,
          $name: unit.userName,
          $type: 'person'
        }))
        resolve([...orgList, ...userList])
      }
    },
    // 以下方法暴露给外部使用，参数同element-ui
    setChecked (key, checked, deep = false) {
      this.$refs.treeRef.setChecked(key, checked, deep)
    }
  },
  mounted () {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
