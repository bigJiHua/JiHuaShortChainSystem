<template>
  <div id="" class="ShortLinkEcahrtArea">
    <EchartsModule :seriesData="seriesData" :title="'短链统计'" :xAxisData="xAxisData" :legendData="legendData">
    </EchartsModule>
  </div>
</template>

<script>
import EchartsModule from '@/components/Module/EchartModule.vue'
export default {
  props: [],
  data () {
    return {
      seriesData: [
        {
          name: '普通缩短', // 折线的名称
          type: 'line', // 图表的类型，这里是“line”，表示折线图
          stack: 'Total', // 数据堆叠，这里是“Total”
          data: [120, 132, 101, 134, 90, 230, 210] // 折线对应的数据，表示每天的点击量
        },
        {
          name: '限时缩短',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '加密缩短',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '总创建数',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '日点击数',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ],
      legendData: ['普通缩短', '限时缩短', '加密缩短', '总创建数', '日点击数'],
      xAxisData: []
    }
  },
  created () {
    this.getToday()
  },
  method () { },
  methods: {
    getToday () {

    }
  },
  watch: {},
  computed: {},
  filters: {},
  name: 'ShortLinkClicks',
  components: {
    EchartsModule
  }
}
</script>

<style lang="less" scoped>
.ShortLinkEcahrtArea {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
}

.ShortLinkEcahrtArea::-webkit-scrollbar {
  display: none;
}
</style>
