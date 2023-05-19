<template>
  <div id="" class="systemSettingArea">
    <h1>系统设置</h1>
    <div class="systemSettingBox">
      <p class="switchbtn">开放使用本系统（不推荐开启）
        <el-switch v-model="isOpen" active-text="是" inactive-text="否">
        </el-switch>
      </p>
      <p class="switchbtn">打开广告（该功能未开放）
        <el-switch v-model="isAD" active-text="是" inactive-text="否">
        </el-switch>
      </p>
    </div>
    <div class="systemSettingInput">
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-form-item label="站点名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="跳转控制时间">
          <el-input v-model="formLabelAlign.CtrlJumptime"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      isOpen: false,
      isAD: false,
      labelPosition: 'right',
      formLabelAlign: {
        name: 'JiHua的短链服务系统',
        CtrlJumptime: 1000
      }
    }
  },
  created () {
  },
  method () { },
  methods: {},
  watch: {},
  computed: {},
  filters: {},
  name: 'systemSettings',
  components: {
  }
}
</script>

<style lang="less" scoped>
.systemSettingArea {
  padding: 20px 30px 20px 0;
  >h1 {
    font-size: 2.5rem;
  }
}
.systemSettingInput,.systemSettingBox{
  background-color: #fff;
  width: 100%;
  padding: 15px;
  margin: 20px 0;
}
.systemSettingBox {
  text-align: left;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  >.switchbtn {
    width: 30%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}
.systemSettingInput {
  .el-form-item{
    display: flex;
  }
}
</style>
