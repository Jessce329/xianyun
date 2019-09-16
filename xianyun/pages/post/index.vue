<template>
  <el-row class="post">
    <el-col :span="7">
      <!-- tab栏位置 -->
      <div class="grid-content">
        <div class="tab-left">
          <ul>
            <li
              v-for="(item,index) in cityList"
              :key="index"
              @mouseenter="mouseOver(index)"
              @mouseleave="mouseLeave"
            >
              <span>
                {{ item.type }}
                <i>></i>
              </span>
            </li>
          </ul>
          <!-- //cityList[cat].children -->
          <div class="seen">
            <!-- <ul  v-for="(item,index) in scenicList" :key="index"> -->
            <ul class="newList">
              <li v-for="(item,index) in scenicList" :key="index">
                <i>{{ index+1 }}</i>
                <a href="#">{{ item.city }}</a>
                <a href="#">{{ item.desc }}</a>
              </li>
            </ul>

            <!-- <ul v-show="cat==1" class="seen">
              <li>222222</li>
            </ul>-->
          </div>
        </div>
      </div>
      <div class="buttonNav">
        <span>推荐城市</span>
        <a href="#">
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt>
        </a>
      </div>
    </el-col>
    <el-col :span="17" class="youhezi">
      <div style="margin-top: 20px;">
        <el-input
          v-model="newValue"
          type="text"
          placeholder="请输入想去的地方,例如 '广州' "
          class="inputSelect"
          :value="newValue"
        >
          <el-button slot="append" icon="el-icon-search" style="color:#000" @click="handList" />
        </el-input>
        <div class="recommendList">
          <span>推荐</span>
          <a v-for="(v,i) in ['广州','上海','北京']" :key="i" href="#" @click="postName(v)">{{ v }}</a>
        </div>
      </div>
      <!-- 推荐攻略列表 -->
      <div class="navList">
        <span>推荐攻略</span>
        <el-button type="primary" icon="el-icon-edit" class="navBtn" @click="tiaozhuan">
          写游记
        </el-button>
      </div>
      <div v-for="(item,index) in dataList" :key="index" class="strategyList">
        <a :href="`post/detail?id=`+`${item.id}`">
          <h3>{{ item.title }}</h3>
        </a>
        <!-- <p>
          <a :href="`post/detail?id=`+`${item.id}`">{{ item.content }}</a>
        </p> -->
        <p v-html="item.content" />
        <div
          class="cardImg"
          card-images
          el-row
          is-justify-space-between
          is-align-middle
          el-row--flex
        >
          <a
            v-for="(item1,index1) in item.images"
            v-if="index1<3"
            :key="index1"
            :href="`post/detail?id=`+`${item.id}`"
          >
            <img v-if="index1<3" :src="`${item1}`" alt>
          </a>
        </div>
        <div class="foonav">
          <span>
            <i class="el-icon-location-outline">{{ item.cityName }}</i>
            <div class="post-user">
              by
              <a href="#">
                <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt>
              </a>
              <!-- <a href="#">{{ item.account.nickname }}</a> -->
              <span>
                <i class="el-icon-view">7099</i>
              </span>
            </div>
          </span>
          <p>{{ item.watch }}赞</p>
        </div>
      </div>
      <div class="block">
        <!-- current-page: 当前页数 -->
        <!-- page-size：当前条数 -->
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Item',
  data () {
    return {
      isShow: false,
      index: 0,
      current: 0,
      cityList: [],
      dataList: [],
      scenicList: [],
      cat: 0,
      imgList: [],
      total: 0,
      pageIndex: 1,
      pageSize: 3,
      // 新建的一个动态渲染图片的数组
      newArr: [],
      newValue: '',
      particularsList: {
        content: []
      },
      city: '1'
    }
  },
  mounted () {
    this.init()
    // this.handList()
    this.getData()
    // this.setDataList();
  },
  methods: {
    // 输入框绑定事件
    postName (v) {
      // this.v= newValue
      this.newValue = v
    },
    // 分页功能
    getData () {
      this.$axios({
        url: '/posts',
        params: this.$route.query
      }).then((res) => {
        console.log(res)
        this.particularsList = res.data.data
        this.total = res.data.total
        this.setDataList()
      })
    },
    setDataList () {
      // this.particularsList.forEach(v=>{
      //     console.log(v.content)
      // })
      //    pageIndex: 当前页数减一再乘当前条数就得到当前要看到的条数
      //    page-size：当前条数
      const start = (this.pageIndex - 1) * this.pageSize
      const end = start + this.pageSize
      // this.dataList = this.particularsList[].content.slice(start, end)
      this.dataList = this.particularsList.slice(start, end)
    },
    // 设置每次数据更新都改变数据
    handleSizeChange (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.setDataList()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.setDataList()
    },
    // 跳转写游记页面
    tiaozhuan () {
      this.$router.push('/post/create')
    },
    // 获取推荐列表的数据
    handList () {
      this.$axios({
        url: '/cities',
        params: {
          name: this.newValue
        }
      }).then((res) => {
        console.log(res, 123456)
        this.city = res.data.data[0].id
        // 拿到选中id城市的数组的内容
        this.dataList = res.data.data[0].posts
      })
    },
    // 鼠标移入事件
    mouseOver (index) {
      this.isShow = true
      this.cat = index
      // 拿到鼠标移入的第几个li里面index就表示是第几个li标签,拿到当前li标签里面的子数组拿到这个数据进行循环遍历
      this.scenicList = this.cityList[index].children
    },
    // 鼠标移出事件
    mouseLeave () {
      this.isShow = false
    },
    // 渲染左边tab栏数据的
    init () {
      this.$axios({
        url: '/posts/cities',
        data: this.data
      }).then((res) => {
        this.cityList = res.data.data
        this.scenicList = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scope>
.post {
  max-width: 1000px;
  margin: 0 auto;
  .youhezi{
    z-index: -1;
  }
  .foonav {
    display: flex;
    height: 26px;
    line-height: 26px;
    position: relative;
    span {
      float: left;
      font-size: 12px;
      i {
        margin-top: 8px;
        margin-right: 4px;
        float: left;
      }
      .post-user {
        width: 250px;
        > a {
          width: 15px;
          height: 15px;
          margin: 0 6px;
          vertical-align: middle;
          img {
            width: 17px;
            height: 17px;
          }
        }
      }
    }

    p {
      position: absolute;
      right: 0;
      color: orange;
      font-size: 18px;
    }
  }
  .strategyList {
    margin-top: 8px;
    border-top: 1px solid #ccc;
    > a {
      h3 {
        margin-top: 20px;
        margin-bottom: 15px;
        font-weight: 400;
        color: rgb(30, 27, 27);
        font-size: 18px;
      }
    }
    p {
      height: 63px;
      display: block;
      overflow: hidden;
      font-size: 14px;
      margin-bottom: 15px;
      a {
        font-size: 14px;
        color: #666;
      }
    }
    .cardImg {
      a {
        margin-right: 7px;
        margin-top: 10px;
        display: inline-block;
        width: 220px;
        height: 150px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .navList {
    margin-top: 15px;
    > span {
      font-size: 18px;
      color: orange;
      padding-bottom: 15px;

      border-bottom: 3px solid orange;
    }
    .navBtn {
      margin-left: 515px;
    }
  }
  .buttonNav {
    span {
      display: block;
      width: 260px;
      font-size: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    a {
      margin-top: 10px;
      display: block;
      width: 260px;
      img {
        width: 100%;
      }
    }
  }
  .recommendList {
    margin-top: 5px;
    span {
      font-size: 12px;
      color: #666;
    }
    a {
      font-size: 12px;
      color: #666666;
      margin-left: 5px;
    }
    a:hover {
      color: orange;
    }
  }
  .inputSelect {
    border: 3px solid orange;
    .el-input__inner {
      border: 0px;
      height: 35px;
    }
    .el-icon-search:before {
      content: "\e778";
      font-size: 22px;
      color: orange;
      font-weight: 700;
    }
  }
  .tab-left {
    position: relative;
    z-index: 5;
    background-color: #fff;
    .seen {
      width: 300px;
      height: 200px;
      border: 1px solid #ccc;
      position: absolute;
      left: 259px;
      top: 0px;
      background-color: #fff;
      display: none;
      li {
        height: 20px;
        line-height: 20px;
        padding: 10px 0;
        i {
          font-size: 20px;
          margin-left: 15px;
          font-style: italic;
          color: orange;
        }
        a {
          font-size: 14px;
          line-height: 20px;
          &:nth-child(2) {
            color: orange;
          }
          &:nth-child(3) {
            color: #ccc;
          }
        }
      }

    }
    width: 260px;
    margin: 20px 0;
    > ul {
      border-bottom: 1px solid #ccc;
      z-index: 3;
      background-color: #fff;
      li {
        height: 40px;
        border: 1px solid #ccc;
        line-height: 40px;
        padding: 0 20px;
        font-size: 14px;
        border-bottom: none;
        position: relative;
        &:hover{
          border-right: none;
        }
        i {
          position: absolute;
          left: 230px;
          font-size: 20px;
        }
      }
    }
  }
  .tab-left:hover .seen {
    display: block;
    z-index: -1;
  }
  .block {
    border-top: 1px solid #ccc;
    padding: 15px 0;
    margin-top: 25px;
  }
}
</style>
