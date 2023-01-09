<template>
  <div id="" class="myShortChain">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="DataSelelct">
      <el-menu-item index="4">
        <h1>我的短链</h1>
      </el-menu-item>
      <el-menu-item index="1">非加密链接</el-menu-item>
      <el-menu-item index="2">加密链接</el-menu-item>
      <el-menu-item index="3">限时链接</el-menu-item>
      <el-menu-item index="4">
        <el-input v-model="keyValue" placeholder="快捷搜索" maxlength="50" clearable suffix-icon="el-icon-search"
          @change="search(keyValue)"></el-input>
      </el-menu-item>
      <el-menu-item index="1">
        <el-button type="primary" @click="getMyChainData(true)">刷新数据</el-button>
      </el-menu-item>
    </el-menu>
    <div class="UserShortDataTable">
      <el-table :data="tableData" border style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }"
        max-height="600" v-loading="loading">
        <el-table-column fixed prop="short" label="缩短ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="link" label="原链接" width="480" align="center">
        </el-table-column>
        <el-table-column prop="islock" label="是否加密" :formatter="islimittime" width="80" align="center">
        </el-table-column>
        <el-table-column prop="date" label="创建日期" sortable width="110" align="center">
        </el-table-column>
        <el-table-column prop="endtime" label="截止日期" width="100" :formatter="endtime" align="center"></el-table-column>
        <el-table-column label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteData(scope.row.id, scope.row.short)" type="text" size="small">删除</el-button>
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
      <el-input v-model="ChangeData.link" class="LongLinkInput">
        <template slot="prepend">长链</template>
      </el-input>
      <div class="demo-input-suffix" v-if="ChangeData.endtime">
        <p class="TitleCap">截止时间</p>
        <el-date-picker v-model="ChangeData.endtime" type="date" format="yyyy 年 MM 月 dd 日" value-format="timestamp">
        </el-date-picker>
        <el-button @click="ChangeEndtime(ChangeData.id)" type="text" size="small">更改</el-button>
      </div>
      <div class="demo-input-suffix" v-if="ChangeData.islock">
        <div class="ChangePwdArea">
          <p class="TitleCap">加密密码</p>
          <el-input placeholder="请输入原密码" v-model="ChangeData.islockpwd" show-password style="width: 120px"></el-input>
          <el-input placeholder="请输入新密码" v-model="ChangeData.islocknewpwd" show-password
            style="width: 120px"></el-input>
          <el-button @click="Changepwd()" type="text" size="small">更改</el-button>
        </div>
      </div>
      <div class="demo-input-suffix">
        <div>
          <span class="TitleCap">状态</span>
          {{ ChangeData.state | isstate(ChangeData.state) }}
          <el-button @click="deleteData(ChangeData.id, ChangeData.short)" type="danger" size="small">删除</el-button>
        </div>
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
      dialogFormVisible: false,
      keyValue: '',
      activeIndex: '1'
    }
  },
  created () {
    this.getMyChainData()
    this.DataSelelct()
  },
  method () { },
  methods: {
    // 弹窗
    handleClick (rowData) {
      this.ChangeData = JSON.parse(JSON.stringify(rowData))
      this.dialogFormVisible = true
    },
    // 获取我的短链
    async getMyChainData (rightNow) {
      if (this.$store.state.UsertableData.length === 0 || this.tableData.length === 0 || rightNow === true) {
        this.loading = true
        const { data: res } = await getMyChainDataAPI.getMyChainData(false)
        this.$store.commit('ShorttableData', res.data)
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
    // 更改密码
    async Changepwd () {
      if (this.validatePassword(this.ChangeData.islockpwd) && this.validatePassword(this.ChangeData.islocknewpwd)) {
        this.$confirm('确认更改密码吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await getMyChainDataAPI.ChangeRestoreLinnk({ id: this.ChangeData.id, data: { password: this.ChangeData.islockpwd, newpassword: this.ChangeData.islocknewpwd } })
          this.getMyChainData(true)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '旧密码或新密码不能为空'
        })
      }
    },
    // 密码校验
    validatePassword (password) {
      // 密码长度不能为空
      if (!password || password.length === 0) {
        return false
      }
      // 其他的校验规则
      return true
    },
    // 删除短链
    deleteData (id, short) {
      this.$confirm('确认删除此短链吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await getMyChainDataAPI.deleteChainData({ id: id, short: short })
        this.getMyChainData(true)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 搜索功能
    search (key) {
      this.loading = true
      if (key !== '') {
        const newList = []
        const regex = new RegExp('.*' + String(key) + '.*')
        this.tableData.forEach(item => {
          if (regex.test(String(item.id))) {
            newList.push(item)
          } else if (regex.test(String(item.date))) {
            newList.push(item)
          } else if (regex.test(String(item.islock))) {
            newList.push(item)
          } else if (regex.test(String(item.short))) {
            newList.push(item)
          } else if (regex.test(String(item.link))) {
            newList.push(item)
          } else if (regex.test(String(item.username))) {
            newList.push(item)
          } else if (regex.test(String(item.endtime))) {
            newList.push(item)
          }
        })
        this.tableData = newList
      }
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    // 选择器 选择展示数据
    DataSelelct (key) {
      // 条件1 key === undefined 1 返回非加密链接 islock === undefined && endtime === undefined
      const islockData = []
      // 条件2 key === 2 返回加密链接 islock === 1
      const lockData = []
      // 条件3 key === 3 返回限时链接 endtime !=== undefined
      const endtimeData = []
      this.$store.state.UsertableData.forEach(item => {
        if (Number(item.islock) === 0 && item.endtime === undefined) {
          islockData.push(item)
        } else if (Number(item.islock) === 1 && item.endtime === undefined) {
          lockData.push(item)
        } else if (item.endtime !== undefined) {
          endtimeData.push(item)
        }
      })
      if (key === undefined || Number(key) === 1) {
        this.tableData = islockData
      } else if (Number(key) === 2) {
        this.tableData = lockData
      } else if (Number(key) === 3) {
        this.tableData = endtimeData
      } else if (Number(key) === 4) {
        this.tableData = this.$store.state.UsertableData
      }
    }
  },
  watch: {
    keyValue: {
      handler (newVal, olVal) {
        if (String(newVal).length < String(olVal).length || newVal === '') {
          this.tableData = this.$store.state.UsertableData
          setTimeout(() => {
            this.search(newVal)
          }, 500)
        } else {
          setTimeout(() => {
            this.search(newVal)
          }, 500)
        }
      },
      immediate: true
    }
  },
  computed: {
    islimittime () {
      return value => {
        if (value.islock === undefined) {
          return '限时链接'
        } else if (value.islock === 1) {
          return '加密'
        } else if (value.islock === 0) {
          return '非加密'
        }
      }
    },
    linkstate () {
      return value => {
        if (Number(value.state) === 1) {
          return '删除'
        } else if (Number(value.state) === 0) {
          return '正常'
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
        return '已删除'
      }
    }
  },
  name: 'myShortChain',
  components: {
  }
}
</script>

<style lang="less" scoped>
@media only screen and (min-width: 755px) {
  /deep/.el-input {
    width: 350px;
  }
}

@media only screen and (max-width: 755px) {
  /deep/.el-input {
    width: 110px;
  }
}

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
  width: 100%;
}

.ChangePwdArea {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
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
  content: ' :';
}
</style>
