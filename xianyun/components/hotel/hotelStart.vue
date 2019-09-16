<template>
  <!-- 基本信息 -->
  <div class="container">
    <div class="baseinfo">
      <el-row class="base-item">
        <el-col :span="4">
          基本信息
        </el-col>
        <el-col :span="5">
          入住时间: 14:00之后
        </el-col>
        <el-col :span="5">
          离店时间: 12:00之前
        </el-col>
        <el-col :span="5">
          2014年开业 / 2014年装修
        </el-col>
        <el-col :span="5">
          酒店规模: 250间客房
        </el-col>
      </el-row>
      <el-row class="base-item">
        <el-col :span="4">
          主要设施
        </el-col>
        <el-col :span="20">
          入住时间: 14:00之后
        </el-col>
      </el-row>
      <el-row class="base-item">
        <el-col :span="4">
          停车服务
        </el-col>
        <el-col :span="20">
          倒贴停车
        </el-col>
      </el-row>
      <el-row class="base-item">
        <el-col :span="4">
          品牌信息
        </el-col>
        <el-col :span="20">
          你猜
        </el-col>
      </el-row>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <div class="com-haed">
        <p>10条真实用户评论</p>
        <el-row>
          <el-col :span="4">
            <el-row :span="8">
              总评数：10
            </el-row>
            <el-row :span="8">
              好评数：10
            </el-row>
            <el-row :span="8">
              差评数：10
            </el-row>
          </el-col>
          <el-col :span="20">
            <el-row class="server">
              <el-col :span="6">
                <div class="recommend">
                  <div class="star">
                    推荐
                  </div>
                  <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                    class="good"
                  />
                </div>
              </el-col>
              <el-col :span="6" class="circle">
                <span class="circle-item">环境</span>
                <el-progress
                  type="circle"
                  :width="80"
                  :text-inside="true"
                  :stroke-width="3"
                  :percentage="25"
                  color="#f90"
                />
              </el-col>
              <el-col :span="6" class="circle">
                <span class="circle-item">产品</span>
                <el-progress
                  type="circle"
                  :width="80"
                  :text-inside="true"
                  :stroke-width="3"
                  :percentage="25"
                  color="#f90"
                />
              </el-col>
              <el-col :span="6" class="circle">
                <span class="circle-item">服务</span>
                <el-progress
                  type="circle"
                  :width="80"
                  :text-inside="true"
                  :stroke-width="3"
                  :percentage="25"
                  color="#f90"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.baseinfo {
    .base-item {
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
    }
  }
  .comment {
    .com-haed {
      padding: 30px 0;
      p {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 15px;
      }
      .server {
        color: #f90;
        .recommend {
          position: relative;
          .star {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 2px solid #f90;
            opacity: 0.3;
            text-align: center;
            line-height: 70px;
            font-size: 24px;
            transform: rotate(-30deg);
          }
          .good {
            position: absolute;
            top: 26px;
            left: -22px;
          }
        }
        .circle {
          position: relative;
          .circle-item {
            position: absolute;
            top: 18px;
            left: 25px;
          }
        }
      }
    }
  }
</style>
