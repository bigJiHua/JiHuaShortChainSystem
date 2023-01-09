<template>
  <div id="ShortArea" class="ShortArea">
    <h1>限时缩短</h1>
    <div class="selectTimeArea">
      <el-input placeholder="请输入内容" v-model="webSiteLink">
        <i slot="prefix" class="el-input__icon el-icon-link"></i>
      </el-input>
      <el-date-picker v-model="time" type="date" placeholder="选择链接有效期" format="yyyy 年 MM 月 dd 日"
        value-format="timestamp">
      </el-date-picker>
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
      webSiteLink: 'https://gfwcheck.com/asdfghjkhghfdsasawdefgrthyjuklkuyjthrgef',
      loading: false,
      ShortLinks: '',
      isQRC: false,
      time: ''
    }
  },
  created () {
  },
  methods: {
    async ShortLink () {
      if (this.webSiteLink.length !== 0 && /^https?:\/\/[^\s]+$/.test(this.webSiteLink)) {
        this.loading = !this.loading
        if (this.times()) {
          const data = {
            link: this.webSiteLink,
            time: this.time
          }
          const { data: res } = await toShortAPI.toShorts(data)
          this.ShortLinks = res.data
          this.isQRC = true
        }
        this.loading = !this.loading
      } else {
        this.$notify.error({
          title: '转址失败',
          message: '链接不能为空或者非法链接,必须以http或https开头.域名结尾'
        })
        this.isQRC = false
      }
    },
    times () {
      if (this.time === '') {
        this.$notify.error({
          title: '错误',
          message: '有效期不能为空'
        })
        return false
      } if (this.time < Date.now()) {
        this.$notify({
          title: '错误',
          message: '有效期不能是过去的时间!   否则为失效链接',
          type: 'warning'
        })
        this.time = ''
        return false
      } else {
        return true
      }
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
  name: 'timeLimitShortened',
  components: {
  }
}
</script>

<style lang="less" scoped>
.selectTimeArea {
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
  .selectTimeArea {
    width: 100%;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    /deep/button {
      width: 80px;
    }
    /deep/.el-input {
      width: 100%;
      margin-bottom: 10px;
    }
  }
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
