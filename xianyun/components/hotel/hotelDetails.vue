<template>
  <div class="details">
    <div class="details-top">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/hotel' }">
          酒店
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ name }}市酒店预订</el-breadcrumb-item>
        <el-breadcrumb-item>{{ name }}122</el-breadcrumb-item>
      </el-breadcrumb>
      <div
        class="allHotel"
      >
        <h4 class="details-title">
          {{ data.name }}
        </h4>
        <el-row type="flex" class="title-content">
          <el-col :span="24">
            {{ data.alias }}
          </el-col>
        </el-row>
        <el-row type="flex" class="title-content ">
          <el-col :span="24" class="el-icon-location">
            {{ data.address }}
          </el-col>
        </el-row>
      </div>
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
      hotelName: []
    }
  },
  mounted () {
    // console.log(this.props)
  }
}
</script>

<style lang="less" scoped>
.details-top{
    margin: 20px 0;
    margin-bottom: 35px;
}
.breadcrumb{
    padding-bottom: 20px;
}
.details-title{
    font-weight: normal;
    font-size: 24px;
}
.title-content{
    color: #666666;
    margin-bottom:5px;
}
</style>
