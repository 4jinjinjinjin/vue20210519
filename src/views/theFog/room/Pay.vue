<template>
  <div >
    <div>
      <el-divider content-position="left">{{ '房间详情【'+roomDetail.name+'】' }}</el-divider>
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
      <div style="width: 80%;">
        <el-table
            height="600"
            border
            :data="tableData"
            show-summary
            style="width: 100%;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="明细号">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="订单号">
                  <span>{{ props.row.orderId }}</span>
                </el-form-item>
                <el-form-item label="商品编号">
                  <span>{{ props.row.goodsId }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.goodsName }}</span>
                </el-form-item>
                <el-form-item label="商品金额">
                  <span>{{ props.row.goodsAmount }}</span>
                </el-form-item>
                <el-form-item label="实算金额">
                  <span>{{ props.row.realAmount }}</span>
                </el-form-item>
                <el-form-item label="下单人员">
                  <span>{{ props.row.operator }}</span>
                </el-form-item>
                <el-form-item label="下单时间">
                  <span>{{ props.row.opertime }}</span>
                </el-form-item>
                <el-form-item label="备注">
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
      <div style="width: 50%;"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Pay",
  // 接受父组件的值
  props: {
    payRoomId: Number,
  },
  data(){
    return {

      tableData: [{
        id:1,
        orderId:123,
        goodsId:789,
        goodsName:'测试商品',
        goodsAmount:20.50,
        realAmount:18.50,
        operator:'测试',
        opertime:new Date('2021-05-12 00:14:55'),
        remark:'优惠2元',
      }, {
        id:1,
        orderId:123,
        goodsId:789,
        goodsName:'测试商品',
        goodsAmount:20.50,
        realAmount:18.50,
        operator:'测试',
        opertime:new Date('2021-05-12 00:14:55'),
        remark:'优惠2元',
      }, {
        id:1,
        orderId:123,
        goodsId:789,
        goodsName:'测试商品',
        goodsAmount:20.50,
        realAmount:18.50,
        operator:'测试',
        opertime:new Date('2021-05-12 00:14:55'),
        remark:'优惠2元',
      }, {
        id:1,
        orderId:123,
        goodsId:789,
        goodsName:'测试商品',
        goodsAmount:20.50,
        realAmount:18.50,
        operator:'测试',
        opertime:new Date('2021-05-12 00:14:55'),
        remark:'优惠2元',
      }, {
        id:1,
        orderId:123,
        goodsId:789,
        goodsName:'测试商品',
        goodsAmount:20.50,
        realAmount:18.50,
        operator:'测试',
        opertime:new Date('2021-05-12 00:14:55'),
        remark:'优惠2元',
      }, ],
      roomData: {},
      orderData: {},
      roomDetail:{id: 1, name: '一号桌', remark: '测试在用', isUse: '1', startTime: new Date('2021-05-12 00:14:55')},
    };

  },
  methods:{
    formatDate(date,format){
      return this.$parent.$options.parent.formatDate(date,format);
    },
    getDiffTime(startTime, endTime){
      return this.$parent.$options.parent.getDiffTime(startTime,endTime);
    },
  },
  created() {
    alert('结账的桌号为'+this.payRoomId);
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
