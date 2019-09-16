<template>
  <div class="index">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{ City.indexOf('市')>-1? City:City+'市' }}酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 筛选部分 -->
    <div class="search">
      <el-form ref="form" :model="hotelForm" :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-autocomplete
            v-model="City"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          />
        </el-form-item>
        <el-form-item class="time">
          <div class="block">
            <el-date-picker
              v-model="hotelForm.time"
              type="daterange"
              range-separator="-"
              start-placeholder="入住日期"
              end-placeholder="离店日期"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="人数未定"
            suffix-icon="el-input__icon iconfont iconuser"
            :readonly="true"
            @focus="handelNub"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handelSearch">
            查看价格
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 城市 -->
    <Citys :data="$store.state.hotel.AllHotel[0]" />
    <!-- 酒店类型 -->
    <div class="hotel_type">
      <el-row type="flex" class="type_content">
        <el-col :span="8">
          <div class="price">
            <div class="title">
              <span>价格</span>
              <span>0-{{ priceValue }}</span>
            </div>
            <el-slider
              v-model="priceValue"
              show-input
              :min="0"
              :max="4000"
              input-size="mini"
              @change="handelpriceChange"
            />
          </div>
        </el-col>
        <el-col :span="6" class="hotle_content">
          <span style=" display: block;margin-bottom:10px;">住宿等级</span>
          <el-dropdown style="width:100%" @command="handleGradeCommand">
            <div class="el-dropdown-link dropdown_title">
              <span v-if="hotelGrade.length===0">不限</span>
              <span v-else>{{ hotelGrade.length>1?'已选择'+hotelGrade.length:hotelGrade[0] }}</span>
              <i class="el-icon-arrow-down el-icon--right" style="float: right" />
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 150px">
              <el-dropdown-item
                v-for="(item,index) in hotelOptions.levels"
                :key="index"
                :command="item.name"
              >
                <i :class="hotelGrade.includes(item.name)?calss2:calss" />
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="6">
          <span style=" display: block;margin-bottom:10px;">住宿类型</span>
          <el-dropdown style="width:100%" @command="handleTypeCommand">
            <div class="el-dropdown-link dropdown_title">
              <span v-if="hotelType.length===0">不限</span>
              <span v-else>{{ hotelType.length>1?'已选择'+hotelType.length:hotelType[0] }}</span>
              <i class="el-icon-arrow-down el-icon--right" style="float: right" />
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 150px">
              <el-dropdown-item
                v-for="(item,index) in hotelOptions.types"
                :key="index"
                :command="item.name"
              >
                <i :class="hotelType.includes(item.name)?calss2:calss" />
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="6">
          <span style=" display: block;margin-bottom:10px;">酒店设施</span>
          <el-dropdown style="width:100%" @command="handleFacilityCommand">
            <div class="el-dropdown-link dropdown_title">
              <span v-if="hotelFacility.length===0">不限</span>
              <span v-else>{{ hotelFacility.length>1?'已选择'+hotelFacility.length:hotelFacility[0] }}</span>
              <i class="el-icon-arrow-down el-icon--right" style="float: right" />
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 150px">
              <el-dropdown-item
                v-for="(item,index) in hotelOptions.assets"
                :key="index"
                :command="item.name"
              >
                <i :class="hotelFacility.includes(item.name)?calss2:calss" />
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="6">
          <span style=" display: block;margin-bottom:10px;">酒店品牌</span>
          <el-dropdown style="width:100%" @command="handleBrandCommand">
            <div class="el-dropdown-link dropdown_title">
              <span v-if="hotelBrand.length===0">不限</span>
              <span v-else>{{ hotelBrand.length>1?'已选择'+hotelBrand.length:hotelBrand[0] }}</span>
              <i class="el-icon-arrow-down el-icon--right" style="float: right" />
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 170px;height:240px;overflow-y:scroll">
              <el-dropdown-item
                v-for="(item,index) in hotelOptions.brands"
                :key="index"
                :command="item.name"
              >
                <i :class="hotelBrand.includes(item.name)?calss2:calss" />
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <!-- 酒店详情 -->
    <HotelList :data="$store.state.hotel" />
  </div>
</template>
<script>
import Citys from '@/components/hotel/city'
import HotelList from '@/components/hotel/hotelList'
export default {
  components: {
    Citys,
    HotelList
  },
  data () {
    return {
      calss: 'iconfont iconcircle',
      calss2: 'iconfont iconright-1',
      hotelGrade: [], // 住宿等级下拉项数组
      hotelType: [], // 住宿类型下拉项数组
      hotelFacility: [], // 酒店设施下拉项数组
      hotelBrand: [], // 酒店品牌下拉项数组
      value: '1',
      hotelOptions: [],
      priceValue: 100,
      hotelForm: {
        time: []
      },
      City: '南京'
    }
  },
  watch: {
    City () {
      this.getAllCity()
    }
  },
  mounted () {
    // 获取酒店所有的选项
    this.$axios({
      url: '/hotels/options'
    }).then((res) => {
      // console.log(res)
      this.hotelOptions = res.data.data
    })
    this.getAllCity()
  },
  methods: {
    // // 封装下拉项数组方法
    // // getOptgroup (arr, value) {
    // //   const index = arr.indexOf(value)
    // //   if (index > -1) {
    // //     // eslint-disable-next-line no-unused-vars
    // //     const newArr = arr.filter((v) => {
    // //       return v !== value
    // //     })
    // //     // eslint-disable-next-line no-return-assign
    // //     return arr = newArr
    // //   } else {
    // //     arr.push(value)
    // //   }
    //   // console.log(name)
    //   // const index = this.hotelBrand.indexOf(val)
    //   // if (index > -1) {
    //   //   this.hotelBrand = this.hotelBrand.filter((v) => {
    //   //     return v !== val
    //   //   })
    //   // } else {
    //   //   this.hotelBrand.push(val)
    //   // }
    // },
    // 价格滑动时触发
    handelpriceChange () {
      this.getAllCity()
    },
    // 酒店品牌下拉项触发事件
    handleBrandCommand (val) {
      const index = this.hotelBrand.indexOf(val)
      if (index > -1) {
        this.hotelBrand = this.hotelBrand.filter((v) => {
          return v !== val
        })
      } else {
        this.hotelBrand.push(val)
      }
    },
    // 酒店设施下拉项触发事件
    handleFacilityCommand (val) {
      // this.hotelFacility.push(val)
      const index = this.hotelFacility.indexOf(val)
      if (index > -1) {
        this.hotelFacility = this.hotelFacility.filter((v) => {
          return v !== val
        })
      } else {
        this.hotelFacility.push(val)
      }
    },
    // 住宿类型下拉项触发事件
    handleTypeCommand (val) {
      // this.hotelType.push(val)
      const index = this.hotelType.indexOf(val)
      if (index > -1) {
        this.hotelType = this.hotelType.filter((v) => {
          return v !== val
        })
      } else {
        this.hotelType.push(val)
      }
    },
    // 住宿类型下拉项触发事件
    handleGradeCommand (val) {
      // this.hotelGrade.push(val)
      const index = this.hotelGrade.indexOf(val)
      if (index > -1) {
        this.hotelGrade = this.hotelGrade.filter((v) => {
          return v !== val
        })
      } else {
        this.hotelGrade.push(val)
      }
    },
    // 查看价格
    handelSearch () {
      console.log(123)
      console.log(this.$store.state.hotel)
    },
    // 选定住宿人数
    handelNub () {
      console.log(123564)
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    querySearchAsync (value, cb) {
      this.$axios({
        url: '/cities',
        params: { name: this.City }
      }).then((res) => {
        const { data } = res.data
        // console.log(data, 123)
        const newData = []
        data.forEach((v) => {
          // 添加value属性
          v.value = v.name.replace('市', '')
          // 把带有value属性的对象添加到新的数组中
          newData.push(v)
          //   console.log(newData)
        })
        cb(newData)
      })
    },
    // 出发城市下拉选择时触发
    // item是当然选中的对象
    handleSelect (item) {
      this.City = item.value
    },

    // 获取所有城市
    getAllCity () {
      // console.log(7677777777)
      // 获取所有城市
      this.$axios({
        url: '/cities',
        params: { name: this.City }
      }).then((res) => {
        // console.log(8888888888)
        console.log(res, 22222222)
        this.$store.commit('hotel/setAllHotel', res.data.data)
        this.$store.commit('hotel/setCityId', res.data.data[0].id)
        console.log(this.$store.state.hotel, 1111)
        this.$router.push({
          path: '/hotel',
          query: { city: res.data.data[0].id }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.index {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    padding: 20px 0;
  }
  .search {
    /deep/.time {
      margin-right: 0;
    }
  }
  .hotel_type {
    padding: 5px 20px;
    border: 1px solid #ddd;
    color: #666;
    /deep/.type_content {
      margin-left: -20px;
      margin-right: -20px;
      .el-col {
        padding: 5px 0;
        border-right: 1px solid #ddd;
        font-size: 14px;
        padding-left: 20px;
        padding-right: 20px;
        color: #606266;
        &:last-child {
          border-right: none;
        }
        .price {
          .el-slider__input.el-input-number--mini {
            width: 100px;
          }
          .el-slider__runway.show-input {
            margin-right: 110px;
          }
          .title {
            span {
              // margin-bottom: 10px;
              &:last-child {
                float: right;
              }
            }
          }
        }
        .dropdown_title {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
