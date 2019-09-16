<template>
  <div class="hotelRecommend">
    <el-table
      :data="data.products"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="价格来源"
        width="400px"
      />
      <el-table-column
        prop="bestType"
        label="低价房型"
        width="400px"
      />
      <el-table-column
        prop="price"
        label="最低价格/每晚"
        width="200px"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hotelList: [],
      data: {}
    }
  },
  mounted () {
    this.$axios({
      url: `hotels/`
    }).then((res) => {
    //   console.log(res)
      this.hotelList = res.data.data
      this.data = res.data.data
      this.data.forEach((e) => {
        this.data = e
        // console.log(this.data)
      })
    })
  }
}
</script>

<style>

</style>
