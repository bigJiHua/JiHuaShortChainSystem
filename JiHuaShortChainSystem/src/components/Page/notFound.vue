<template>
  <div id="" class="countdownArea">
    <h1>404 NotFound !</h1>
    <p class="countdown">将在 <span>{{ countdown }}</span> 秒后自动跳转...</p>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      countdown: 3
    }
  },
  created () {
    setInterval(() => {
      this.countdown--
      if (this.countdown === 0) {
        this.$router.push('/Login')
      }
    }, 1000)
  },
  method () { },
  methods: {},
  watch: {},
  computed: {},
  filters: {},
  name: 'newModule',
  components: {
  }
}
</script>

<style lang="less" scoped>
@media only screen and (max-width: 755px) {
  .countdownArea {
    padding: 2rem;
    margin-top: 50%;
    > h1 {
      font-size: 4rem;
    }
  }
}

@media only screen and (min-width: 755px) {
  .countdownArea {
    padding: 7rem;
    > h1 {
      font-size: 4rem;
    }
  }
}
.countdown {
  font-size: 2rem;
  margin-top: 5rem;

  >span {
    font-weight: bolder;
    color: red;
  }
}
</style>
