<template>
  <div id="Main">
    <el-row>
      <el-col :span="4" v-for="(o, index) in tableData" :key="o.id" :offset="index > 0 ? 0 : 0">
        <el-row>
          <el-col :span="24-o.spanlen%8">
            <el-card :body-style="{ padding: '4px' }" style="margin-bottom: 5px" shadow="hover"
                     @click.native="o.show=!o.show,
                     !o.spanlen?o.spanlen=0:o.spanlen=o.spanlen,o.spanlen=o.spanlen+4">
              <!--          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
              <div :class="checkClass(o.isUse)">{{ o.name }}</div>
            </el-card>
          </el-col>
          <el-col style="margin-top: 8px;" :span="o.spanlen%8" v-if="o.show">
            <el-row>
              <el-tooltip class="item" effect="dark" content="详情" placement="right">
                <el-button icon="el-icon-info" size="small " @click="lookRoomDetail(o.id)" plain circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="刷新" placement="right">
                <el-button type="success" icon="el-icon-refresh" size="small " @click="refreshRoomDetail(o.id)" plain circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="接客" placement="right">
                <el-button type="warning" icon="el-icon-circle-plus " size="small " v-if="o.isUse=='1'?false:true" plain
                           circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="点单" placement="right">
                <el-button type="danger" icon="el-icon-shopping-cart-full" size="small " v-if="o.isUse=='1'?true:false"
                           plain circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="结账" placement="right">
                <el-button type="primary" icon="el-icon-s-finance" size="small " v-if="o.isUse=='1'?true:false" plain
                           circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="设置" placement="right">
                <el-button type="info" icon="el-icon-s-tools" size="small " v-if="o.isUse=='1'?false:true" plain
                           circle></el-button>
              </el-tooltip>
            </el-row>

          </el-col>
        </el-row>
        <div style="padding: 14px;">
          <span>{{ o.remark }}</span>
          <div class="bottom clearfix">
            <time class="time"> {{ formatDate(o.startTime, 'YYYY-MM-DD HH:mm:ss') }}</time>
            <br>
            <time class="time"> {{ getDiffTime(o.startTime, new Date()) }}</time>

            <el-button type="text" class="button" @click="test">操作按钮</el-button>
          </div>
        </div>

      </el-col>
    </el-row>

    <el-drawer
        :visible.sync="roomDetailDw"
        size="40%" :with-header="false">
      <div style="padding-left: 15px">
        <h1 style="font-size: xx-large">房间详情</h1>
        <el-form ref="form" :model="roomDetail" label-width="80px" style="width: 50%;">
          <el-form-item label="房间名称">
            <el-input v-model="roomDetail.name"></el-input>
          </el-form-item>
        </el-form>

        <el-button @click="inroomDetailDw = true">打开里面的!</el-button>
        <el-drawer
            title="我是里面的"
            :append-to-body="true"
            :before-close="handleClose"
            :visible.sync="inroomDetailDw">
          <p>_(:зゝ∠)_</p>
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "Main",
  methods: {
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    lookRoomDetail(id){
      this.roomDetailDw=true;
      alert('对接后台获取房间信息接口。');
      var _this=this;
      _this.tableData.forEach(((value, index) => {
        if (value.id==id){
          _this.roomDetail=value;
        }
      }))
    },
    refreshRoomDetail(id) {
      debugger;
      var _tableData=this.tableData;
      alert('对接后台获取房间信息接口。');
      var newTable={};//后台获取
      _tableData.forEach(((value, index) => {
        if (value.id==id){
          newTable=value;
          newTable.show=false;
          newTable.spanlen=0;
          newTable.isUse='1';
          newTable.remark='测试刷新成在用';
          _tableData.splice(index, 1, newTable)
        }
      }))
    },
    test(e) {
      alert(e);
    },
    getDiffTime: function (startTime, endTime) {
      if (startTime && endTime) {
        var minutes = moment(endTime).diff(moment(startTime), 'minutes');
        return ("已使用" + Math.floor(minutes / 60) + "小时" + (minutes % 60) + "分");
      }
    },
    formatDate: function (value, format) {
      if (value) {
        return moment(value).format(format);
      }
    }
  },
  created() {
    let data = [
      {id: '1', name: '一号桌', remark: '测试在用', isUse: '1', startTime: new Date('2021-05-12 00:14:55')},
      {id: '2', name: '二号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '3', name: '三号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '4', name: '四号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '5', name: '五号桌', remark: '测试在用', isUse: '1', startTime: new Date('2021-05-12 00:14:55')},
      {id: '6', name: '一号桌', remark: '测试在用', isUse: '1', startTime: new Date('2021-05-12 00:14:55')},
      {id: '7', name: '二号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '8', name: '三号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '9', name: '四号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '10', name: '五号桌', remark: '测试在用', isUse: '1', startTime: new Date('2021-05-12 00:14:55')},
      {id: '11', name: '一号桌', remark: '测试在用', isUse: '1', startTime: new Date('2021-05-12 00:14:55')},
      {id: '12', name: '二号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '13', name: '三号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '14', name: '四号桌', remark: '测试不在用', isUse: '0', startTime: null},
      {id: '15', name: '五号桌', remark: '测试在用', isUse: '1', startTime: new Date('2021-05-12 00:14:55')},
    ]
    for (let item = 0; item < data.length; item++) {
      data[item].show = false;
    }
    this.tableData = data;
  },
  data() {
    return {
      tableData: [],
      roomDetailDw: false,
      roomDetail:{},
      inroomDetailDw: false,
    };
  },

  computed: {
    checkClass() {
      return (isUse) => { // 使用JavaScript闭包，进行传值操作
        if (isUse == '1') {
          return 'imageUse';
        } else {
          return 'image'
        }

      }
    }
  }
}
</script>

<style scoped>
.item {
  margin: 4px;
}

.left .el-tooltip__popper,
.right .el-tooltip__popper {
  padding: 8px 10px;
}

.right {
  float: right;
  width: 60px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.imageUse {
  background-color: #dedede;
  height: 250px;
  width: 100%;
  text-align: center;
  line-height: 220px;
  font-size: 60px;
  font-weight: bolder;
  color: #a8a8a8;
  display: block;
}

.image {
  background-color: #B3C0D1;
  height: 250px;
  width: 100%;
  text-align: center;
  line-height: 220px;
  font-size: 60px;
  font-weight: bolder;
  color: #505050;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";

}

.clearfix:after {
  clear: both
}
</style>
