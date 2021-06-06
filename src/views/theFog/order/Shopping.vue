<template>
  <div>
    <div style="display: flex">
      <el-input  style="width:320px;margin-left: 5px" placeholder="请输入检索内容"
                 v-model="search" >
        <el-button @click="doRefresh" slot="append" icon="el-icon-refresh"></el-button>
      </el-input>

      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" style="margin-left: 5px" @click="addDetail">新增费用</el-button>
      </el-button-group>
    </div>
    <div style="margin-top: 5px;">
      <el-table
          height="600"
          :data="orderDetail.filter(data => !search || new String(data.id).includes(search) || data.goodsName.toLowerCase().includes(search.toLowerCase()))"
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
        <el-table-column label="操作" header-align="center" align="right" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除费用</el-button>
          <el-button
              size="mini"
              type="info"
              @click="editDeatil(scope.row)">修改费用</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <el-drawer
        title="新增费用"
      :visible.sync="orderDetailDw"
      size="30%"
      :before-close="detailClose"
      :append-to-body="true">
      <Detail v-if="orderDetailDw" style="margin-top: 20px;margin-left: 15px"  :orderId="orderId" :detailType="detailType" :orderDetailProps="orderDetailProps"></Detail>
  </el-drawer>
  </div>
</template>

<script>
import Detail from "@/views/theFog/order/Detail";
export default {
  components: {
    Detail,
  },
  name: "Shopping",
  data(){
    return {
      orderDetailProps:{},
      orderDetailDw:false,
      orderId:'',
      orderDetail: [],
      search:'',
      detailType:1,
    }
  },
  props: {
    shopRoomId: Number,
  },
  methods: {
    addDetail(){
      this.orderDetailDw=true;
      this.orderDetailProps={};
      this.detailType=1;

    },
    editDeatil(detail){
      this.orderDetailDw=true;
      this.orderDetailProps=detail;
      this.detailType=2;
    },
    detailClose(done) {
      this.$confirm('是否还有未保存的工作?确定关闭吗？')
          .then(_ => {
            this.doRefresh();
            done();
          })
          .catch(_ => {});
      },
    doRefresh(){
      alert('刷新');
    },
    formatDate(date,format){
      return this.$parent.$parent.formatDate(date,format);
    }
  },
  created() {
    debugger;
    alert('shopping的桌号为'+this.shopRoomId);
    alert('根据桌号查找orderId，测试为123');
    this.orderId=123;
    this.orderDetail=[{
      id:1,
      orderId:123,
      goodsId:789,
      goodsName:'测试商品1',
      goodsAmount:20.50,
      realAmount:18.50,
      operator:'测试',
      opertime:new Date('2021-05-12 00:14:55'),
      remark:'优惠2元',
    }, {
      id:2,
      orderId:123,
      goodsId:789,
      goodsName:'测试商品2',
      goodsAmount:20.50,
      realAmount:18.50,
      operator:'测试',
      opertime:new Date('2021-05-12 00:14:55'),
      remark:'优惠2元',
    }, {
      id:3,
      orderId:123,
      goodsId:789,
      goodsName:'测试商品3',
      goodsAmount:20.50,
      realAmount:18.50,
      operator:'测试',
      opertime:new Date('2021-05-12 00:14:55'),
      remark:'优惠2元',
    }, {
      id:4,
      orderId:123,
      goodsId:789,
      goodsName:'测试商品4',
      goodsAmount:20.50,
      realAmount:18.50,
      operator:'测试',
      opertime:new Date('2021-05-12 00:14:55'),
      remark:'优惠2元',
    }, {
      id:5,
      orderId:123,
      goodsId:789,
      goodsName:'测试商品5',
      goodsAmount:20.50,
      realAmount:18.50,
      operator:'测试',
      opertime:new Date('2021-05-12 00:14:55'),
      remark:'优惠2元',
    }, ];
    this.paidData=[{
      id:6,
      type:1,
      flag:1,
      amount:15,
      orderId:20210524,
      remark:'已支付',
    }];
  }
}
</script>

<style scoped>

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
