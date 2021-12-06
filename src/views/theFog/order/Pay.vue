<template>
  <div >
    <div>
      <el-divider content-position="left" style="margin-bottom: 5px">{{ '房间详情【'+roomDetail.name+'】' }}</el-divider>
      <el-form ref="form" :model="roomDetail" label-width="80px" style="width: 100%;" disabled>
        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="12">
                <el-form-item label="房间编号" >
                  <el-input v-model="roomDetail.id" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房间名称">
                  <el-input v-model="roomDetail.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="开始时间">
                  <el-input :value="formatDate(roomDetail.startTime, 'YYYY-MM-DD HH:mm:ss')"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-input :value="getDiffTime(roomDetail.startTime, new Date())"> </el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="备注" >
              <el-input type="textarea"  v-model="roomDetail.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider content-position="left">结算信息</el-divider>
    </div>
    <div style="display: flex;">
      <div style="width: 60%;">
        <el-table
            height="600"
            :data="orderDetail"
            show-summary
            style="width: 100%;border:1px solid #eae7e7;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="明细号" label-width="80px" >
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="订单号"  label-width="80px">
                  <span>{{ props.row.orderId }}</span>
                </el-form-item>
                <el-form-item label="商品编号"  label-width="80px">
                  <span>{{ props.row.goodsId }}</span>
                </el-form-item>
                <el-form-item label="商品名称"  label-width="80px">
                  <span>{{ props.row.goodsName }}</span>
                </el-form-item>
                <el-form-item label="商品金额"  label-width="80px">
                  <span>{{ props.row.goodsAmount }}</span>
                </el-form-item>
                <el-form-item label="实算金额"  label-width="80px">
                  <span>{{ props.row.realAmount }}</span>
                </el-form-item>
                <el-form-item label="下单人员"  label-width="80px">
                  <span>{{ props.row.operator }}</span>
                </el-form-item>
                <el-form-item label="下单时间"  label-width="80px">
                  <span>{{ formatDate(props.row.opertime, 'YYYY-MM-DD HH:mm:ss') }}</span>
                </el-form-item>
                <el-form-item label="备注"  label-width="80px">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              header-align="center"
              align="right"
              width="50">
          </el-table-column>
          <el-table-column
              prop="goodsName"
              header-align="center"
              label="商品名称"
              width="350">
          </el-table-column>
          <el-table-column
              prop="goodsAmount"
              header-align="center"
              label="商品金额"
              align="right"
              width="120">
          </el-table-column>
          <el-table-column
              prop="realAmount"
              header-align="center"
              align="right"
              label="实算金额"
              width="120">
          </el-table-column>
          <el-table-column
              prop="remark"
              header-align="center"
              label="备注">
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 40%; box-sizing:border-box;border:1px solid  #eae7e7;position: relative;">
        <el-form ref="form" :model="pageData" label-width="80px" style="width: 90%;margin-top: 30px;" >
          <el-row :gutter="60">
            <el-col :span="8" style="font-weight: bolder;color: #404040">
              <el-form-item label="订单总额" >
                <el-input class="input1" :readonly=true v-model="pageData.orderAmount" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"  style="font-weight: bolder;color: #76c749">
              <el-form-item label="已付金额">
                <el-input class="input2"  :readonly=true v-model="pageData.paidAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8 " style="font-weight: bolder;color: #d44a4a">
              <el-form-item label="未付金额">
                <el-input class="input3"  :readonly=true v-model="pageData.unpaidAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider ></el-divider>

        <div style="display: flex;">
          <span style="margin-left:10px; width:170px;font-size:xx-large;font-weight: bolder;color: #d44a4a">支付金额：</span>
          <div style="width: 160px">
            <el-input label="订单总额"  class="inputAmount" @blur="inputAmountChange" v-model="pageData.wantPayAmount" ></el-input>
          </div>
          <span  style="margin-left: 5px; width:75px;font-size:xx-large;font-weight: bolder;color: #d44a4a">澳币</span>
          <span  style="margin-left: 7px;margin-top: 22px; width:200px;font-size:smaller;">(金额范围为0~{{pageData.unpaidAmount}}之间)</span>
        </div>
        <div style="display: flex;margin-top: 5px">
          <span style="margin-left:10px; width:170px;font-size:xx-large;font-weight: bolder;color: #535353">支付方式：</span>
          <el-select style="width:160px;" @change="payTypeChange" v-model="payType" placeholder="请选择">
            <el-option
                v-for="item in payTypeList"
                :key="item.value"
                :label="item.text"
                :value="item.value">
            </el-option>
          </el-select>
          <el-input @click.native="chooseMember" v-if="memberIf" :readonly=true style="width:220px;margin-left: 5px" placeholder="选择会员信息"
                    :value="memberData.name">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-link  type="success" v-if="memberData.balance" style="margin-left: 7px;margin-top: 22px; width:80px;font-size:smaller;">
            <span>{{'余额：'+memberData.balance+'澳币'}}</span>
<!--            <span @click="gotoMemberTopUp">{{'余额：'+memberData.balance+'澳币'}}</span>-->
          </el-link>
        </div>
        <div style="display: flex;margin-top: 5px">
          <span style="margin-left:10px; width:170px;font-size:xx-large;font-weight: bolder;color: #535353">支付备注：</span>
          <el-input
              type="textarea"
              style="width: 460px"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="payRemark">
          </el-input>
        </div>
        <div style='position: absolute;bottom: 20px;right:20px'>
          <el-button type="danger"  @click="doOrder">送客</el-button>
          <el-button type="primary"  @click="doPay">确认结算</el-button>
          <el-button type="info" @click="payClose">退出</el-button>
        </div>
      </div>
    </div>

    <transition name="el-zoom-in-center">
      <el-dialog width="1200px" :modal="false" v-if="chooseVisible" :visible.sync="chooseVisible"  title="请选择会员支付"  :before-close="chooseClose">
        <Member  :dealType="choose"></Member>
      </el-dialog>
    </transition>

  </div>
</template>

<script>
import Member from "@/views/theFog/Member";
export default {
  name: "Pay",
  components: {Member},
  // 接受父组件的值
  props: {
    payOrderId: Number,
    payRoomId: Number,
  },
  data(){
    return {
      choose:1,
      memberIf:false,
      payRemark:'',
      model1:'1',
      payType:1,
      payTypeList:[
        {value:1,text:'现金'},
        {value:2,text:'支付宝'},
        {value:3,text:'微信'},
        {value:4,text:'会员支付'},
        {value:5,text:'刷卡'},
        {value:6,text:'转账'},
        {value:7,text:'其他'},
      ],
      pageData:{
        wantPayAmount:0.00,
        orderAmount:0.00,
        paidAmount:0.00,
        unpaidAmount:0.00,
      },
      memberData:{
      },
      orderDetail: [],
      paidData:[],
      roomDetail:{},

      chooseVisible:false,

    };

  },
  methods:{
    doPay:async function(){
      let _this=this;
      if (_this.pageData.wantPayAmount==0){

        _this.utils.showWarningTip(_this, '支付金额不可为0！');
        return ;
      }
      if (_this.payType=='4'&&!_this.memberData.id){
        _this.utils.showWarningTip(_this, '请先选择会员信息！');
        return ;
      }
      this.$confirm('确认是否金额已经入账？')
          .then(async _ => {
            try{
              debugger;
              await _this.$axios.get(_this.$baseUrl + '/thefog/pay/doPay', {
                params: {
                  flag:_this.payType,
                  amount: _this.pageData.wantPayAmount,
                  orderId:_this.payOrderId,
                  memberId:_this.memberData.id||'-1',
                  remark:_this.payRemark,
                  operator:sessionStorage.getItem('userId')
                }
              })
              _this.utils.showSuccessTip(_this, '支付成功！');
              this.$parent.$parent.payClose(_this.pageData.unpaidAmount-_this.pageData.wantPayAmount>0?_this.payOrderId:'',_this.pageData.unpaidAmount-_this.pageData.wantPayAmount>0?_this.payRoomId:'');
            }catch (e) {
              _this.utils.showWarningTip(_this, '结算加载失败！请重新进入改界面。'+e);
            }
          })
          .catch(_ => {

          });
    },
    doOrder(){
      let _this=this;
      this.$confirm('确认是否送客？'+(_this.pageData.unpaidAmount>0?'客户还有未支付['+_this.pageData.unpaidAmount+']金额！':''))
          .then(async _ => {

            await _this.$axios.get(_this.$baseUrl + '/thefog/pay/say886', {
              params: {
                orderId:_this.payOrderId,
                operator:sessionStorage.getItem('userId')
              }
            })
            _this.$message({
              message: '恭送客人，请记得下次再来哦！',
              type: 'success'
            });
            this.$parent.$parent.payClose();
          })
          .catch(_ => {

          });
    },
    chooseMember(){
      let _this = this;
      _this.chooseVisible=true;
    },
    chooseClose(memberData){
      this.chooseVisible=false;
      if (memberData.id){
        this.memberData=memberData;
        this.inputAmountChange();
      }else {
        this.utils.showWarningTip('未选择会员信息！')
      }
    },
    payTypeChange(){
      this.memberData={};
      if (this.payType=='4'){//会员支付
        this.memberIf=true;
      }else {
        this.memberIf=false;
      }
    },
    payClose(){

      let _this=this;
      this.$confirm('确认取消结算？？')
          .then(_ => {
            _this.$message({
              message: '取消结算！',
              type: 'warning'
            });
            this.$parent.$parent.payClose();
          })
          .catch(_ => {

          });
    },
    inputAmountChange() { //输入框值改变
      debugger;
      this.pageData.wantPayAmount = this.pageData.wantPayAmount.replace(/[^\d.]/g, '');
      let wantPayAmount= Number(this.pageData.wantPayAmount);
      let unpaidAmount= Number(this.pageData.unpaidAmount);

      if (wantPayAmount>unpaidAmount){
        wantPayAmount=unpaidAmount;
      }
      if (wantPayAmount>this.memberData.balance){
        wantPayAmount=this.memberData.balance;
      }
      this.pageData.wantPayAmount=wantPayAmount.toFixed(2);

    },
    formatDate(date,format){
      return this.$parent.$parent.formatDate(date,format);
    },
    getDiffTime(startTime, endTime){
      return this.$parent.$parent.getDiffTime(startTime,endTime);
    },
    reflash : async function (){

      let _this=this;
      try{
        this.orderDetail=await _this.$axios.get(_this.$baseUrl + '/thefog/order/getOrderDetailById', {
          params: {
            orderId: _this.payOrderId,
          }
        })
        this.roomDetail=await _this.$axios.get(_this.$baseUrl + '/thefog/room/findRoom', {
          params: {
            id: _this.payRoomId,
          }
        })

        this.paidData=await _this.$axios.get(_this.$baseUrl + '/thefog/pay/getPayByOrderId', {
          params: {
            orderId: _this.payOrderId,
          }
        })

        let orderAmount=0.00;
        for (let index=0;index<this.orderDetail.length; index++){
          orderAmount+=this.orderDetail[index].realAmount;
        }
        this.pageData.orderAmount=orderAmount.toFixed(2);

        let payAmount=0.00;
        for (let index=0;index<this.paidData.length; index++){
          payAmount+=this.paidData[index].amount;
        }
        this.pageData.paidAmount=payAmount.toFixed(2);

        this.pageData.unpaidAmount=(orderAmount-payAmount).toFixed(2);
        this.pageData.wantPayAmount=this.pageData.unpaidAmount;
      }catch (e) {
        _this.utils.showWarningTip(_this, '结算加载失败！请重新进入改界面。'+e);
      }
    },
  },
  created :async function() {
    debugger;
    this.reflash();
  }
}
</script>

<style scoped>
.el-divider--horizontal{
  margin: 8px 0;
  background: 0 0;
  border-top: 1px dashed #e8eaec;
}
.inputAmount>>>input{
  font-weight: bolder;
  font-size: xx-large;
  text-align: right;
  width:160px;
  color: #d44a4a;
}
.input1 >>> input{
  font-weight: bolder;
  font-size: larger;
  text-align: right;
  color: #404040;
}
.input2 >>> input{
  font-weight: bolder;
  font-size: larger;
  text-align: right;
  color: #76c749;
}
.input3 >>> input{
  font-weight: bolder;
  font-size: larger;
  text-align: right;
  color: #d44a4a;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
