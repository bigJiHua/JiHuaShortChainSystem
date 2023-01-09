<template>
  <div id="Home">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-container>
        <el-aside width="200px" v-if="phone">
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
import toShortAPI from '@/API/ShortLink'
import Header from '@/components/Header/Header.vue'
import Aside from '@/components/ControlPanel/Aside/Index.vue'

export default {
  data () {
    return {
      phone: true
    }
  },
  created () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.phone = false
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      this.phone = true
    }
    this.phoneFunc()
  },
  methods: {
    async phoneFunc () {
      const { data: res } = await toShortAPI.Inquire()
      localStorage.setItem('FCdata', JSON.stringify({
        ForwT: res.data.ForwT,
        Cumuf: res.data.Cumuf
      }))
      window.addEventListener('resize', () => {
        if (window.matchMedia('(max-width: 767px)').matches) {
          this.phone = false
        } else if (window.matchMedia('(min-width: 768px)').matches) {
          this.phone = true
        }
      })
    }
  },
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
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  overflow: hidden;
}
@media only screen and (max-width: 755px) {
  .el-main {
    padding: 10px 8px;
  }
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
