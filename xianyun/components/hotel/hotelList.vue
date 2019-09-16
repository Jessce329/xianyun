<template>
  <div class="hotelList">
    <el-row
      v-for="(item,index) in hotelList.data"
      :key="index"
      type="flex"
      class="row-bg hotel"
      justify="space-between"
      :gutter="20"
    >
      <el-col :span="8">
        <div class="grid-content bg-purple hotelList_left">
          <a :href="`/hotel/id=`+`${item.id}`">
            <img :src="`${item.photos}`" alt>
          </a>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple-light hotelList_center">
          <h4>
            <a :href="`/hotel/id=`+`${item.id}`">{{ item.name }}</a>
          </h4>
          <div class="hotel_name">
            <span>{{ item.alias }}</span>
            <el-tooltip
              class="item"
              effect="light"
              :visible-arrow="false"
              :content="item.hotellevel?item.hotellevel.name:'暂未评星'"
              placement="bottom"
            >
              <span v-if="item.hotellevel">
                <i v-for="(v,i) in item.hotellevel.level" :key="i" class="iconfont iconhuangguan" />
              </span>
              <span v-else>暂未评星</span>
            </el-tooltip>
            <span>{{ item.hoteltype.name }}</span>
          </div>
          <el-row type="flex" class="hotel_grade">
            <el-col :span="10">
              <el-rate
                :value="item.stars"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}分"
              />
            </el-col>
            <el-col :span="7">
              <span>{{ item.all_remarks }}</span>
              条评价
            </el-col>
            <el-col :span="7">
              <span>{{ Math.floor(Math.random() * 100) }}</span>
              篇游记
            </el-col>
          </el-row>
          <div class="location">
            <i class="iconfont iconlocation" />
            位于: {{ item.address }}
          </div>
          <div class="phone">
            <span>电话：{{ item.phone }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-table :data="item.products" :show-header="false">
          <el-table-column prop="name" />
          <el-table-column prop="price">
            <template slot-scope="scope">
              <span style="color:orange;">￥{{ scope.row.price }}</span>起
              <i class="el-icon-arrow-right" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="pagination_box">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        small
        layout="prev, pager, next,slot"
        :total="50"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      hotelList: []
    }
  },
  mounted () {
    setTimeout(() => {
      // console.log(6666)
      // console.log(this.$store.state.hotel.CityId)
    }, 1000)
    // console.log(this.data.CityId, 11111111)
    // console.log(this.$store.state.hotel.CityId, 222)

    // console.log(this.$route.query.city)
    this.$axios({
      url: '/hotels',
      params: { city: this.$route.query.city }
    }).then((res) => {
      // console.log(res, 55555)
      this.hotelList = res.data
    })
  }
}
</script>
<style lang="less" scoped>
.hotelList {
  .hotel {
    margin-left: -10px;
    margin-right: -10px;
    padding: 25px 0;
    border-bottom: 1px solid #ddd;
    .hotelList_left {
      img {
        width: 320px;
        height: 210px;
      }
    }
    .hotelList_center {
      h4 {
        font-size: 25px;
        font-weight: 400;
      }
      .hotel_name {
        margin-bottom: 10px;
        span {
          color: #999999;
        }
        i {
          color: orange;
        }
      }
      .hotel_grade {
        margin-bottom: 10px;
        .el-col {
          span {
            color: orange;
          }
        }
      }
      .location {
        font-size: 14px;
        color: #666666;
        margin-bottom: 10px;
      }
    }
  }
  .pagination_box{
    text-align: right;
    padding: 20px 0 40px;
  }
  // /deep/.el-pagination .btn-next, .el-pagination .btn-prev{
  //   border: 1px solid #ddd;
  // }
}
</style>
