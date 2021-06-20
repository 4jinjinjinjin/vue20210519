<template>
  <div id="Main" v-loading="mask">
    <el-row>
      <el-col :span="4" v-for="(o, index) in roomDatas" :key="o.id" :offset="index > 0 ? 0 : 0">
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
                <el-button icon="el-icon-info" size="small " @click="gotoRoomDetail(o,'1')" plain circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="刷新" placement="right">
                <el-button type="success" icon="el-icon-refresh" size="small " @click="refreshRoomDetail(o.id)" plain circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="接客" placement="right">
                <el-button type="warning" icon="el-icon-circle-plus " size="small " @click="creatOrder(o.id,o.name)" v-if="o.isUse=='1'?false:true" plain
                           circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="点单" placement="right">
                <el-button type="danger" icon="el-icon-shopping-cart-full" size="small "   @click="goShopping(o.id)" v-if="o.isUse=='1'?true:false"
                           plain circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="结账" placement="right">
                <el-button type="primary" @click="goPay(o.id)" icon="el-icon-s-finance" size="small " v-if="o.isUse=='1'?true:false" plain
                           circle></el-button>
              </el-tooltip>
            </el-row>
            <el-row>
              <el-tooltip class="item" effect="dark" content="设置" placement="right">
                <el-button type="info" icon="el-icon-s-tools" size="small " @click="gotoRoomDetail(o,'2')" v-if="o.isUse=='1'?false:true" plain
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

            <el-button type="text" class="button" @click="o.isUse=='1'?goPay(o.id):creatOrder(o.id,o.name) ">{{ o.isUse=='1'?'结账':'接客' }}</el-button>
          </div>
        </div>

      </el-col>
      <el-col :span="4" >
        <el-tooltip class="item" effect="dark" content="新增房间" placement="right">

        <el-card :body-style="{ padding: '4px' }" style="margin-bottom: 5px" shadow="hover" @click.native="gotoRoomDetail({},'3')">
          <div style='box-sizing: border-box;border:2px dashed #dedede; height: 250px;width: 100%;color: #dedede;
          text-align: center;line-height: 220px;font-size: 135px;font-weight: bolder;'>+</div>
        </el-card>
        </el-tooltip>
      </el-col>

    </el-row>

    <el-drawer
        v-if="roomDetailDw"
        :visible.sync="roomDetailDw"
        size="40%" :with-header="false"
        :before-close="handleClose"
        :append-to-body="true">
      <div style="padding-left: 15px">
        <h1 style="font-size: xx-large">{{ roomDetailType==3?'新增房间':'房间详情' }}</h1>
        <el-form ref="form" :model="roomDetail" label-width="80px" style="width: 50%;" :disabled="roomDetailType==1?true:false" :rules="rules">
          <el-form-item label="房间编号"  >
            <el-input v-model="roomDetail.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="房间名称"  prop="name">
            <el-input v-model="roomDetail.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="roomDetail.remark"></el-input>
          </el-form-item>
          <el-form-item v-if="roomDetailType==1?true:false" label="是否在用">
            <el-switch :value="roomDetail.isUse==1?true:false"></el-switch>
          </el-form-item>
          <el-form-item v-if="roomDetail.isUse==1?true:false" label="开始时间">
            <el-input :value="formatDate(roomDetail.startTime, 'YYYY-MM-DD HH:mm:ss')"> </el-input>
          </el-form-item>
        </el-form>

        <div style="margin-left: 80px;" class="demo-drawer__footer" v-if="roomDetailType==1?false:true">
          <el-button type="primary" @click="saveRoom" :loading="loading">{{ loading ? '提交中 ...' : '保 存' }}</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </div>
        <div style="margin-left: 80px;" class="demo-drawer__footer" v-if="roomDetailType==1?true:false">
          <el-button type="primary" v-if="roomDetail.isUse==1?true:false" @click="inroomDetailDw = true">当前订单</el-button>
          <el-button type="primary" v-if="roomDetail.isUse==0?true:false"  @click="inroomDetailDw = true" >历史订单</el-button>
          <el-button @click="cancelForm">退出</el-button>
        </div>

        <el-drawer
            :append-to-body="true" :with-header="false"
            :visible.sync="inroomDetailDw">
          <div style="padding-left: 15px">
            <h2 style="color: #999999">{{ roomDetail.isUse==1?'当前订单':'历史订单'}}</h2>
            待完善
          </div>

        </el-drawer>
      </div>
    </el-drawer>
    <transition name="el-zoom-in-center">
      <el-dialog v-if="payVisible" title="付款界面" :visible.sync="payVisible" :before-close="payClose" :fullscreen="true" >
        <Pay :payRoomId="payRoomId"></Pay>
      </el-dialog>
    </transition>
    <transition name="el-zoom-in-center">
      <el-dialog width="1200px" v-if="shopVisible" title="消费界面" :visible.sync="shopVisible" :before-close="shopClose">
        <Shopping :shopRoomId="shopRoomId"></Shopping>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import Pay from "@/views/theFog/order/Pay";
import 'element-ui/lib/theme-chalk/base.css';
import Shopping from "@/views/theFog/order/Shopping";
export default {
  components: {
    Pay,
    Shopping,
  },
  name: "Main",
  data() {
    return {
      shopRoomId:'',
      shopVisible:false,
      payRoomId:'',
      roomDatas: [],
      roomDetailDw: false,
      roomDetail:{},
      inroomDetailDw: false,
      roomDetailType:null,//1 为详情，2为修改，3为新增
      loading:false,
      mask:false,
      payVisible:false,//结算界面
      rules:{
        name: [
          { required: true, message: '请输入房间名称', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    payClose() {
      let _this= this;

      _this.refreshRoomDetail();
      _this.payVisible=false;
    },
    shopClose() {
      let _this= this;
      _this.refreshRoomDetail();
      _this.shopVisible=false;
    },
    creatOrder : function(roomId,roomname){
      let _this= this;
      this.$confirm(roomname+'是否开始接客?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning'
      }).then(async () => {
        try{
          _this.mask=true;
          let data = await _this.$axios.get(_this.$baseUrl + '/thefog/room/creatOrder', {
            params: {
              roomId: roomId,
              empId: sessionStorage.getItem('userId')
            }
          })
          await _this.utils.showSuccessTip(_this,'接客成功！');
          await _this.refreshRoomDetail(roomId);
          await _this.goShopping(roomId);
          _this.mask=false;
        }catch (e) {
          _this.mask=false;
          _this.utils.showErrorTip(_this,'接客失败，失败原因：'+e.message||e)
        }
      }).catch((e) => {
        _this.mask=false;
        _this.utils.showWarningTip(_this,'取消接客')
      });
    },
    cleanDwData(){
      this.roomDetailDw= false;
      this.roomDetail={};
      this.roomDetailType=null;//1 为详情，2为修改，3为新增
    },
    goPay(roomId){
      this.payVisible=true;
      this.payRoomId=roomId;
    },
    goShopping(roomId){
      this.shopVisible=true;
      this.shopRoomId=roomId;
    },
    cancelForm() {
      this.cleanDwData();
    },
    saveRoom:async function(){
      let _this=this;
      this.$refs["form"].validate(async (valid) =>{
        debugger;
        if (valid) {
          try{
            await _this.$axios.get(_this.$baseUrl + '/thefog/room/creatRoom',{
              params:{
                id:_this.roomDetail.id,
                name:_this.roomDetail.name,
                remark:_this.roomDetail.remark
              }
            })
            await _this.refreshRoomDetail();
            await _this.utils.showSuccessTip(_this,'保存成功！');
            await _this.cleanDwData();
          }catch (e) {
            console.log(e);
            _this.utils.showErrorTip(_this,'保存失败！失败原因：'+e)
          }
        }
      });
    },
    handleClose(done) {
      if (this.roomDetailType&&this.roomDetailType==1){
        this.cleanDwData();
        done();
      }else {
        this.$confirm('是否还有未保存的工作?确定关闭吗？')
            .then(_ => {
              this.cleanDwData();
              done();
            })
            .catch(_ => {});
      }
    },
    gotoRoomDetail(value,dealType){
      this.roomDetailDw=true;
      this.roomDetailType=dealType;
      this.roomDetail=value;
      debugger;
    },
    refreshRoomDetail:async function(id) {
      let _this=this;
      let data = await _this.$axios.get(_this.$baseUrl + '/thefog/room/findAllRoom')
      for (let item = 0; item < data.length; item++) {
        data[item].show = false;
      }
      this.roomDatas = data;
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
  created: async function() {
    await this.refreshRoomDetail();
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
