<template>
  <div id="" class="">
    
  </div>
</template>

<script>
export default {
  props: {
    ChangeData: {
      type: Object,
      default () {
        return {}
      }
    },
    dialogFormVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      newData: this.ChangeData
    }
  },
  created () {
    console.log(this.ChangeData)
  },
  method () { },
  methods: {
  },
  watch: {
  },
  computed: {
  },
  filters: {
    isstate (Data) {
      console.log(Data)
      if (Data.state === '0' || Data.state === 0) {
        return '正常'
      } else {
        return '已删除'
      }
    }
  },
  name: 'ChangeShortData',
  components: {
  }
}
</script>

<style lang="less" scoped>
.TitleCap {
  text-transform: capitalize;
}
</style>
