<template>
  <div id="" class="">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-scissors"></i>
          <span>链接缩短</span>
        </template>
        <el-menu-item-group>
          <router-link to="/ControlPanel/shortenImmediately" class="default_a_black"><el-menu-item
              index="1-1">立即缩短</el-menu-item></router-link>
          <router-link to="/ControlPanel/timeLimitShortened" class="default_a_black"><el-menu-item
              index="1-3">限时缩短</el-menu-item></router-link>
          <router-link to="/ControlPanel/encryptedShortening" class="default_a_black"><el-menu-item
              index="1-2">加密缩短</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>短链统计</span>
        </template>
        <el-menu-item-group>
          <router-link to="/ControlPanel/myShortChain" class="default_a_black"><el-menu-item
              index="2-1">我的短链</el-menu-item></router-link>
          <router-link to="/ControlPanel/expiredLink" class="default_a_black"><el-menu-item
              index="2-2">失效链接</el-menu-item></router-link>
          <router-link to="/ControlPanel/ShortLinkClicks" class="default_a_black"><el-menu-item
              index="2-3">短链一览</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <router-link to="/ControlPanel/systemSettings" slot="title"
          class="default_a_black"><span>系统设置</span></router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
    }
  },
  created () {
  },
  method () { },
  methods: {
  },
  watch: {},
  computed: {},
  filters: {},
  name: 'IndexM',
  components: {}
}
</script>

<style lang="less" scoped>

</style>
