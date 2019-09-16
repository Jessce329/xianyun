<template>
  <div class="detail el-row is-justify-space-between el-row--flex">
    <div class="main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          旅游攻略
        </el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <h1 v-for="(item,index) in cty" :key="index">
        {{ item.title }}
      </h1>
      <div class="post-info">
        <span>攻略：2019-05-22 10:57</span>
        <span>阅读：7233</span>
      </div>
      <div v-for="(item,index) in cty" v-show="item.title" :key="index" class="post-content">
        <div class="content" v-html="item.content" />
      </div>
      <div class="post-ctrl">
        <div class="el-row is-justify-center el-row--flex">
          <i class="el-icon-edit-outline">
            <p>评论(100)</p>
          </i>
          <i class="el-icon-star-off">
            <p>收藏</p>
          </i>
          <i class="el-icon-share">
            <p>分享</p>
          </i>
          <i class="el-icon-thumb">
            <p>点赞(51)</p>
          </i>
        </div>
      </div>
      <div class="cmt-wrapper">
        <div class="cmt-title">
          评论
        </div>
        <div>
          <form>
            <!-- 评论框 -->
            <el-input v-model="input" placeholder="说点什么吧。。。" class="cmt-input" />
            <!-- 图片上传组件 -->
            <div class="cmt-input-ctrls el-row is-justify-space-between el-row--flex">
              <div class="cmt-pics">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  class="upload"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </div>
              <div>
                <button class="el-button cmt-submit el-button--primary el-button--mini" @click="SubmitFrom">
                  <span>提交</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="asaid">
      <div class="aside-title">
        相关攻略
      </div>
      <div class="recommend-list">
        <ol>
          <li>
            <nuxt-link to="#" class="recommend-item">
              <div class="post-img">
                <img
                  src="http://157.122.54.189:9095/uploads/129dbf6a150e49248343c224780c4baa.jpg"
                  alt
                  width="100px"
                  height="80px"
                >
              </div>
              <div class="text">
                <div>美美的一天</div>
                <p>2019-09-12 2:44 阅读 1</p>
              </div>
            </nuxt-link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cty: [],
      input: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted () {
    this.$axios({
      url: '/posts',
      params: {
        id: 4
      }
    }).then((res) => {
      // console.log(res.data, 111);
      this.cty = res.data.data
    })
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    SubmitFrom () {
      // 提交给后台的字段
      // const data={
      //   content=this.content,
      //   score:this.score,
      //   location:this.location,
      //   service:this.service,
      //   fancility:this.fancility,
      //   all:this.all,
      //   pics:this.pics,
      //   hotel:this.hotel,
      //   post:this.post,
      //   follow:this.follow
    }
    // this.$axios({
    //   url:'comments',
    //   method:'POST',
    //   headers:{
    //     Authorization:`Bearer ${this.$store.state.user.userInfo.token}`,
    //     'Content-Type':'application/json'
    //   },
    //   data:{
    //     data
    //   }
    // })
  }
}
</script>

<style lang='less'>
.detail {
  width: 1000px;
  height: auto;
  margin: 0 auto;
  margin-top: 20px;
}
.main {
  width: 700px;
  height: auto;
}
h1 {
  padding: 20px 0px;
  border-bottom: 1px solid #ddd;
}
.post-info {
  padding: 20px 0px;
  text-align: right;
  color: #999;
}
.post-ctrl {
  padding: 50px 0px;
  i {
    color: gold;
    font-size: 30px;
    margin: 0 20px;
    text-align: center;
    p {
      font-size: 12px;
      text-align: center;
      padding: 3px 0 0 0;
    }
    span {
      font-size: 12px;
    }
  }
}
.cmt-wrapper {
  .cmt-title {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 20px;
  }
}
.content {
  line-height: 1.5;
  img {
    width: 700px;
  }
  p {
    &:nth-child(7) {
      img {
        width: 36px;
      }
    }
  }
}

.asaid {
  width: 280px;
  float: left;
  .aside-title {
    font-size: 18px;
    font-weight: 400px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .recommend-list {
    padding: 20px 0px;
    border-bottom: 1px solid #ddd;
    .recommend-item {
      display: flex;
      .text {
        flex: 1;
        p {
          font-size: 12px;
          line-height: 44px;
        }
      }
      .post-img {
        flex: 1;
      }
    }
  }
}
.cmt-input{
  padding-bottom: 10px
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-upload--picture-card{
  width: 100px;
  height: 100px;
  line-height: 100px
}
</style>
