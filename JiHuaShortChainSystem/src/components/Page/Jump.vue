<template>
  <div id="" class="JumpPage">
    <h1>正在解析{{ this.$route.params.code }}...</h1>
    <router-link to="/">主页</router-link>
  </div>
</template>

<script>
import getJump from '@/API/GetShortLinkData'
import to1JumpAPI from '@/API/ShortLink'
export default {
  data () {
    return {
      short: this.$route.params.code
    }
  },
  async created () {
    const { data: res } = await getJump.jump(this.short)
    if (res.status === 204) {
      this.inputpwd()
    } else {
      setInterval(() => {
        window.location.href = res.link
      }, 1000)
    }
  },
  methods: {
    inputpwd () {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9`~!@#$%^&*()_+={}[\]|\\;:'",<.>/?]{1,25}$/,
        inputErrorMessage: '密码格式不正确'
      }).then(async ({ value }) => {
        const data = {
          short: this.short,
          password: value
        }
        const { data: res } = await to1JumpAPI.todecrypt(data)
        setInterval(() => {
          window.location.href = res.link
        }, 1000)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  },
  name: 'JumpModule'
}
</script>

<style lang="less" scoped>
.JumpPage > h1{
  margin: 25vh 0 0 0;
  text-align: center;
}
</style>
