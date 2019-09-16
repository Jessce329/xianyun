<template>
  <div class="c" />
</template>

<script>

export default {
  data () {
    return {
      activeName: 'scenic',
      // 景点数据
      scenicData: {},
      scenicArr: [],
      scenicDisArr: [],
      // 交通数据
      trafficData: {},
      trafficArr: [],
      trafficDisArr: []
    }
  },
  mounted () {
    setTimeout(() => {
      const { location } = this.$store.state.hotel.hotelData
      // 获取城市坐标
      const lat = location.latitude
      const lon = location.longitude
      // 构建地图
      window.onLoad = function () {
      // var map = new AMap.Map('container',
        const map = new AMap.Map('container',
          {
            zoom: 12, // 级别
            center: [lon, lat] // 中心点坐标
          })
      }
      const url = 'https://webapi.amap.com/maps?v=1.4.15&key=cedd1080cbba395ba9431a824814fec1&callback=onLoad'
      const api = document.createElement('script')
      api.charset = 'utf-8'
      api.src = url
      document.head.appendChild(api)
      // 获取城市
      const city = this.$store.state.hotel.hotelData.real_city
      const arr = [lon, lat]
      // 获取风景数据
      this.getData(city, arr, '风景名胜')
      // 获取交通数据
      this.getData(city, arr, '交通设施服务')
    }, 10)
  },
  methods: {
    // 封装请求风景和交通的数据,并且处理好返回一个数组
    getData (city, arr, type) {
      this.$axios({
        url: 'https://restapi.amap.com/v3/place/text',
        params: {
          keyword: '',
          city,
          location: arr,
          types: type,
          output: 'json',
          page: 1,
          offset: 10,
          key: '55d9c901fc7e39012720304c9e599960'
        }
      })
        .then((res) => {
          if (res.status === 200) {
            const { data } = res
            if (type === '风景名胜') {
              this.scenicData = data
              const { pois } = data
              const scenicArr = []
              var arr = []
              pois.forEach((e) => {
                const { location, name } = e
                arr = location.split(',').map((m) => {
                  return +m
                })
                arr.unshift(name)
                scenicArr.push(arr)
              })
              this.scenicArr = scenicArr
              // console.log("风景数据：",scenicArr)
              this.getLocation(this.scenicArr, '风景名胜')
            } else {
              this.trafficData = data
              const { pois } = data
              const trafficArr = []
              var arr = []
              pois.forEach((e) => {
                const { location, name } = e
                arr = location.split(',').map((m) => {
                  return +m
                })
                arr.unshift(name)
                trafficArr.push(arr)
              })
              this.trafficArr = trafficArr
              // console.log("交通数据：",trafficArr)
              this.getLocation(this.trafficArr, '交通设施服务')
            }
          }
        })
    },
    // 处理获取两坐标间的距离，返回一个 “坐标，名称，距离”的数组封装方法
    getLocation (arrRoot, type) {
      // 给个初始值，避免报错
      arrRoot = typeof (arrRoot) === 'object' && arrRoot.length >= 0 ? arrRoot : []
      const { location } = this.$store.state.hotel.hotelData
      // 获取城市坐标
      const lat = location.latitude
      const lon = location.longitude
      const p1 = [lon, lat]
      const arrData = []
      arrRoot.forEach((e) => {
        const [ temp, ...locationArr ] = e
        const newArr = [temp]
        // 保留两位小数点
        let distance = Math.round(AMap.GeometryUtil.distance(p1, locationArr) / 10) / 100
        if (String(distance).length === 2) {
          distance = String(distance).concat('.00')
        } else if (String(distance).length === 4) {
          distance = String(distance).concat('0')
        } else {
          distance
        }
        // 添加坐标数据
        newArr.unshift(...locationArr)
        // 添加距离值
        newArr.push(distance)
        // 加入数组中
        arrData.push(newArr)
      })
      if (type === '风景名胜') {
        this.scenicDisArr = arrData
      } else {
        this.trafficDisArr = arrData
      }
    }
  }
}
</script>

<style>

</style>
