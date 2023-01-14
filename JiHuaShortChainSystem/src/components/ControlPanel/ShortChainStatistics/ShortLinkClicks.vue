<template>
  <div id="" class="ShortLinkEcahrtArea">
    <EchartsModule :seriesData="seriesData" :title="'短链统计'" :xAxisData="xAxisData" :legendData="legendData">
    </EchartsModule>
  </div>
</template>

<script>
import EchartsModule from '@/components/Module/EchartModule.vue'
import getMyChainDataAPI from '@/API/GetShortLinkData'
export default {
  props: [],
  data () {
    return {
      seriesData: [
        {
          name: '普通缩短', // 折线的名称
          type: 'line', // 图表的类型，这里是“line”，表示折线图
          stack: 'Total', // 数据堆叠，这里是“Total”
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: '限时缩短',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: '加密缩短',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: '总创建数',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: '日点击数',
          type: 'line',
          stack: 'Total',
          data: [0, 0, 0, 0, 0, 0]
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
    // 获取过往7日数据
    async getToday () {
      const { data: res } = await getMyChainDataAPI.UserPeriod()
      console.log(res.data)
      // 数组1 上锁的条数 数组2 限时链接的条数 数组3 立即缩短里符合当日的所有条数
      // 数组4 普通||上锁 所有链接的点击数 数组5 限时链接所有的点击数
      const resData = res.data
      const maxLengthArray = resData.reduce((a, b) => a.length > b.length ? a : b)
      // TODO 数据处理
      maxLengthArray.forEach((data, index) => {
        switch (index) {
          case 0:
            resData[index].forEach(vvalue => {
              maxLengthArray.forEach((value, nindex) => {
                if (value.date === vvalue.date) {
                  this.seriesData[2].data[nindex] = Number(vvalue.count)
                } else {
                  this.seriesData[2].data[nindex] += 0
                }
              })
            })
        }
      })
      console.log(this.seriesData[2].data)
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
