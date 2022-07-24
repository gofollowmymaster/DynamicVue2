import { deepMergeByKey } from '../../utils/tool'

export const color = ['#6997FD', '#36C1BC', '#FF6366', '#5FC7F6', '#FFBE6A', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

const baseOption = {
    color,
    noDataLoadingOption: {
        effect: 'bubble',
        text: '暂无数据',
        effectOption: {
            effect: {
                n: 0
            }
        },
        textStyle: {
            fontSize: 32,
            fontWeight: 'bold'
        }
    },
    title: {
        show: false
    },

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        show: false
    },
    legend: {
        show: false,
        top: '90%',
        left: 'center'
    }
}

export const basePieChartOption = {
    ...baseOption,
    // tooltip: {
    //   trigger: 'item'
    // },
    series: [
        {
            name: '',
            type: 'pie',
            radius: ['70%', '84%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
                formatter: '{b}',
                color: ''
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: '12',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: true
            },
            data: []
        }
    ]
}
export const commonPieChartOption = deepMergeByKey(basePieChartOption, {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        show: true,
        top: '90%',
        left: 'center'
    },
    title: {
        text: '',
        left: 'center',
        top: 'center',
        textStyle: {
            fontSize: '14',
            fontWeight: 'bold'
        }
    }
})

export const solidPieChartOption = deepMergeByKey(commonPieChartOption, {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        show: true,
        top: '10%',
        left: '70%'
    },
    title: {
        text: '',
        left: 'center',
        top: 'center',
        textStyle: {
            fontSize: '14',
            fontWeight: 'bold'
        }
    },
    series: [
        {
            name: '',
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
                formatter: '{b}',
                color: ''
            },
            emphasis: {
                label: {
                    show: false,
                    fontSize: '12',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [],
            radius: ['0%', '88%'], // 内外圆的大小
            center: ['36%', '50%']// 距离左右，上下距离的百分比
        }
    ]
})

export const leftPieChartOption = deepMergeByKey(basePieChartOption, {
    legend: {
        show: true,
        top: 'center',
        left: '56%',
        orient: 'vertical'
    },
    series: [
        {
            labelLine: {
                show: false
            },
            label: {
                show: false,
                position: 'left',
                formatter: '{b}',
                color: ''
            },
            data: [],
            radius: ['65%', '90%'], // 内外圆的大小
            center: ['20%', '50%']// 距离左右，上下距离的百分比
        }
    ]
})

export const baseLineChartOption = {

    ...baseOption,
    grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '1%',
        containLabel: true

    },

    legend: {
        show: true,
        top: '4%',
        left: 0
    // data: ["蒸发量", "降水量", "平均温度"],
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],

    series: [

    ]
}

export const baseBarChartOption = deepMergeByKey(baseOption, {

    grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '1%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: [0, 0.01],
        data: []

    },
    yAxis: [{
        type: 'value',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
            formatter: '{value}'
        }
    }],
    legend: {
        show: true,
        top: '2%',
        left: '5%'
    // data: ["蒸发量", "降水量", "平均温度"],
    },

    series: [
        {
            colorBy: 'series',
            name: '',
            type: 'bar',

            barMaxWidth: 40, // 固定柱子宽度
            emphasis: {
                focus: 'series'
            },
            data: []
        }
    ]

})

export const stackBarChartOption = deepMergeByKey(baseBarChartOption, {

    grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },

    series: [
        {
            name: '',
            label: {
                show: false
            },

            stack: 'total'
        }

    ]

})

export const stackBarLineChartOption = deepMergeByKey(baseBarChartOption, {

    grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },

    series: [
        {
            name: '',
            label: {
                show: false
            },
            type: 'bar',
            stack: 'total'
        },
        {
            name: '',
            label: {
                show: false
            },
            type: 'line'

        }

    ]

})

export default {
    basePieChart: basePieChartOption,
    commonPieChart: commonPieChartOption,
    baseLineChart: baseLineChartOption,
    leftPieChart: leftPieChartOption,
    baseBarChart: baseBarChartOption,
    stackBarChart: stackBarChartOption,
    solidPieChart: solidPieChartOption
}
