<template>
  <div style="height: 500px">
    <div>
      <el-divider content-position="left" style="margin-bottom: 5px">{{
          '会员信息[' + chargeMemberData.id + ']'
        }}
      </el-divider>
      <el-form ref="form" :model="chargeMemberData" label-width="80px" style="width: 100%;" disabled>
        <el-row>
          <el-col :span="8">
            <el-form-item label="会员姓名">
              <el-input v-model="chargeMemberData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="性别">
              <el-input :value="chargeMemberData.sex=='1'?'男':'女'"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码">
                <el-input :value="chargeMemberData.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="当前余额">
              <el-input :value="chargeMemberData.balance"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider content-position="left">充值信息</el-divider>
      <div>
        <div style="display: flex;">
          <span style="margin-left:10px; width:170px;font-size:xx-large;font-weight: bolder;color: #d44a4a">充值金额：</span>
          <div style="width: 160px">
            <el-input class="inputAmount" @blur="inputAmountChange" v-model="pageData.wantPayAmount"></el-input>
          </div>
          <span style="margin-left: 5px; width:30px;font-size:xx-large;font-weight: bolder;color: #d44a4a">元</span>
        </div>
        <div style="display: flex;margin-top: 5px">
          <span style="margin-left:10px; width:170px;font-size:xx-large;font-weight: bolder;color: #535353">充值方式：</span>
          <el-select style="width:160px;" v-model="payType" placeholder="请选择">
            <el-option
                v-for="item in payTypeList"
                :key="item.value"
                :label="item.text"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="display: flex;margin-top: 5px">
          <span style="margin-left:10px; width:170px;font-size:xx-large;font-weight: bolder;color: #535353">充值备注：</span>
          <el-input
              type="textarea"
              style="width: 460px"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="payRemark">
          </el-input>
        </div>
        <div style='position: absolute;bottom: 20px;right:20px'>
          <el-button type="primary" @click="doPay">确认结算</el-button>
          <el-button type="info" @click="chargeClose">退出</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Charge",
  // 接受父组件的值
  props: {
    chargeMemberData: Object,
  },
  data() {
    return {
      payRemark: '',
      payData: {
        type: '2',//会员往来
        flag: '',
        amount: 0.00,
        orderId: '',
        payMember: -1,
        remark: '',
      },
      pageData: {
        wantPayAmount: 0.00,
      },
      payType: 1,
      payTypeList: [
        {value: 1, text: '现金'},
        {value: 2, text: '支付宝'},
        {value: 3, text: '微信'},
        // {value:4,text:'会员支付'},
        {value: 5, text: '刷卡'},
        {value: 6, text: '转账'},
        {value: 7, text: '其他'},
      ],
    }
  },
  created() {
    debugger;
  },
  methods: {
    chargeClose(){
      this.$parent.$parent.chargeClose();
    },
    doPay(){
      let _this=this;
      this.$confirm('确认是否金额已经入账？')
          .then(_ => {
            _this.$message({
              message: '充值成功！',
              type: 'success'
            });
            this.$parent.$parent._data.chargeVisible=false;
            this.$parent.$parent._data.search=_this.chargeMemberData.name;
          })
          .catch(_ => {

          });

    },
    inputAmountChange() { //输入框值改变
      debugger;
      this.pageData.wantPayAmount = this.pageData.wantPayAmount.replace(/[^\d.]/g, '');
      let wantPayAmount = Number(this.pageData.wantPayAmount);
      this.pageData.wantPayAmount = wantPayAmount.toFixed(2);
    },
  }
}
</script>

<style scoped>

</style>
