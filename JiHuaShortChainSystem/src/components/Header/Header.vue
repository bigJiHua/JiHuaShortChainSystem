<template>
  <div id="" class="HeaderM">
    <div class="LeftHeader">
      <img src="https://jihau.top/img/logo.png" alt="Logo" width="40px" height="30px">
      <h1>
        <router-link to="/ControlPanel/shortenImmediately" class="default_a_black">JiHua的短链服务系统
        </router-link>
      </h1>
    </div>
    <div class="RightHeader" v-if="!phone">
      <el-button type="primary" @click="LoginOut">退出登录</el-button>
    </div>
    <div class="RightHeader" v-else>
      <i data-v-741978ef="" class="el-icon-s-unfold MenuIcon" style="font-size: 40px;" @click="drawer = true"></i>
      <el-drawer :visible.sync="drawer" direction="ltr" :before-close="handleClose">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-scissors"></i>
              <span>链接缩短</span>
            </template>
            <el-menu-item-group>
              <router-link to="/ControlPanel/shortenImmediately" class="default_a_black"><el-menu-item index="1-1"
                  @click="drawer = false">立即缩短</el-menu-item></router-link>
              <router-link to="/ControlPanel/timeLimitShortened" class="default_a_black"><el-menu-item index="1-3"
                  @click="drawer = false">限时缩短</el-menu-item></router-link>
              <router-link to="/ControlPanel/encryptedShortening" class="default_a_black"><el-menu-item index="1-2"
                  @click="drawer = false">加密缩短</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>短链统计</span>
            </template>
            <el-menu-item-group>
              <router-link to="/ControlPanel/myShortChain" class="default_a_black"><el-menu-item index="2-1"
                  @click="drawer = false">我的短链</el-menu-item></router-link>
              <router-link to="/ControlPanel/expiredLink" class="default_a_black"><el-menu-item index="2-2"
                  @click="drawer = false">失效链接</el-menu-item></router-link>
              <router-link to="/ControlPanel/ShortLinkClicks" class="default_a_black"><el-menu-item index="2-3"
                  @click="drawer = false">短链一览</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <router-link to="/ControlPanel/systemSettings" slot="title" class="default_a_black"><span
                @click="drawer = false">系统设置</span></router-link>
          </el-menu-item>
          <el-button type="primary" @click="LoginOut">退出登录</el-button>
        </el-menu>
      </el-drawer>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      phone: false,
      drawer: false
    }
  },
  created () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.phone = true
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      this.phone = false
    }
    this.phoneFunc()
  },
  methods: {
    LoginOut () {
      localStorage.removeItem('token')
      this.$router.push('/Login')
      location.reload()
    },
    handleClose (done) {
      done()
    },
    phoneFunc () {
      window.addEventListener('resize', () => {
        if (window.matchMedia('(max-width: 767px)').matches) {
          this.phone = true
        } else if (window.matchMedia('(min-width: 768px)').matches) {
          this.phone = false
        }
      })
    }
  },
  name: 'HeaderM'
}
</script>

<style lang="less" scoped>
.HeaderM {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.LeftHeader {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.RightHeader {
  display: flex;
}

/deep/.el-drawer.ltr {
  width: 40% !important;
}
</style>
