<template>
  <div id="ShortArea" class="ShortArea">
    <h1>立即缩短</h1>
    <div class="ShortInputArea">
      <el-input placeholder="Http://" v-model="webSiteLink" class="input-with-select">
        <template slot="prepend">Link </template>
        <el-button slot="append" v-if="!loading" icon="el-icon-link" @click="ShortLink"></el-button>
        <el-button slot="append" type="primary" v-else :loading="loading">缩短中</el-button>
      </el-input>
    </div>
    <div class="QRArea">
      <QRCodeGeneration v-if="isQRC" :ShortLinks="ShortLinks"></QRCodeGeneration>
      <div class="CountLinkText">
        <div>
          累计转址
          <span>{{ Cumuf }}</span>
        </div>
        <div>
          今日转址
          <span>{{ ForwT }}</span>
        </div>
      </div>
    </div>
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
      Cumuf: JSON.parse(localStorage.getItem('FCdata')).Cumuf,
      ForwT: JSON.parse(localStorage.getItem('FCdata')).ForwT,
      ShortLinks: '',
      isQRC: false
    }
  },
  created () {
    if (localStorage.getItem('FCdata') === null) {
      this.Inquire()
    }
    this.Cumuf = JSON.parse(localStorage.getItem('FCdata')).Cumuf
    this.ForwT = JSON.parse(localStorage.getItem('FCdata')).ForwT
  },
  methods: {
    async ShortLink () {
      this.isQRC = false
      if (this.webSiteLink.length !== 0 && /^https?:\/\/[^\s]+$/.test(this.webSiteLink)) {
        this.loading = true
        const data = {
          link: this.webSiteLink
        }
        const { data: res } = await toShortAPI.toShort(data)
        if (res.data) {
          this.ShortLinks = res.data
          this.isQRC = true
          this.Inquire()
        }
        this.loading = false
      } else {
        this.$notify.error({
          title: '转址失败',
          message: '链接不能为空或者非法链接,必须以http或https开头.域名结尾'
        })
        this.isQRC = false
      }
    },
    async Inquire () {
      const { data: res } = await toShortAPI.Inquire()
      this.ForwT = res.data.ForwT
      this.Cumuf = res.data.Cumuf
      localStorage.setItem('FCdata', JSON.stringify({
        ForwT: res.data.ForwT,
        Cumuf: res.data.Cumuf
      }))
    }
  },
  watch: {},
  computed: {},
  filters: {},
  name: 'shortenImmediately',
  components: {
  }
}
</script>

<style lang="less" scoped>
.ShortArea>h1 {
  font-size: 2.5rem;
  margin: 20px 0;
}

.ShortInputArea {
  width: 80%;
  margin: 0 auto;
}

@media only screen and (max-width: 755px) {
  .ShortInputArea {
    width: 100%;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
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
