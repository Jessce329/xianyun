<template>
  <el-row>
    <el-col :span="18" class="left">
      <h2>发现新攻略</h2>
      <p class="share">分享你的个人游记，让更多人看到哦~</p>
      <el-input v-model="article.shareTitle" class="title" placeholder="请输入标题"></el-input>

      <!-- 富文本框组件 -->
      <div class="editor">
        <VueEditor class="size" ref="vueEditor" :config="config" />
      </div>

      <!-- 搜索选择城市 -->
      <div class="search">
        <span>选择城市</span>
        <el-autocomplete
          v-model="article.departCity"
          :fetch-suggestions="querySearchAsync"	
          placeholder="请搜索游玩城市"
        ></el-autocomplete>
      </div>

      <!-- 发布按钮 -->
      <div class="public">
        <el-button type="primary" size="small" @click="handlePublic">发布</el-button>
        <span>或者</span>
        <a href="#" class="save" @click="handleSave">保存到草稿</a>
      </div>
    </el-col>
    <div class="aside">
      <el-col :span="4" class="draft-box">
        <h4 class="draftTitle">草稿箱（{{posts && posts.length}}）</h4>
        <div class="draftList">
          <div class="draftItem" v-for="(item,index) in posts" :key="index">
            <div class="draftPostTitle" @click="handleEditor(index)">
              {{item.shareTitle}}
              <i class="el-icon-edit"></i>
            </div>
            <p class="postTime">{{item.time}}</p>
          </div>
        </div>
      </el-col>
    </div>
  </el-row>
</template>

<script>
import "quill/dist/quill.snow.css";
import moment from "moment";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "app",
  data() {
    return {
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      },
      posts: [],
      article: {
        shareTitle: "",
        departCity: "",
        departCode: "",
        content: "",
        time: ""
      },
      city: []
    };
  },
  methods: {
    // 选择城市的搜索建议的事件
    // value是输入框的值
    // cb是一个回调函数必须要调用，参数的值会显示在下拉框中。
    // cb调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性
    querySearchAsync(value, cb) {
      if (!value) {
        // 传递空数组时不会出现下拉框
        return cb([]);
      }

      this.$axios({
        url: "/cities",
        params: {
          name: value
        }
      }).then(res => {
        // 数组
        const { data } = res.data;
        // 给数组中每个对象添加value属性
        const newData = [];
        data.forEach(v => {
          // 添加value属性
          v.value = v.name;
          // 把带有value属性的对象添加到新数组中
          newData.push(v);
          this.article.departCity = newData[0].value;
          this.article.departCode = newData[0].sort;
        });
        //显示到下拉列表中
        cb(newData);
      });
    },
    // 点击保存到草稿
    handleSave() {
      this.article.content = this.$refs.vueEditor.editor.root.innerHTML;
      this.article.time = moment(new Date()).format("YYYY-MM-DD");
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.push(this.article);
      localStorage.setItem("posts", JSON.stringify(posts));
      this.posts = JSON.parse(localStorage.getItem("posts"));
      this.$message.success("保存成功");
      this.article.shareTitle = "";
      this.article.departCity = "";
      this.$refs.vueEditor.editor.root.innerHTML = "";
    },
    // 点击按钮发布
    handlePublic() {
      const { departCity, shareTitle } = this.article;

      // 判断输入框不能为空
      if (!shareTitle) {
        this.$alert("请填写标题", "提示");
        return;
      }
      if (!departCity) {
        this.$alert("请选择城市", "提示");
        return;
      }

      this.$axios({
        url: "/posts",
        method: "POST",
        // 可以给接口单独加上请求头
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: {
          content:  this.$refs.vueEditor.editor.root.innerHTML,
          title: this.article.shareTitle,
          city: this.article.departCity
        }
      }).then(res => {
        console.log(res);
        this.$message.success('发布成功')
      }).catch(err=>{
        console.log(err)
      })
    },
    handleEditor(index){
        this.article.shareTitle = this.posts[index].shareTitle;
        this.$refs.vueEditor.editor.root.innerHTML = this.posts[index].content;
        this.article.departCity = this.posts[index].departCity;
    }
  },
  mounted() {
    this.posts = JSON.parse(localStorage.getItem("posts"));
  },
  components: {
    VueEditor
  }
};
</script>

<style lang="less" scoped>
.left {
  h2 {
    font-size: 23px;
    margin-top: 15px;
    font-weight: 500;
  }
  .size {
    height: 400px;
  }
  .share {
    color: #999;
    font-size: 12px;
    margin: 10px 0;
  }
  .title {
    width: 750px;
    height: 40px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 60px;
  }
  .public {
    margin: 20px 0;
    .save {
      color: orange !important;
      font-size: 14px;
    }
  }
}
.aside {
  .draft-box {
    border: 1px solid #eee;
    padding: 15px;
    margin-top: 20px;
    width: 200px;
    float: right;
    .draftTitle {
      font-weight: 400;
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
    .draftItem {
      font-size: 14px;
      margin-bottom: 10px;
      .postTime {
        color: #999;
      }
      .draftPostTitle {
        &:hover {
          color: orange;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>