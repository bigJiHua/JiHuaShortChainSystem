<template>
  <div id="Home">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Aside from '@/components/ControlPanel/Aside/Index.vue'

export default {
  name: 'ControlPanel',
  components: {
    Header,
    Aside
  }
}
</script>

<style lang="less">
#Home{
  height: 100%;
  width: 100%;
}
.el-header,
.el-footer {
  background-color: #c9d4eb;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  height: 100%;
  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

.el-container {
  height: 100%;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
