<template>
  <div ref="StackedAreaChart" class="echarts-box"></div>
</template>

<script>
export default {
  props: {
    seriesData: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    xAxisData: {
      type: Array,
      required: true
    },
    legendData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // TODO 图表
      option: {
        title: {
          text: this.title
        },
        // tooltip.trigger：提示框的触发条件。这里是“axis”，表示提示框将在图表的坐标轴上触发。
        tooltip: {
          trigger: 'axis'
        },
        // 图例的文字，表示图表中的折线分别是什么
        legend: {
          data: this.legendData
        },
        // grid.left、grid.right、grid.bottom：图表的边距
        grid: {
          top: '8%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // toolbox.feature.saveAsImage：导出图表的功能
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // xAxis.type、yAxis.type：坐标轴的类型。这里都是“category”，表示是离散的分类型。
        // 横坐标
        xAxis: {
          type: 'category',
          boundaryGap: false, // 坐标轴两端是否留白。这里是“false”，表示不留白。
          data: this.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: this.seriesData
      }
    }
  },
  // created () {
  //   console.log(this.xAxisData)
  // },
  mounted () {
    this.StackedAreaChart()
    window.onresize = () => {
      location.reload()
      this.myChart.resize()
    }
  },
  methods: {
    StackedAreaChart () {
      this.myChart = this.$echarts.init(this.$refs.StackedAreaChart)
      this.option.title.text = this.title
      this.option.legend.data = this.legendData
      this.option.xAxis.data = this.xAxisData
      this.option.series = this.seriesData
      this.myChart.setOption(this.option)
    }
  },
  watch: {
    seriesData: {
      handler: function () {
        this.StackedAreaChart()
      },
      deep: true
    },
    title: {
      handler: function () {
        this.StackedAreaChart()
      },
      deep: true
    },
    xAxisData: {
      handler: function () {
        this.StackedAreaChart()
      },
      deep: true
    },
    legendData: {
      handler: function () {
        this.StackedAreaChart()
      },
      deep: true
    }
  },
  computed: {},
  filters: {},
  name: 'StackedAreaChart',
  components: {}
}
</script>

<style lang="less" scoped>
.echarts-box {
  border-radius: 8px;
  height: 75vh;
  width: 80vw;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}
</style>
