<template>
  <div class="detailsImages">
    <el-row type="flex" justify="space-between">
      <el-col
        :span="16"
        class="photo-left"
      >
        <img :src="currentImg" alt="" class="images-left">
      </el-col>
      <el-col :span="8" class="photo-right">
        <el-row type="flex" class="right-images" justify="space-between">
          <el-col
            v-for="(item,index) in options"
            :key="index"
            :span="12"
            @mouseover.native="handleaOptions(index)"
          >
            <img :src="item" class="images-right">
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        'http://157.122.54.189:9093/images/hotel-pics/1.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/2.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/3.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/4.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/5.jpeg',
        'http://157.122.54.189:9093/images/hotel-pics/6.jpeg' ],
      currentImg: ''
    }
  },
  mounted () {
    this.currentImg = this.options[0]
  },
  methods: {
    handleaOptions (index) {
      // console.log(index)
      this.currentImg = this.options[index]
    }
  }
}
</script>

<style lang="less" scoped>
.images-left{
    height: 360px;
    width: 640px;
}
.right-images{
    flex-wrap: wrap;

    .el-col{
        margin-bottom: 10px;
    }
}
.images-right{
    width: 160px;
    height: 110px;
    cursor: pointer;
}
.photo-right{
    flex: 2
}
</style>
