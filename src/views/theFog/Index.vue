<template>

  <div id="Index">
    <el-container style="border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <div style="float: left;">
          <span>{{ nowDate }}</span>
          <span>{{ nowTime }}</span>
          <span style="font-size: 16px;font-weight: bold">{{ nowWeek }}</span>
        </div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-container>
        <el-aside width="250px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']" :default-active="'main'" router>
            <el-menu-item index="main">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="bill">
              <i class="el-icon-s-order"></i>
              <span slot="title">账单管理</span>
            </el-menu-item>
            <el-menu-item index="member">
              <i class="el-icon-user"></i>
              <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="goods">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
          </el-menu>
          <div class="demo-image" style="position:fixed;bottom: 0px">
            <el-image
                style="width: 100px; height: 100px"
                :src="require('../../pic/logo.png')"  slot="placeholder"></el-image>
          </div>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",

  data() {

    const item = {
      date: '2016-05-02',
      name: '王xxxxx',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      url: 'require(../pic/logo.png)',
      tableData: Array(20).fill(item),
      nowWeek: '',
      nowDate: '',
      nowTime: '',
    };
  },
  created() {
    this.setNowTimes();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.setNowTimes()
    }, 1000)
  },
  methods: {
    setNowTimes() {
      let myDate = new Date()
      // console.log(myDate)
      let wk = myDate.getDay()
      let yy = String(myDate.getFullYear())
      let mm = myDate.getMonth() + 1
      let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let week = weeks[wk]
      this.nowDate = yy + '-' + mm + '-' + dd + ' '
      this.nowTime = hou + ':' + min + ':' + sec + ' '
      this.nowWeek = week
    },
  },
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-main {
  height: 92vh;
}
</style>