<template>
  <div class="orderForm">
    <div class="air-column">
      <h2>乘机人</h2>

      <!-- 乘机人表单 -->
      <el-form class="member-info">
        <div
          v-for="(item,index) in users"
          :key="index"
          class="member-info-item"
        >
          <!-- 乘机人类型 -->
          <span class="Ltype">乘机人类型</span>
          <el-form-item>
            <el-input
              v-model="users[index].username"
              placeholder="姓名"
              class="input-with-select"
              value="1"
            >
              <el-select slot="prepend" v-model="value1" placeholder="成人">
                <el-option label="成人" value="1" />
                <el-option label="儿童" value="2" />
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 证件类型 -->
          <span class="Ltype">证件类型</span>
          <el-form-item>
            <el-input
              v-model="users[index].id"
              placeholder="证件号码"
              class="input-with-select"
            >
              <el-select
                slot="prepend"
                v-model="value"
                placeholder="身份证"
              >
                <el-option
                  v-for="e in options"
                  :key="e.value"
                  :label="e.label"
                  :value="e.value"
                />
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 删除乘机人按钮 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>
      <el-button class="add-member" type="primary" @click="handleAddUsers">
        添加乘机人
      </el-button>
    </div>

    <!-- 保险栏 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          v-for="(item,index) in data.insurances"
          :key="index"
          class="insurance-item"
        >
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1最高赔付${item.compensation}`"
            border
            @change="handleInsurance(item.id)"
          />
        </div>
      </div>
    </div>
    <!-- 联系人栏 -->
    <div
      class="air-column"
    >
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName" />
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="captcha" />
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">
          提交订单
        </el-button>
      </div>
    </div>
    <!-- 模板中引用总价格触发计算 -->
    <span v-show="false">{{ allPrice }}</span>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
      seat_infos: ''
    }
  },
  data () {
    return {
      options: [
        { value: '1', label: '身份证' },
        { value: '2', label: '护照' }
      ],
      value1: '',
      value: '',
      users: [{
        username: '',
        id: '',
        idType: '1'
      }],
      insurances: [], // 保险数据
      contactName: '', // 联系人名字
      contactPhone: '', // 联系人电话
      invoice: false, // 发票
      seat_xid: '',
      captcha: '000000', // 验证码

      // 机票的数据
      infoData: {}
    }
  },
  computed: {
    // 总价格
    allPrice () {
      if (!this.infoData.seat_infos) {
        return 0
      }
      let price = 0
      // 机票单价，取座位信息的第一个价格
      price += this.infoData.seat_infos.org_settle_price

      // 燃油费
      price += this.infoData.airport_tax_audlet

      // 保险数据
      price += 30 * this.insurances.length

      price *= this.users.length

      // 把值存到store
      this.$store.commit('air/setAllPirce', price)

      return price
    }
  },
  mounted () {
    const { id, seatId } = this.$route.query

    // 请求机票数据
    this.$axios({
      url: '/airs/' + id,
      params: {
        seatId
      }
    }).then((res) => {
      // 保存机票的数据
      this.infoData = res.data

      // 调用store的方法，把infoData存到store中
      this.$store.commit('air/setInfoData', this.infoData)
    })
  },
  methods: {

    // 发送手机验证码
    handleSendCaptcha () {
      if (!this.contactPhone) {
        this.$confirm('手机号码不能为空', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return
      }

      if (this.contactPhone.length !== 11) {
        this.$confirm('手机号码格式错误', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
        return
      }

      this.$axios({
        url: `/captchas`,
        method: 'POST',
        data: {
          tel: this.contactPhone
        }
      }).then((res) => {
        const { code } = res.data
        this.$confirm(`模拟手机验证码为：${code}`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
      })
    },
    // 提交表单
    handleSubmit () {
      const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      }

      //   console.log(orderData)
      const { user: { userInfo } } = this.$store.state

      this.$message({
        message: '正在生成订单！请稍等',
        type: 'success'
      })

      this.$axios({
        url: `/airorders`,
        method: 'POST',
        data: orderData,
        headers: {
          Authorization: `Bearer ${userInfo.token || 'NO TOKEN'}`
        }
      }).then((res) => {
        // 跳转到付款页
        this.$router.push({
          path: '/air/pay'
        })
      }).catch((err) => {
        const { message } = err.response.data
        // 警告提示
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
      })
    },
    // 保险的选择
    handleInsurance (id) {
      if (this.insurances.includes(id)) {
        const arr = this.insurances.slice(0)
        arr.splice(this.insurances.indexOf(id), 1)
        this.insurances = arr
        // console.log(arr)
      } else {
        // 不存在添加到insurances
        this.insurances = [...new Set([...this.insurances, id])]
        // console.log(this.insurances)
      }
    },
    // 添加乘机人
    handleAddUsers () {
      this.users = [
        ...this.users,
        { username: '', id: '', idType: '1' }
      ]
    //   console.log(this.user)
    },
    // 移出乘机人触发
    handleDeleteUser (index) {
      this.users.splice(index, 1)
    //   console.log(this.user)
    }
  }
}
</script>
<style lang="less" scoped>
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
    .Ltype{
      display: block;
      color: #666;
      margin: 20px 0;
    }
    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
