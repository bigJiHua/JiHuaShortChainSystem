<template>
  <div id="" class="ShortLinkEcahrtArea">
    <div class="ShortLinkEcahrtHeader">
      <h1>短链统计</h1>
      <div>
        <el-date-picker v-model="selectDate" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-button @click="getToday" :disabled="isBtnDisabled">选择</el-button>
      </div>
      <el-button type="primary" @click="getToday" :disabled="isBtnDisabled">刷新数据</el-button>
    </div>
    <EchartsModule v-if="isData" :seriesData="seriesData" :title="''" :xAxisData="xAxisData" :legendData="legendData">
    </EchartsModule>
    <div v-else class="no-data-panel">
      <el-empty description="近7日无任何数据"></el-empty>
    </div>
  </div>
</template>

<script>
import EchartsModule from '@/components/Module/EchartModule.vue'
import getMyChainDataAPI from '@/API/GetShortLinkData'
export default {
  props: [],
  data () {
    return {
      short: [],
      endtime: [],
      islock: [],
      Alllinks: [],
      clicks: [],
      isData: false,
      seriesData: [],
      tableData: [],
      legendData: ['普通缩短', '限时缩短', '加密缩短', '总创建数', '日点击数'],
      xAxisData: [],
      selectDate: '',
      isBtnDisabled: false
    }
  },
  created () {
    this.getToday()
  },
  methods: {
    // 获取过往7日数据
    async getToday () {
      if (this.isBtnDisabled) return // 如果正在加载数据，则直接返回
      this.isBtnDisabled = true // 设置loading状态
      this.xAxisData = []
      this.short = []
      this.endtime = []
      this.islock = []
      this.Alllinks = []
      this.clicks = []
      this.seriesData = []
      const newdate = this.selectDate === '' ? new Date() : new Date(this.selectDate)
      const year = newdate.getFullYear()
      const month = newdate.getMonth() + 1 >= 10 ? newdate.getMonth() + 1 : '0' + (newdate.getMonth() + 1)
      const day = newdate.getDate() >= 10 ? newdate.getDate() : '0' + newdate.getDay()
      const { data: res } = await getMyChainDataAPI.UserPeriod(`${year}-${month}-${day}`)
      const resData = res.data
      if (resData.length !== 0) {
        resData.forEach((Value, index) => {
          this.xAxisData.push(Value.date)
          this.short[index] = Value.SCALLcount !== undefined && Value.islockCount !== undefined ? Value.SCALLcount - Value.islockCount : 0
          this.endtime[index] = Value.endtimeCount !== undefined ? Value.endtimeCount : 0
          this.islock[index] = Value.islockCount !== undefined ? Value.islockCount : 0
          this.Alllinks[index] = Value.SCALLcount !== undefined && Value.SLALLcount !== undefined ? Value.SCALLcount + Value.SLALLcount : 0
          this.clicks[index] = Value.SCclicks_sum !== undefined && Value.SLDclicks_sum !== undefined ? Value.SCclicks_sum + Value.SLDclicks_sum : 0
        })
        const EcahrtData = [this.short, this.endtime, this.islock, this.Alllinks, this.clicks]
        for (let i = 0; i < this.legendData.length; i++) {
          const data = {
            name: this.legendData[i],
            type: 'line',
            stack: 'Total',
            data: EcahrtData[i]
          }
          this.seriesData.push(data)
        }
        if (EcahrtData.length !== 0) {
          this.isData = true
        }
      } else {
        this.isData = false
      }
      this.isBtnDisabled = false
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

.ShortLinkEcahrtHeader {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.no-data-panel {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
</style>
