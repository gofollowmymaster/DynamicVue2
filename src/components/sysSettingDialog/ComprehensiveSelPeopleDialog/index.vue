<template>
  <el-dialog :visible="visible" :title="title" @close="$emit('close')">
    <div>
      <el-radio-group v-model="radioType">
        <el-radio-button
          :label="item.value"
          v-for="(item, index) in realTabs"
          :key="index"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>
    </div>
    <div class="mt10 row">
      <el-input clearable v-model="keyword">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button>
      </el-input>
      <el-button class="ml10" size="small" @click="handleReset">重置</el-button>
    </div>
    <div class="mt10">
      <div v-if="searching" class="border">
        <div class="px20 h40px vertical bb">
          <el-checkbox
            v-model="isSearchAllCheck"
            @change="handleSearchCheckAllChange"
          >
            已选
          </el-checkbox>
        </div>
        <div :class="['scroll scroll-y', `h${height}px`]">
          <el-checkbox
            class="block px20 py5"
            v-for="(item, index) in searchList"
            :key="index"
            v-model="item.$checked"
            @change="(boolean) => handleSearchCheckboxChange(boolean, item)"
          >
            {{ item.$name }}
          </el-checkbox>
        </div>
      </div>
      <div class="between" v-else>
        <div
          :class="['border scroll scroll-x scroll-y w48', `h${height + 40}px`]"
        >
          <InnerOrgsTree
            ref="innerTreeRef"
            v-if="radioType === 'inner'"
            v-model="treeCheckInfo.inner"
            @change="treeCheckedChange"
          ></InnerOrgsTree>
          <OuterOrgsTree
            ref="outerTreeRef"
            v-if="radioType === 'outer'"
            v-model="treeCheckInfo.outer"
            @change="treeCheckedChange"
          ></OuterOrgsTree>
          <PosTree
            ref="posTreeRef"
            v-if="radioType === 'pos'"
            v-model="treeCheckInfo.pos"
            @change="treeCheckedChange"
          ></PosTree>
        </div>
        <div class="border w48">
          <div class="px20 h40px vertical bb">
            <el-checkbox v-model="isAllCheck" @change="handleCheckAllChange">
              已选
            </el-checkbox>
          </div>
          <div :class="['scroll scroll-y', `h${height}px`]">
            <el-checkbox-group
              v-model="checkedDataIdList"
              @change="handleCheckedDataChange"
            >
              <el-checkbox
                class="block px20 py5"
                v-for="(item, index) in checkedDataList"
                :key="index"
                :label="item.$id"
              >
                {{ item.$name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <footer slot="footer">
      <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </footer>
  </el-dialog>
</template>
<script>
import { defaultAxios } from '@/network/home'

import InnerOrgsTree from './InnerOrgsTree'
import OuterOrgsTree from './OuterOrgsTree'
import PosTree from './PosTree'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择组织/用户'
    },
    height: {
      type: Number,
      default: 300
    },
    tabs: {
      type: Array,
      default: () => []
    },
    tabFocus: {
      type: String,
      default: ''
    },
    limit: {
      type: Number || null,
      default: null
    },
    defaultCheckedList: {
      type: Array,
      default: () => []
    }
  },
  model: {
    event: 'change',
    prop: 'defaultCheckedList'
  },
  components: { InnerOrgsTree, OuterOrgsTree, PosTree },
  data () {
    return {
      keyword: '', // 搜索条件
      searching: false, // 正在搜索
      searchList: [], // 搜索的数据
      isSearchAllCheck: false, // (搜索数据)是否全选

      // 各个tab里tree的默认勾选项(即defaultChecked)
      treeCheckInfo: { inner: [], outer: [], pos: [] },

      checkedDataIdList: [], // 已经勾选数据的id数组
      isAllCheck: false, // (已勾选的数据)是否全选

      radioType: '', // 当前聚焦的tab
      // 全量tabs
      allTabs: [
        { label: '组织', value: 'inner' },
        { label: '组织', value: 'outer' },
        { label: '岗位', value: 'pos' }
      ]
    }
  },
  computed: {
    // 当前展示的tabs，根据全量tabs过滤
    realTabs () {
      const allTabsVal = this.allTabs.map((unit) => unit.value)
      return this.tabs.filter((unit) => allTabsVal.indexOf(unit.value) > -1)
    },
    // 已经勾选的数据
    checkedDataList: {
      get () {
        return this.defaultCheckedList
      },
      set (list) {
        this.$emit('change', list)
      }
    }
  },
  methods: {
    // 搜索
    async handleSearch () {
      this.searching = true
      const focusTab = this.radioType
      const options = {
        url: '',
        method: 'get',
        params: {
          keyword: this.keyword,
          pageNo: 1,
          pageSize: 100
        }
      }
      let list = []
      const checkedDataIdList = this.checkedDataIdList
      if (focusTab === 'inner') {
        const result = await defaultAxios({
          ...options,
          url: '/sys/dept/pageDeptInfo'
        })
        list = (result.data.list || []).map((unit) => ({
          ...unit,
          $checked: checkedDataIdList.indexOf(unit.id) > -1,
          $id: unit.id,
          $name: unit.deptName,
          $type: focusTab
        }))
      }
      if (focusTab === 'outer') {
        const result = await defaultAxios({
          ...options,
          url: '/sys/outside/pageDeptOutsideInfo'
        })
        list = (result.data.list || []).map((unit) => ({
          ...unit,
          $checked: checkedDataIdList.indexOf(unit.deptId) > -1,
          $id: unit.deptId,
          $name: unit.deptName,
          $type: focusTab
        }))
      }
      if (focusTab === 'pos') {
        const result = await defaultAxios({
          ...options,
          url: '/sys/post/pagePostInfo'
        })
        list = (result.data.list || []).map((unit) => ({
          ...unit,
          $checked: checkedDataIdList.indexOf(unit.id) > -1,
          $id: unit.id,
          $name: unit.postName,
          $type: focusTab
        }))
      }
      this.searchList = list
      const searchCheckedList = list.filter((unit) => unit.$checked)

      // 搜索数据是否全选
      if (searchCheckedList.length === list.length) {
        this.isSearchAllCheck = true
      } else {
        this.isSearchAllCheck = false
      }
    },
    handleReset () {
      this.keyword = ''
      this.searchList = []
      this.searching = false
    },
    // 搜索数据全选change事件
    handleSearchCheckAllChange (boolean) {},
    // 搜索数据的checkbox-change事件
    handleSearchCheckboxChange (boolean, item) {
      if (boolean) {
        // 勾选
        this.syncUpdateCheckedDataAdd(item)
        this.syncUpdateTabTreeAdd(item, item.$type)
      } else {
        // 取消勾选
        this.syncUpdateCheckedDataDel(item)
        this.syncUpdateTabTreeDel(item, item.$type)
      }
    },
    // treeNode的切换选中change事件
    treeCheckedChange (checkedList, data, checked) {
      // const checkedIds = checkedList.map((unit) => unit.$id)
      const gather = this.checkedDataList
      if (checked) {
        // 勾选
        gather.push(data)
        if (data.$type === 'person') {
          // 如果勾选的是user，还要将其他tab里tree的v-model值同步更新
          this.syncUpdateTabTreeAdd(data)
        }
        this.checkedDataList = gather
        this.isAllCheck = true
      } else {
        // 取消勾选
        this.checkedDataList = this.checkedDataList.filter((unit) => {
          if (unit.$type === data.$type && unit.$id === data.$id) {
            // 匹配删除的那一项，return false过滤掉
            if (data.$type === 'person') {
              // 如果删除的那一项是user，还要将其他tab里tree的v-model值同步更新
              this.syncUpdateTabTreeDel(data)
            }
            return false
          }
          return true
        })
        if (this.checkedDataList.length) {
          this.isAllCheck = true
        } else {
          this.isAllCheck = false
        }
      }
      this.checkedDataIdList = this.checkedDataList.map((unit) => unit.$id)
    },

    // 勾选数据的全选change事件
    handleCheckAllChange (boolean) {
      this.checkedDataList.forEach((unit) => {
        // tab里tree的v-model值同步更新
        this.syncUpdateTabTreeDel(unit)
        // treeNode取消选中
        this.syncTabTreeCheckedNode(unit, false)
      })
      this.checkedDataList = []
      this.checkedDataIdList = []
    },
    // 勾选数据的checkbox-change事件
    handleCheckedDataChange (idList) {
      this.checkedDataList = this.checkedDataList.filter((unit) => {
        if (idList.indexOf(unit.$id) > -1) {
          return true
        } else {
          // 匹配到取消勾选的那一项
          const data = unit
          if (data.$type === 'person') {
            this.syncUpdateTabTreeDel(data)
          }
          // treeNode取消选中
          this.syncTabTreeCheckedNode(data, false)
          return false
        }
      })
    },

    // 同步更新已选数据-新增一项
    syncUpdateCheckedDataAdd (data) {
      this.checkedDataList.push(data)
      this.checkedDataIdList = this.checkedDataList.map((unit) => unit.$id)
    },
    // 同步更新已选数据-删除一项
    syncUpdateCheckedDataDel (data) {
      this.checkedDataList = this.checkedDataList.filter(
        (unit) => unit.$id !== data.$id
      )
      this.checkedDataIdList = this.checkedDataList.map((unit) => unit.$id)
    },
    // 同步当前显示treeNode的选中/取消选中状态
    syncTabTreeCheckedNode (data, boolen) {
      const focusTab = this.radioType
      this.$refs[`${focusTab}TreeRef`].setChecked(data.$id, boolen)
    },
    // 同步更新tab里的tree-增加选中项
    syncUpdateTabTreeAdd (data, limitType = null) {
      for (const key in this.treeCheckInfo) {
        if (limitType) {
          // 限制了只更新对应类型的值
          if (key === limitType) {
            this.treeCheckInfo[key].push(data)
          }
        } else {
          // 全部更新
          this.treeCheckInfo[key].push(data)
        }
      }
    },
    // 同步更新tab里的tree-删除选中项
    syncUpdateTabTreeDel (data, limitType = null) {
      for (const key in this.treeCheckInfo) {
        if (limitType) {
          // 限制了只更新对应类型的值
          if (key === limitType) {
            this.treeCheckInfo[key] = this.treeCheckInfo[key].filter(
              (inner) => inner.$id !== data.$id
            )
          }
        } else {
          // 全部更新
          this.treeCheckInfo[key] = this.treeCheckInfo[key].filter(
            (inner) => inner.$id !== data.$id
          )
        }
      }
    },

    handleSubmit () {
      const limit = this.limit
      if (limit && this.checkedDataList < limit) {
        this.$message({ type: 'warning', messgae: `请至少选择${limit}项` })
        return
      }
      this.$emit('ok', this.checkedDataList)
    }
  },
  mounted () {},
  watch: {
    visible (boolean) {
      if (boolean) {
        this.radioType = this.tabFocus
        if (this.defaultCheckedList.length) {
          this.defaultCheckedList.forEach((unit) => {
            if (unit.$type === 'person') {
              this.syncUpdateTabTreeAdd(unit)
            } else {
              this.syncUpdateTabTreeAdd(unit, unit.$type)
            }
          })
          this.checkedDataIdList = this.checkedDataList.map((unit) => unit.$id)
          this.isAllCheck = true
        }
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
