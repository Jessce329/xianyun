<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="catchFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem
          v-for="(item,index) in dataList"
          :key="index"
          :data="item"
        />
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsFilters from '@/components/air/flightsFilters.vue'
import FlightsAside from '@/components/air/flightsAside.vue'
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data () {
    return {
      flightsData: {
        flights: [],
        info: [],
        options: []
      },
      catchFlightsData: {
        flights: [],
        info: [],
        options: []
      },
      // 渲染机票列表
      dataList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0
    }
  },
  /* watch: {
    $route () {
      this.getData()
    }
  }, */
  mounted () {
    this.getData()
  },
  methods: {
    // 获取航班总数据
    getData () {
      this.$axios({
        url: 'airs',
        params: this.$route.query
      }).then((res) => {
        // console.log(res)
        this.flightsData = res.data
        // 缓存一份新的列表数据数据，这个列表不会被修改
        // 而flightsData会被修改
        this.catchFlightsData = { ...res.data }
        // 总的页数
        this.total = this.flightsData.flights.length
        // this.dataList = this.flightData.flights
        this.setDataList()
      })
    },
    // 设置dataList的数据
    setDataList (arr) {
      if (arr) {
        this.pageIndex = 1
        this.flightsData.flights = arr
        this.total = arr.length
      }
      const start = (this.pageIndex - 1) * this.pageSize
      const end = start + this.pageSize
      this.dataList = this.flightsData.flights.slice(start, end)
    },
    // 切换
    handleSizeChange (value) {
      this.pageSize = value
      this.pageIndex = 1
      this.setDataList()
    },
    // 切换页数时触发
    handleCurrentChange (value) {
      this.pageIndex = value
      this.setDataList()
    }
  }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
</style>
