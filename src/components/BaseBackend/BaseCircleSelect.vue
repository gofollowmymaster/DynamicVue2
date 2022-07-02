<template>
  <div class="row relative">
    <el-select
      :disabled="disabled"
      class="w150px"
      v-model="selected.circle"
      @change="changeCircle"
      placeholder="请选择"
    >
      <el-option label="请选择" value=""> </el-option>
      <el-option label="一次性周期" :value="1"> </el-option>
      <el-option label="周期性任务" :value="2"> </el-option>
    </el-select>
    <div class="ml10">
      <!-- 一次性周期 -->
      <el-select
        :disabled="disabled"
        class="w150px"
        v-if="selected.circle === 1"
        v-model="selected.period"
        @change="changePeriod"
        placeholder="请选择"
      >
        <el-option label="请选择" value=""> </el-option>
        <el-option label="天" :value="1"> </el-option>
        <el-option label="时间范围" :value="6"> </el-option>
      </el-select>
      <!-- 周期性任务 -->
      <el-select
        :disabled="disabled"
        class="w100px"
        v-else
        v-model="selected.period"
        @change="changePeriod"
        placeholder="请选择"
      >
        <el-option label="请选择" value=""> </el-option>
        <el-option label="天" :value="1"> </el-option>
        <el-option label="周" :value="2"> </el-option>
        <el-option label="月" :value="3"> </el-option>
        <el-option label="季" :value="4"> </el-option>
        <el-option label="年" :value="5"> </el-option>
      </el-select>
    </div>

    <!-- 时间范围 -->
    <div class="realative ml10">
      <el-date-picker
        :disabled="disabled"
        v-if="selected.circle == 1 && selected.period === 1"
        v-model="selected.singleDate"
        type="date"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-date-picker
        :disabled="disabled"
        class="w100px"
        v-else
        v-model="selected.rangeDate"
        type="daterange"
        :picker-options="pickerOptions"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        placeholder="选择起始日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
    </div>

    <!-- 按天、周、月... -->
    <div class="ml10">
      <!-- 天 -->
      <span v-if="selected.period === 1"> </span>
      <!-- 周 -->
      <span v-if="selected.period === 2">
        <span>每周</span>
        <el-select
          :disabled="disabled"
          class="ml5 w100px"
          v-model="selected.day"
          placeholder="请选择"
        >
          <el-option label="请选择" value=""> </el-option>
          <el-option
            v-for="item in dayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span class="ml5">执行</span>
      </span>
      <!-- 月 -->
      <span v-if="selected.period === 3">
        <span>每月</span>
        <el-select
          :disabled="disabled"
          class="ml5 w100px"
          v-model="selected.date"
          placeholder="请选择"
        >
          <el-option label="请选择" value=""> </el-option>
          <el-option
            v-for="item in dateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span class="ml5">执行</span>
      </span>
      <!-- 季 -->
      <span v-if="selected.period === 4">
        <span>每季度</span>
        <el-select
          :disabled="disabled"
          class="ml5 w150px"
          v-model="selected.quarterMonth"
          placeholder="请选择"
        >
          <el-option label="请选择" value=""> </el-option>
          <el-option label="第1个月" :value="1"> </el-option>
          <el-option label="第2个月" :value="2"> </el-option>
          <el-option label="第3个月" :value="3"> </el-option>
          <el-option label="第4个月" :value="4"> </el-option>
        </el-select>
        <el-select
          :disabled="disabled"
          class="ml5 w100px"
          v-model="selected.date"
          placeholder="请选择"
        >
          <el-option label="请选择" value=""> </el-option>
          <el-option
            v-for="item in dateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span class="ml5">日执行</span>
      </span>
      <!-- 年 -->
      <span v-if="selected.period === 5">
        <span>每年</span>
        <el-select
          :disabled="disabled"
          class="ml5 w100px"
          v-model="selected.month"
          placeholder="请选择"
        >
          <el-option label="请选择" value=""> </el-option>
          <el-option
            v-for="item in monthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          :disabled="disabled"
          class="ml5 w100px"
          v-model="selected.date"
          placeholder="请选择"
        >
          <el-option label="请选择" value=""> </el-option>
          <el-option
            v-for="item in dateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span class="ml5">日执行</span>
      </span>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
const dayOptions = []
const monthOptions = []
const dateOptions = []
for (let i = 1; i <= 7; i++) {
  dayOptions.push({ label: `周${i}`, value: i })
}
for (let i = 1; i <= 12; i++) {
  monthOptions.push({ label: `${i}月`, value: i })
}
for (let i = 1; i <= 31; i++) {
  dateOptions.push({ label: `${i}号`, value: i })
}
export default {
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        circle: '', // 一次性周期、周期性任务
        period: '', // 天、周、季、月、年
        singleDate: '', // 单天
        rangeDate: [], // 时间范围
        day: '', // 周1、2、3、4...7
        date: '', // 1、2、3...31号
        quarterMonth: '', // 每个季度的x月
        month: '' // 1、2、3...12月
      })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selected () {
      return this.data
    }
  },
  data () {
    return {
      dayOptions,
      monthOptions,
      dateOptions,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    changeCircle (val) {
      this.$emit('change', {
        circle: val, // 一次性周期、周期性任务
        period: '', // 天、周、季、月、年
        singleDate: '', // 单天
        rangeDate: [], // 时间范围
        day: '', // 周1、2、3、4...7
        date: '', // 1、2、3...31号
        quarterMonth: '', // 每个季度的x月
        month: '' // 1、2、3...12月
      })
    },
    changePeriod (val) {
      const circle = this.data.circle
      this.$emit('change', {
        circle: circle, // 一次性周期、周期性任务
        period: val, // 天、周、季、月、年
        singleDate: '', // 单天
        rangeDate: [], // 时间范围
        day: '', // 周1、2、3、4...7
        date: '', // 1、2、3...31号
        quarterMonth: '', // 每个季度的x月
        month: '' // 1、2、3...12月
      })
    }
  },
  watch: {
    data: {
      handler (newVal, oldVal) {
        console.log('watch===', newVal)
        return newVal
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped></style>
