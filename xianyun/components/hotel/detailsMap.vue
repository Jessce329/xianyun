<template>
  <div class="map">
    <el-row>
      <el-col :span="16">
        <div id="container" />
      </el-col>
      <el-col :span="8" class="poilist">
        <!-- 标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div class="pane-first">
              <ul>
                <li
                  v-for="(item,index) in mapData.pois"
                  :key="index"
                  @mouseover="mouseover(item.location)"
                >
                  <span>{{ item.name }}</span>
                  <span>1.03公里</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <div class="pane-first">
              <ul>
                <li v-for="(item,index) in mapData.pois" :key="index">
                  <span>{{ item.name }}</span>
                  <span>1.03公里</span>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
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
      dataConter: {},
      bjsz: [],
      mrzxd: '',
      conTer: [],
      activeName: 'first',
      mapData: {},
      tabname: '风景名胜',
      zbwz: [],
      map: ''
    }
  },
  watch: {
    data: {
      handler (nv) {
        console.log(nv, 4563)
        this.zxd()
      },
      deep: true
    }
  },
  mounted () {
    // this.init();
    // console.log(this.data.loaction);

    // 拿到中心坐标和
    // // setTimeout(, 1000);
    // console.log(this.zbwz, 893);
    // console.log(this.zbwz.length, 894);

    // console.log(this.data.location.longitude, 4561);
    // this.mapwz();
    //  let arr= this.zbwz
    //     let arr1=[]
    // for(let y=0;y<arr.length;y++){
    //      let temp =arr[y].split(',')
    //       let obj={}//不能放在外面,不然obj都是不变,多变量时可以试一下这个
    //  obj.flong=temp[0]
    //  obj.flati=temp[1]
    //  arr1.push(obj)
    // }
    // arr=arr1

    // }, 600);
    window.onLoad = () => {
      this.init()
    }
    const url =
      'https://webapi.amap.com/maps?v=1.4.15&key=04953eacfccf60a228e33e650207492a&callback=onLoad'
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)

    // -----------------------------------------------------------
  },
  methods: {
    init () {
      this.map = new AMap.Map('container', {
        zoom: 15, // 级别114.118866,22.604052this.data.location.longitude,this.data.location.latitude
        center: [this.data.locations.longitude, this.data.locations.latitude], // 中心点坐标[114.118866,22.604052]
        viewMode: '3D' // 使用3D视图
      })
    },
    zxd () {
      this.dataConter = this.data.locations
      const arrloc = []
      for (const i in this.dataConter.locations) {
        arrloc.push(this.dataConter.locations[i]) // 属性
      }
      this.mrzxd = arrloc
      this.mapwz()
      console.log(this.zbwz, 892)
    },
    // 移入鼠标触发事件
    mouseover (location) {
      // let conterArr=location.split(",")
      // //  console.log(conterArr,22323);
      // let conTER=[
      // ]
      //  for(let o=0;o<1;o++){
      //   let nko={};
      //   nko.zuoz=+conterArr[0];
      //   nko.zuoy=+conterArr[1]
      //   conTER.push(nko)
      //  }
    },
    mapwz () {
      this.$axios({
        url: 'https://restapi.amap.com/v3/place/text',
        params: {
          keywords: '',
          city: this.data.real_city,
          location: this.mrzxd,
          types: this.tabname,
          output: 'json',
          page: 1,
          offset: 15,
          key: '3f5d5e9fbb24747c0663419eda205908'
        }
      }).then((res) => {
        this.mapData = res.data
        console.log(res.data)

        res.data.pois.forEach((v) => {
          this.zbwz.push(v.location)
        })

        // 处理标记点
        let marker
        const markers = []
        console.log(this.zbwz.length)
        for (let i = 0; i < this.zbwz.length; i++) {
          const tmpArr = this.zbwz[i].split(',')
          const jfong1 = tmpArr[0]
          const jfong2 = tmpArr[1]
          marker = new AMap.Marker({
            // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]113.896291,22.604052
            position: new AMap.LngLat(jfong1, jfong2) // jfong1,jfong2
          })
          markers.push(marker)
        }
        this.map.add(markers)
      })
    },

    handleClick (tab, event) {
      this.tabname = ''
      this.tabname = tab.label
      this.mapwz()
    }
  }
}
</script>

<style lang='less' scoped>
.amap-markers:first-child .amap-icon img {
  width: 25px;
  height: 34px;
}
#container {
  width: 100%;
  height: 360px;
}

.poilist {
  padding-left: 15px;
  .pane-first {
    height: 300px;
    overflow: auto;
    font-size: 14px;
    color: #666;

    ul {
      li {
        // padding: 0 15px;
        display: flex;
        justify-content: space-between;
        // margin-bottom: 15px;
        cursor: pointer;
        margin: 0 10px 15px 10px;
      }
    }
  }
}
.map {
  margin: 45px 0;
  // background-color: rgb(126, 168, 185);
  height: 360px;
}
</style>
