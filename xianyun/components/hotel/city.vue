<template>
  <div class="city">
    <div class="city_main">
      <el-row type="flex" class="row-bg" justify="space-between" :gutter="10">
        <el-col :span="14" class="main_left">
          <div class="area">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <span>区域：</span>
                </div>
              </el-col>
              <el-col v-if="data" :span="24">
                <div class="grid-content bg-purple-light area_left">
                  <div class="a" :class="{actives:isActive}">
                    <a
                      href="javascript:;"
                      :class="{bgc_color:isAll}"
                      @click="handelIsAll"
                    >全部</a>
                    <a
                      v-for="(item,index) in data.scenics"
                      :key="index"
                      :class="{bgc_color:isBgcColor===index}"
                      href="javascript:;"
                      @click="isBgcColors(index)"
                    >{{ item.name }}</a>
                  </div>
                  <div class="icon" :class="{active:isActive}" @click="isActive=!isActive">
                    <i class="el-icon-d-arrow-right" />
                    等43个区域
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="strategy" style=" margin-bottom: 20px;">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <span>攻略 :</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <span>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="average_price">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="3">
                <div class="grid-content bg-purple price_left">
                  均价
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                    placement="top-start"
                  >
                    <span>?</span>
                  </el-tooltip>:
                </div>
              </el-col>
              <el-col :span="24">
                <el-row type="flex" class="grid-content bg-purple-light price_right">
                  <el-col :span="6">
                    <el-tooltip
                      class="item"
                      :visible-arrow="false"
                      effect="dark"
                      content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                      placement="bottom-start"
                    >
                      <span>
                        <i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" />
                        <span class="price_budget">¥332</span>
                      </span>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="6">
                    <el-tooltip
                      class="item"
                      :visible-arrow="false"
                      effect="dark"
                      content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                      placement="bottom-start"
                    >
                      <span>
                        <i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" />
                        <span class="price_budget">¥521</span>
                      </span>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="6">
                    <el-tooltip
                      class="item"
                      :visible-arrow="false"
                      effect="dark"
                      content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                      placement="bottom-start"
                    >
                      <span>
                        <i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" />
                        <span class="price_budget">¥768</span>
                      </span>
                    </el-tooltip>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10" class="main_right">
          <div id="container" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],
  data () {
    return {
      isActive: true,
      isAll: true,
      isBgcColor: ''
    }
  },
  mounted () {
    // 等待下面url加载完毕之后再执行
    window.onLoad = function () {
      // eslint-disable-next-line no-undef
      const map = new AMap.Map('container', {
        zoom: 11, // 级别
        center: [118.795774, 32.077895], // 中心点坐标
        viewMode: '3D' // 使用3D视图
      })
      // eslint-disable-next-line no-undef
      const marker = new AMap.Marker({
        // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        // eslint-disable-next-line no-undef
        position: new AMap.LngLat(118.8718107, 31.32846821),
        title: 'xx酒店'
      })
      map.add(marker) // 添加到地图
    }
    const url =
      'https://webapi.amap.com/maps?v=1.4.15&key=26ad1ef75cfc569fdbc44045c188507e&callback=onLoad'
    const jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
  methods: {
    handelIsAll () {
      this.isBgcColor = ''
      this.isAll = true
    },
    isBgcColors (index) {
      this.isBgcColor = index
      this.isAll = false
    }
  }
}
</script>
<style lang="less" scoped>
.city_main {
  margin-bottom: 50px;
  .main_left {
    font-size: 14px;
    color: #666666;
    .area {
      margin-bottom: 20px;
      .area_left {
        overflow: hidden;
        a {
          padding: 0 2px;
          display: inline-block;
          margin-right: 14px;
          word-wrap: break-word;
          &:hover {
            color: #0099ff;
          }
          &:first-child {
            margin-left: 0;
          }
        }
        .icon {
          cursor: pointer;
          .el-icon-d-arrow-right {
            transform: rotate(270deg);
            color: #f90;
          }
        }
        .active {
          .el-icon-d-arrow-right {
            transform: rotate(-270deg);
          }
        }
      }
    }
    .average_price {
      .price_left {
        position: relative;
        span {
          background-color: #ccc;
          font-size: 12px;
          color: #fff;
          display: inline-block;
          width: 1.2em;
          height: 1.2em;
          text-align: center;
          border-radius: 100%;
        }
      }
      .price_right {
        i {
          color: #f90;
        }
        .price_budget {
          margin-left: 0.5em;
        }
      }
    }
  }
  .main_right {
    #container {
      width: 420px;
      height: 260px;
    }
  }
  .actives {
    height: 42px;
    overflow: hidden;
  }
  .bgc_color {
    background-color: #eeeeee;
    color: #999999;
    cursor: auto;
  }
}
</style>
