<template>
  <div id="" class="myShortChain">
    <div class="TitleBtn">
      <h1>失效短链</h1>
      <el-button type="primary" @click="getMyChainData(true)">刷新数据</el-button>
    </div>
    <div class="UserShortDataTable">
      <el-table :data="tableData" border style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }"
        max-height="600" v-loading="loading">
        <el-table-column fixed prop="short" label="缩短ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="link" label="原链接" width="480" align="center">
        </el-table-column>
        <el-table-column prop="state" label="状态" :formatter="linkstate" width="80" align="center">
        </el-table-column>
        <el-table-column prop="date" label="日期" sortable width="100" align="center">
        </el-table-column>
        <el-table-column prop="endtime" label="截止日期" width="100" :formatter="endtime" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <div style="display: flex; justify-content: center;">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="'正在编辑 ' + ChangeData.short" :visible.sync="dialogFormVisible" width="75%">
      <div class="demo-input-suffix">
        <span class="TitleCap">短链ID</span>
        <el-input v-model="ChangeData.short" disabled></el-input>
      </div>
      <div class="demo-input-suffix">
        <span class="TitleCap">缩短时间</span>
        <el-input v-model="ChangeData.date" disabled></el-input>
      </div>
      <p></p>
      <el-input v-model="ChangeData.link" class="LongLinkInput">
        <template slot="prepend">长链</template>
      </el-input>
      <div class="demo-input-suffix" v-if="ChangeData.endtime">
        <p class="TitleCap">截止时间</p>
        <el-date-picker v-model="ChangeData.endtime" type="date" format="yyyy 年 MM 月 dd 日" value-format="timestamp">
        </el-date-picker>
        <el-button @click="ChangeEndtime(ChangeData.id)" type="text" size="small">更改</el-button>
      </div>
      <div class="demo-input-suffix">
        <span class="TitleCap">状态</span>
        <el-button @click="isrecover(ChangeData.id, true)" type="primary" size="small">恢复</el-button>
      </div>
      <div class="demo-input-suffix">
        <span class="TitleCap">删除</span>
        <el-button @click="isrecover(ChangeData.id, false)" type="danger" size="small">彻底删除</el-button>
        <br>
        <span>⚠如果已更改日期，需要将点击左侧恢复按钮将短链状态重置为可用状态</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import getMyChainDataAPI from '@/API/GetShortLinkData'
export default {
  props: [],
  data () {
    return {
      tableData: [],
      loading: true,
      ChangeData: [],
      dialogFormVisible: false
    }
  },
  created () {
    this.getMyChainData()
  },
  method () { },
  methods: {
    handleClick (rowData) {
      this.ChangeData = JSON.parse(JSON.stringify(rowData))
      this.dialogFormVisible = true
    },
    // 获取短链
    async getMyChainData (rightNow) {
      if (this.tableData.length === 0 || rightNow === true) {
        this.loading = true
        const { data: res } = await getMyChainDataAPI.getMyChainData(true)
        this.tableData = res.data === undefined ? [] : res.data
      }
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    // 更改截止时间
    async ChangeEndtime (id) {
      if (this.ChangeData.endtime < Date.now()) {
        this.$notify.error({
          title: '错误',
          message: '当前链接已失效，请修改截止时间后重试'
        })
      } else {
        await getMyChainDataAPI.ChangeRestoreLinnk({
          id: id,
          endtime: this.ChangeData.endtime
        })
        this.getMyChainData(true)
      }
    },
    isrecover (id, isrecover) {
      const CResData = {
        id: id,
        endtime: '',
        short: ''
      }
      if (!isrecover) {
        // 确认删除 非恢复
        CResData.endtime = 'delete'
        this.$confirm('确认删除此短链吗？, 此过程不可逆！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await getMyChainDataAPI.ChangeRestoreLinnk(CResData)
          this.dialogFormVisible = false
          this.getMyChainData(true)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else if (isrecover) {
        // 确认恢复
        if (this.ChangeData.endtime !== undefined) {
          if (this.ChangeData.endtime < Date.now()) {
            this.$notify.error({
              title: '错误',
              message: '当前链接已失效，请修改截止时间后重试'
            })
          } else {
            CResData.endtime = 'isrecover'
            CResData.short = this.ChangeData.endtime
            this.$confirm('确认恢复此短链吗？, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              await getMyChainDataAPI.ChangeRestoreLinnk(CResData)
              this.dialogFormVisible = false
              this.getMyChainData(true)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消恢复'
              })
            })
          }
        } else {
          CResData.endtime = 'isrecover'
          CResData.short = this.ChangeData.endtime
          this.$confirm('确认恢复此短链吗？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            await getMyChainDataAPI.ChangeRestoreLinnk(CResData)
            this.dialogFormVisible = false
            this.getMyChainData(true)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消恢复'
            })
          })
        }
      }
    }
  },
  watch: {
  },
  computed: {
    linkstate () {
      return value => {
        if (Number(value.state) === 2) {
          return '已过期'
        } else if (Number(value.state) === 1) {
          return '已删除 可恢复'
        }
      }
    },
    endtime () {
      return value => {
        if (value.endtime === undefined && Number(value.islock) === 0) {
          return '普通缩短'
        } else if (value.islock !== undefined && value.endtime === undefined) {
          return '加密链接'
        }
        const date = new Date(parseInt(value.endtime))
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}-${month}-${day}`
      }
    }
  },
  filters: {
    isstate (val) {
      if (val === '0' || val === 0) {
        return '正常'
      } else {
        return '已过期'
      }
    }
  },
  name: 'expiredLink',
  components: {
  }
}
</script>

<style lang="less" scoped>
.myShortChain {
  height: 100%;
  width: 100%;
  text-align: left;

}

.TitleBtn {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  >h1 {
    text-align: left;
    font-size: 2.5rem;
    margin: 0 0 10px;
  }

}

/deep/.el-dialog__body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.LongLinkInput {
  margin: 20px 5px;
}

.demo-input-suffix {
  width: 45%;
  margin: 5px;
}

.UserShortDataTable {
  height: 80%;
  width: 100%;
  overflow: scroll;
}

.UserShortDataTable::-webkit-scrollbar {
  display: none;
}

.TitleCap::after {
  content: ' :  ';
}
</style>
