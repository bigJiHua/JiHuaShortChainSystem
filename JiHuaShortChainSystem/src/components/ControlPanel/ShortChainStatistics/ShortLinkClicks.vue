<template>
  <div id="" class="ShortLinkEcahrtArea">
    <div class="ShortLinkEcahrtHeader">
      <h1>短链统计</h1>
      <el-button type="primary" @click="getToday">刷新数据</el-button>
    </div>
    <EchartsModule v-if="isData" :seriesData="seriesData" :title="''" :xAxisData="xAxisData" :legendData="legendData">
    </EchartsModule>
    <el-table v-else v-loading="!isData" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
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
      xAxisData: []
    }
  },
  created () {
    this.getToday()
  },
  methods: {
    // 获取过往7日数据
    async getToday () {
      this.xAxisData = []
      this.short = []
      this.endtime = []
      this.islock = []
      this.Alllinks = []
      this.clicks = []
      this.seriesData = []
      const { data: res } = await getMyChainDataAPI.UserPeriod()
      const resData = res.data
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
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
