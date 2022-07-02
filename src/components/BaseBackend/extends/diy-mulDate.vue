<template>
  <span>
    <el-col :span="11">
      <el-date-picker
        v-bind="$attrs"
        v-model="startDate"
        @change="(date) => changeDate(date, 'start')"
        :type="$attrs.dateType || 'date'"
        :placeholder="$attrs['start-placeholder'] || '开始日期'"
        :picker-options="{
          disabledDate(date) {
            return startDateOptions(date)
          }
        }"
        style="width: 100%"
      ></el-date-picker>
    </el-col>
    <el-col class="tc line" :span="2">-</el-col>
    <el-col :span="11">
      <el-date-picker
        v-bind="$attrs"
        v-model="endDate"
        @change="(date) => changeDate(date, 'end')"
        :type="$attrs.dateType || 'date'"
        :placeholder="$attrs['end-placeholder'] || '开始日期'"
        :picker-options="{
          disabledDate(date) {
            return endDateOptions(date)
          }
        }"
        style="width: 100%"
      ></el-date-picker>
    </el-col>
  </span>
</template>
<script>
export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: { type: Array, default: () => [] }
  },
  components: {},
  computed: {},
  data () {
    return {
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    startDateOptions (date, key) {
      if (this.endDate !== null) {
        return date.getTime() > new Date(this.endDate).getTime()
      } else {
        return false
      }
    },
    endDateOptions (date, key) {
      if (this.startDate !== null) {
        return date.getTime() < new Date(this.startDate).getTime()
      } else {
        return false
      }
    },
    changeDate (date, type) {
      if (this.startDate && this.endDate) {
        this.$emit('change', [this.startDate, this.endDate])
      }
    }
  },
  mounted () {},
  watch: {
    value: {
      immediate: true,
      handler (list) {
        if (list.length) {
          this.startDate = list[0]
          this.endDate = list[1]
        }
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
