<template>
  <div>
    <el-form ref="orderDetail" :rules="rules" :model="orderDetail" label-width="80px" style="width: 500px">
      <div style="display: flex">
        <el-form-item label="订单号" >
          <el-input v-model="orderDetail.orderId" disabled></el-input>
        </el-form-item>
        <el-form-item label="费用序号" >
          <el-input v-model="orderDetail.id" disabled></el-input>
        </el-form-item>
      </div>
      <el-form-item label="商品编码" prop="goodsId">
        <el-input v-model.number="orderDetail.goodsId"></el-input>
      </el-form-item>
      <el-form-item label="商品名称"  prop="goodsName">
        <el-input v-model="orderDetail.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="商品金额"  prop="goodsAmount">
        <el-input @blur="inputGoodsAmountBlur" v-model="orderDetail.goodsAmount"></el-input>
      </el-form-item>
      <el-form-item label="实算金额"  prop="realAmount">
        <el-input @blur="inputRealAmountBlur" v-model="orderDetail.realAmount"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="orderDetail.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('orderDetail')">{{detailType==1?'添加费用':'保存'}}</el-button>
        <el-button @click="cancleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: {
    orderId: Number,
    detailType: Number,//1为新增、2为修改。
    orderDetailProps:Object,

  },

  data() {
    return {
      orderDetail: {
        id: '',
        orderId: '',
        goodsId: 1001,
        goodsName: '',
        goodsAmount: '',
        realAmount: '',
        remark: '',
      },
      rules: {
        goodsId: [
          {required: true, message: '请输入商品代码', trigger: 'blur'},
        ],
        goodsName: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        goodsAmount: [
          {required: true, message: '请输入商品金额', trigger: 'blur'}
        ],
        realAmount: [
          {required: true, message: '请输入实算金额', trigger: 'blur'},
        ],
      }
    }
  },
  created() {
    debugger
    this.orderDetail.orderId=this.orderId;
    if (this.orderDetailProps){
      this.orderDetail = Object.assign({},this.orderDetailProps);
    }
  },
  methods: {
    inputGoodsAmountBlur(){
      let goodsAmount = Number(this.orderDetail.goodsAmount.replace(/[^\d.]/g, '')||0);
      let realAmount = Number(this.orderDetail.realAmount.replace(/[^\d.]/g, '')||0);

      if (realAmount==0||realAmount>goodsAmount){
        this.orderDetail.realAmount=goodsAmount.toFixed(2);
      }
      this.orderDetail.goodsAmount=goodsAmount.toFixed(2);
    },
    inputRealAmountBlur(){
      let goodsAmount = Number(this.orderDetail.goodsAmount.replace(/[^\d.]/g, '')||0);
      let realAmount = Number(this.orderDetail.realAmount.replace(/[^\d.]/g, '')||0);
      if (goodsAmount==0){
        realAmount = 0;
      }else {
        if (realAmount>goodsAmount){
          this.orderDetail.realAmount=goodsAmount.toFixed(2);
        }else{
          this.orderDetail.realAmount=realAmount.toFixed(2);
        }
      }
    },
    cancleClick() {
      this.$parent.$parent._data.orderDetailDw=false;
      this.$parent.$parent.doRefresh();

    },
    onSubmit(formName) {
      let _this = this;
      this.$refs[formName].validate(async(valid) =>{
        if (valid) {
          debugger;
          try {
            _this.orderDetail.operator=sessionStorage.getItem('userId');
            await _this.$axios.get(_this.$baseUrl + '/thefog/order/creatOrderDetail',{
              params:{
                orderDetail:JSON.stringify(_this.orderDetail),
              }
            })
            _this.$parent.$parent._data.orderDetailDw = false;
            this.$parent.$parent.doRefresh();
            _this.utils.showSuccessTip(_this, '操作成功');

          }catch (e) {
            _this.utils.showErrorTip(_this, '房间订单信息获取异常，异常原因：'+e);
          }
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
