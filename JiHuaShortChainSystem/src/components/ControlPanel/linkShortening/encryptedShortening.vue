<template>
  <div id="ShortArea" class="ShortArea">
    <h1>加密缩短</h1>
    <div class="inputpwdArea">
      <el-input placeholder="请输入内容" v-model="webSiteLink">
        <i slot="prefix" class="el-input__icon el-icon-link"></i>
      </el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      <el-button slot="append" v-if="!loading" icon="el-icon-link" @click="ShortLink"></el-button>
      <el-button slot="append" type="primary" v-else :loading="loading">缩短中</el-button>
    </div>
    <QRCodeGeneration v-if="isQRC" :ShortLinks="ShortLinks"></QRCodeGeneration>
  </div>
</template>

<script>
import toShortAPI from '@/API/ShortLink'
export default {
  props: [],
  data () {
    return {
      webSiteLink: 'https://msdn.itellyou.cn/',
      loading: false,
      ShortLinks: '',
      isQRC: false,
      password: ''
    }
  },
  created () {
  },
  methods: {
    async ShortLink () {
      this.isQRC = false
      if (this.webSiteLink.length !== 0 && /^https?:\/\/[^\s]+$/.test(this.webSiteLink)) {
        this.loading = true
        if (this.passwords()) {
          const data = {
            link: this.webSiteLink,
            password: this.password
          }
          const { data: res } = await toShortAPI.toShortp(data)
          if (res.data) {
            this.ShortLinks = res.data
            this.isQRC = true
          }
          this.loading = false
        }
      } else {
        this.$notify.error({
          title: '转址失败',
          message: '链接不能为空或者非法链接,必须以http或https开头.域名结尾'
        })
        this.isQRC = false
      }
      this.loading = false
    },
    passwords () {
      const passwordRegex = /^[a-zA-Z0-9`~!@#$%^&*()_+={}[\]|\\;:'",<.>/?]{1,25}$/
      if (this.password === '') {
        this.$notify.error({
          title: '错误',
          message: '密码不能为空且不能超过25字'
        })
        return false
      } else if (!passwordRegex.test(this.password)) {
        return false
      }
      return true
    }

  },
  watch: {
    time: {
      handler (newVal) {
        if (newVal) {
          this.times()
        }
      },
      deep: true
    }
  },
  computed: {},
  filters: {},
  name: 'encryptedShortening',
  components: {
  }
}
</script>

<style lang="less" scoped>
.inputpwdArea {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  // background-color: #fff;
  margin: 0 auto 15px;
}

@media only screen and (max-width: 755px) {
  .inputpwdArea {
    width: 100%;
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    /deep/button {
      width: 80px;
    }

    /deep/.el-input {
      margin-bottom: 10px;
    }
  }
}

.inputpwdArea>div:first-child {
  flex: 2;
}

.inputpwdArea>div:nth-child(2) {
  flex: 1;
}

.ShortArea>h1 {
  font-size: 2.5rem;
  margin: 20px 0;
}

.QRArea {
  width: 100%;
  display: flex;
  margin: 20px auto;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}

.CountLinkText {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;

  >div {
    background-color: rgb(255, 254, 254);
    padding: 20px 30px;
    margin: 15px;
    font-weight: 500;
    font-size: 1.2rem;

    >span {
      font-weight: 600;
      font-size: 1.2rem;
      color: rgba(9, 92, 156, 0.8);
    }
  }
}
</style>
