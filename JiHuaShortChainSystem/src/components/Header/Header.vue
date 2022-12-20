<template>
  <div id="" class="HeaderM">
    <div class="LeftHeader">
      <img src="https://jihau.top/img/logo.png" alt="Logo" width="40px" height="30px">
      <h1>JiHua的短链服务系统</h1>
    </div>
    <div class="RightHeader">
      <router-link to="/Login" class="default_a_white" v-if="IsLogin">
        <el-button type="primary">登录</el-button>
      </router-link>
      <el-button type="primary" v-else @click="LoginOut">退出登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      IsLogin: localStorage.getItem('token') === null
    }
  },
  created () {
  },
  methods: {
    LoginOut () {
      localStorage.removeItem('token')
      this.$router.push('/Login')
      location.reload()
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
</style>
