<template>
  <div id="" class="QRModule">
    <div class="QRMaskArea">
      <canvas ref="qrCanvas" class="QRCanvas" @mouseenter="isQRmask = !isQRmask"></canvas>
      <div @click="download" :class="{ 'QRmask': isQRmask, 'QRmasks': !isQRmask }" @mouseleave="isQRmask = !isQRmask">
        保存到本地</div>
    </div>
    <div class="CopyLinkArea">
      <p>{{ ShortLinks }}</p>
      <el-button @click="share">点击复制</el-button>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  props: {
    ShortLinks: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      isQRmask: false
    }
  },
  created () {
    setTimeout(() => {
      this.QR()
    }, 800)
  },
  methods: {
    QR () {
      QRCode.toCanvas(this.$refs.qrCanvas, this.ShortLinks, (error) => {
        if (error) {
          this.$notify.error({
            title: '错误',
            message: error
          })
        }
      })
    },
    download () {
      // 通过 API 获取目标 canvas 元素
      const canvas = this.$refs.qrCanvas
      // 创建一个 a 标签，并设置 href 和 download 属性
      const el = document.createElement('a')
      // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
      el.href = canvas.toDataURL()
      el.download = '短链QRCode'
      // 创建一个点击事件并对 a 标签进行触发
      const event = new MouseEvent('click')
      el.dispatchEvent(event)
    },
    share () {
      navigator.clipboard.writeText(this.ShortLinks).then(
        () => {
          this.$notify({
            title: '成功',
            message: '复制成功!',
            type: 'success'
          })
        },
        () => {
          this.$notify({
            title: '警告',
            message: '复制失败,请刷新页面后重试吧',
            type: 'warning'
          })
        }
      )
    }
  },
  watch: {
    ShortLinks: {
      handler (newWebLink) {
        this.QR(newWebLink)
      },
      deep: true
    }
  },
  computed: {},
  filters: {},
  name: 'QRCode',
  components: {
  }
}
</script>

<style lang="less" scoped>
.QRModule {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}
.QRMaskArea {
  width: 180px;
  height: 180px;
  position: relative;
}

.QRCanvas,
.QRmask {
  width: 180px !important;
  height: 180px !important;
}

.QRmasks {
  display: none;
}

.QRmask {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 1s linear;
}

.CopyLinkArea {
  >p {
    padding: 8px;
    margin: 5px;
    background-color: aliceblue;
  }
}
</style>
