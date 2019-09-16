<template>
  <div class="air-search">
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active:currentTab === index}"
        @click="handleChangeTabs(item,index)"
      >
        <i :class="item.icon" />{{ item.name }}
      </span>
    </el-row>
    <!-- 机票的表单 -->
    <el-form ref="form" :model="form" class="search-form-city" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions: 获取搜索建议，并且显示在输入框的下拉框中 -->
        <!-- select：在下拉框中选中时候时候触发的事件 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请输入出发城市"
          @select="handleDepartSelect"
        />
      </el-form-item>
      <!-- 到达城市 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请输入到达城市"
          @select="handleDestSelect"
        />
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          @change="handleDate"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="search-airplane"
          @click="handleSubmit"
        >
          <i
            class="el-icon-search icon-search"
          >搜索</i>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      form: {
        departCity: '',
        departCode: '',
        destCity: '',
        destCode: '',
        departDate: ''
      },
      arr: [],
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0
    }
  },
  methods: {
    //   切换tabs时触发的
    handleChangeTabs (item, index) {
      if (index === 1) {
        this.$alert('目前暂时不支持往返', '提示')
      }
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch (value, cb) {
    //   console.log(value)
      if (!value) {
        cb(this.arr)
        return
      }
      // 根据用户选择需要的城市
      this.$axios({
        url: 'airs/city',
        params: {
          name: value
        }
      }).then((res) => {
        // console.log(res)
        // 把请求的data解构出来
        const { data } = res.data
        // 给数组每一个对象添加一个value属性
        const newData = []
        data.forEach((v) => {
          // 添加value属性
          v.value = v.name.replace('市', '')
          // 把带有value属性的对象添加到新的数组中
          newData.push(v)
        //   console.log(newData)
        })
        // 默认选中第一个
        this.form.departCity = newData[0].value
        this.form.departCode = newData[0].sort

        // 显示到下拉列表中
        cb(newData)
      })
    },
    // 到达城市输入框获得焦点时触发
    // value是选中的值,cb是回调函数,接收要展示的数据
    queryDestSearch (value, cb) {
      if (!value) {
        cb(this.arr)
        return
      }
      this.$axios({
        url: 'airs/city',
        params: {
          name: value
        }
      }).then((res) => {
        const { data } = res.data
        const newData = []
        data.forEach((v) => {
          v.value = v.name.replace('市', '')
          newData.push(v)
        })
        this.form.destCity = newData[0].value
        this.form.destCode = newData[0].sort

        cb(newData)
      })
    },
    // 出发城市下拉选择时触发
    // item是当然选中的对象
    handleDepartSelect (item) {
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },
    handleDestSelect (item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },
    // 确认选择日期时触发
    // value会返回当然选中的日期
    handleDate (value) {
      this.form.departDate = moment(value).format(`YYYY-MM-DD`)
    },
    handleSubmit () {
      const { departCity, destCity, departDate } = this.form

      // 判断输入框不能为空
      if (!departCity) {
        this.$alert('出发城市不能为空', '提示')
        return
      }
      if (!destCity) {
        this.$alert('到达城市不能为空', '提示')
        return
      }
      if (!departDate) {
        this.$alert('出发日期不能为空', '提示')
      }
      // // 实现本地存储
      // const airs = JSON.parse(localStorage.getItem('airs') || `[]`)
      // airs.push(this.form)
      // localStorage.setItem('airs', JSON.stringify(airs))
      // 跳转到机票列表页 /air/flights
      this.$store.commit('flights/setFlight', this.form)
      this.$router.push({
        path: '/air/flights',
        // url携带的参数
        query: this.form
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .air-search{
        background-color: #fff;
        width: 435px;
        margin-right: 25px;
        border: 1px solid #dddddd
    }
    .search-tab{
        span{
            display: block;
            flex:1;
            text-align: center;
            height:48px;
            line-height: 42px;
            box-sizing: border-box;
            border-top:3px #eee solid;
            background:#eee;
            cursor: pointer;
        }
        .active{
            border-top: 3px solid orange ;
            background-color: #fff ;

        }
    }
    .search-form-city{
        margin: 15px;
        .search-airplane{
            width: 80%;
            .icon-search{
                padding-right: 10px
            }
        }
    }
    .right{
        background-color: yellow;
    }
</style>
