<template>
  <div id="Main">
    <el-row >
      <el-col :span="4" v-for="(o, index) in tableData" :key="o.id" :offset="index > 0 ? 0 : 0">
        <el-card :body-style="{ padding: '2px' }" style="margin-bottom: 5px" shadow="hover">
<!--          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
          <div :class="checkClass(o.isUse)">{{o.name}}</div>
          <div style="padding: 14px;">
            <span>{{o.remark}}</span>
            <div class="bottom clearfix">
              <time class="time"> {{formatDate(o.startTime,'YYYY-MM-DD HH:mm:ss') }} </time><br>
              <time class="time"> {{getDiffTime(o.startTime,new Date()) }} </time>

              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "Main",
  methods:{
    getDiffTime : function (startTime,endTime){
      if (startTime&&endTime){
        var minutes= moment(endTime).diff(moment(startTime),'minutes' );
        return ("已使用"+Math.floor(minutes/60) + "小时" + (minutes%60) + "分" );
      }
    },
    formatDate : function (value,format) {
      if (value){
        return moment(value).format(format);
      }
    }
  },

  data() {
    return {
      tableData : [
        {id:'1',name:'一号桌',remark:'测试在用',isUse:'1',startTime:new Date('2021-05-12 00:14:55')},
        {id:'2',name:'二号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'3',name:'三号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'4',name:'四号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'5',name:'五号桌',remark:'测试在用',isUse:'1',startTime:new Date('2021-05-12 00:14:55')},
        {id:'6',name:'一号桌',remark:'测试在用',isUse:'1',startTime:new Date('2021-05-12 00:14:55')},
        {id:'7',name:'二号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'8',name:'三号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'9',name:'四号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'10',name:'五号桌',remark:'测试在用',isUse:'1',startTime:new Date('2021-05-12 00:14:55')},
        {id:'11',name:'一号桌',remark:'测试在用',isUse:'1',startTime:new Date('2021-05-12 00:14:55')},
        {id:'12',name:'二号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'13',name:'三号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'14',name:'四号桌',remark:'测试不在用',isUse:'0',startTime:null},
        {id:'15',name:'五号桌',remark:'测试在用',isUse:'1',startTime:new Date('2021-05-12 00:14:55')},

      ]
    };
  },

  computed: {
    checkClass() {
      return (isUse) => { // 使用JavaScript闭包，进行传值操作
        if (isUse == '1'){
          return 'imageUse';
        }
        else {
          return 'image'
        }

      }
    }
  }
}
</script>

<style scoped>
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