<template>
  <div class="container">
    <div class="hotelDetails">
      <HotelDetails
        v-for="(item,index) in allHotel"
        v-show="item.id==1"
        :key="index"
        :data="item"
      />
    </div>
    <div class="detailsImages">
      <DetailsImages />
    </div>
    <div class="hotelRecommend">
      <HotelRecommend
        v-for="(item,index) in allHotel"
        v-show="item.id==1"
        :key="index"
        :data="item"
      />
    </div>
    <div class="detailsMap">
      <DetailsMap :data="mapInfo" />
    </div>
    <div class="hotelStart">
      <HotelStart />
    </div>
    <div class="comment">
      <Comment />
    </div>
  </div>
</template>
<script>
import HotelDetails from '@/components/hotel/hotelDetails'
import DetailsImages from '@/components/hotel/detailsImages'
import HotelRecommend from '@/components/hotel/hotelRecommend'
import DetailsMap from '@/components/hotel/detailsMap'
import HotelStart from '@/components/hotel/hotelStart'
import Comment from '@/components/hotel/comment'
export default {
  components: {
    HotelDetails,
    DetailsImages,
    HotelRecommend,
    DetailsMap,
    HotelStart,
    Comment
  },
  data () {
    return {
      id: '',
      // 获取聪的酒店数
      allHotel: [
        { name: '',
          address: '',
          alias: ''
        }
      ],
      mapInfo: {
        locations: {},
        real_city: {}
      }
    }
  },
  mounted () {
    this.allHotelList()
  },
  methods: {
    allHotelList () {
      this.$axios({
        url: '/hotels',
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        console.log(res, 6666)
        this.id = this.$route.query.id
        this.allHotel = res.data.data
        if (res.status === 200) {
          res.data.data.forEach((v) => {
            this.mapInfo.locations = v.location
            this.mapInfo.real_city = v.real_city
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 1000px;
  margin: 0 auto
}
.detailsImages{
  height: 450px;
}
</style>
