<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单列表 -->
      <OrderForm :data="infoData" @setAllPrice="setAllPrice" />
      <!-- 边侧栏 -->
      <OrderAside :data="$store.state.air.infoData" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm.vue'
import OrderAside from '@/components/air/orderAside.vue'
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data () {
    return {
      // 机票信息
      infoData: {
        insurances: [] // 初始化保险数据
      }
    }
  },
  mounted () {
    const { query } = this.$route
    // console.log(query)
    this.$axios({
      url: `airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid
      }
    }).then((res) => {
      console.log(res)
      this.infoData = res.data
    })
  },
  methods: {
    setAllPrice (price) {
      this.allprice = price
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    width: 1000px;
    margin: 20px auto;
  }
</style>
