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
<!--        <el-input v-model.number="orderDetail.goodsId" disabled></el-input>-->
        <el-input @click.native="chooseGoods" :readonly=true style="width:220px;margin-left: 5px" placeholder="请选择商品信息"
                  v-model.number="orderDetail.goodsId" :value="orderDetail.goodsId"></el-input>
      </el-form-item>
      <el-form-item label="商品名称"  prop="goodsName">
        <el-input v-model="orderDetail.goodsName" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品单价"  prop="goodsPrice">
        <el-input  v-model="orderDetail.goodsPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="数量"  prop="goodsNum" >
        <el-input @blur="inputGoodsNumBlur" v-model="orderDetail.goodsNum"></el-input>
      </el-form-item>
      <el-form-item label="商品金额"  prop="goodsAmount">
        <el-input @blur="inputGoodsAmountBlur" v-model="orderDetail.goodsAmount" disabled></el-input>
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


    <transition name="el-zoom-in-center">
      <el-dialog width="60%" :modal="false" v-if="chooseVisible" :visible.sync="chooseVisible"  title="请选择商品信息"  :before-close="chooseClose">
        <GoodsChoose ></GoodsChoose>
      </el-dialog>
    </transition>

  </div>
</template>

<script>
import GoodsChoose from "@/views/theFog/GoodsChoose";

export default {
  components: {GoodsChoose},
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
        goodsId: '',
        goodsName: '',
        goodsAmount: '',
        realAmount: '',
        remark: '',
        goodsPrice:'',
        goodsNum:'1',
      },

      goodsData:{
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
      },
      chooseVisible:false,

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
    chooseGoods(){
      let _this = this;
      _this.chooseVisible=true;
    },

    chooseClose(goodsData){
      this.chooseVisible=false;
      if (goodsData.goodsId){
        this.goodsData=goodsData;
        this.orderDetail.goodsId=goodsData.goodsId
        this.orderDetail.goodsPrice=goodsData.goodsPrice
        // this.orderDetail.goodsNum=goodsData.goodsNum
        this.orderDetail.goodsName=goodsData.goodsName
        this.inputGoodsNumBlur();
      }else {
        this.utils.showWarningTip('未选择商品信息！')
      }
    },
    inputGoodsAmountBlur(){
      let goodsAmount = Number(String(this.orderDetail.goodsAmount).replace(/[^\d.]/g, '')||0);
      let realAmount = Number(String(this.orderDetail.realAmount).replace(/[^\d.]/g, '')||0);

      if (realAmount==0||realAmount>goodsAmount){
        this.orderDetail.realAmount=goodsAmount.toFixed(2);
      }
      this.orderDetail.goodsAmount=goodsAmount.toFixed(2);
    },
    inputGoodsNumBlur(){
      debugger;

      let goodsPrice = Number(String(this.orderDetail.goodsPrice).replace(/[^\d.]/g, '')||0);
      let goodsNum = Number(String(this.orderDetail.goodsNum).replace(/[^\d.]/g, '')||0).toFixed(0);
      this.orderDetail.goodsNum=goodsNum;

      let goodsAmount = (goodsPrice*goodsNum).toFixed(2);
      this.orderDetail.goodsAmount=goodsAmount;
      this.orderDetail.realAmount=goodsAmount;
    },

    inputRealAmountBlur(){
      let goodsAmount = Number(String(this.orderDetail.goodsAmount).replace(/[^\d.]/g, '')||0);
      let realAmount = Number(String(this.orderDetail.realAmount).replace(/[^\d.]/g, '')||0);
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
