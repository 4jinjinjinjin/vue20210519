<template>
  <div>
    <div style="display: flex">
      <el-select style="width:160px;" @change="doRefresh" v-model="reportType" placeholder="请选择">
        <el-option
            v-for="item in TypeList"
            :key="item.value"
            :label="item.text"
            :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="doRefresh"
          :picker-options="pickerOptions">
      </el-date-picker>
      <div class="export">
        <el-button @click="exportExcel" style="margin-top: 2px;" size="medium" type="success">导出</el-button>
      </div>
    </div>

    <el-table  ref="goodsTable" id="goodsTable"
               highlight-current-row :data="goodsData" v-if="goodsTableVisible" :visible.sync="goodsTableVisible"
               :border=true style="margin-top: 5px;" :height="'780px'"
               @current-change="handleCurrentChange"
               :summary-method="getSummaries"
               show-summary>
      <el-table-column prop="goodsId" label="商品编号" width="140" align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column width="240" prop="goodsType" :formatter="formatterType" label="商品类别"  align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column prop="goodsNum" label="消费数量" width="140" align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column width="240" prop="goodsAmount" :formatter="formatterBalance" style="font-weight: bolder" label="消费金额" align="right" header-align="center" sortable>
      </el-table-column>

    </el-table>
    <el-table  ref="orderTable"  id="orderTable"
               highlight-current-row :data="orderData" v-if="orderTableVisible" :visible.sync="orderTableVisible"
               :border=true style="margin-top: 5px;" :height="'780px'"
               @current-change="handleCurrentChange"
               :summary-method="getSummaries"
               show-summary>
      <el-table-column prop="orderId" label="订单编号" width="80" align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column prop="orderRoomName" label="房间名称" width="240" align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column width="240" prop="amount" :formatter="formatterBalance" style="font-weight: bolder" label="订单金额" align="right" header-align="center" sortable>
      </el-table-column>
      <el-table-column width="240" prop="realPay" :formatter="formatterBalance" style="font-weight: bolder" label="实付金额" align="right" header-align="center" sortable>
      </el-table-column>
      <el-table-column width="240" prop="paytime" :formatter="formatterOpertime" label="结账时间" align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column width="240" prop="payname" label="结账人员"  align="center" header-align="center">
      </el-table-column>


      <el-table-column label="操作" header-align="center" align="right" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="showPayDetail( scope.row)">支付详情</el-button>
          <el-button
              size="mini"
              type="warning"
              @click="showOrderDetail( scope.row)">消费详情</el-button>
        </template>
      </el-table-column>


    </el-table>

    <transition name="el-zoom-in-center">
      <el-dialog  :modal="false" v-if="payDetailVisible" title="支付详情" :visible.sync="payDetailVisible" >
        <div class="export">
          <el-button @click="exportExcelDetail(1)" style="margin-top: 2px;" size="medium" type="success">导出</el-button>
        </div>
        <el-table  ref="payDetailTable" id="payDetailTable"
                   highlight-current-row :data="payDetail"
                   :border=true style="margin-top: 5px;" :height="'500px'"
                   @current-change="handleCurrentChange"
                   show-summary>
          <el-table-column width="240" prop="type" :formatter="formatterPayType"
                           style="font-weight: bolder" label="支付方式" align="center" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="240" prop="amount" :formatter="formatterBalance" style="font-weight: bolder" label="支付金额" align="right" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="240" prop="opertime" :formatter="formatterOpertime" label="支付时间" align="center" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="240" prop="memberId"  style="font-weight: bolder" label="会员ID" align="left" header-align="center" sortable>
        </el-table-column>
          <el-table-column width="240" prop="memberName"  style="font-weight: bolder" label="会员名称" align="left" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="320" prop="remark"  style="font-weight: bolder" label="支付备注" align="left" header-align="center" sortable>
          </el-table-column>

          <el-table-column width="240" prop="opername" label="操作人员"  align="center" header-align="center">
          </el-table-column>

        </el-table>

      </el-dialog>
    </transition>
    <transition name="el-zoom-in-center">
      <el-dialog  :modal="false" v-if="orderDetailVisible" title="消费详情" :visible.sync="orderDetailVisible" >
        <div class="export">
          <el-button @click="exportExcelDetail(2)" style="margin-top: 2px;" size="medium" type="success">导出</el-button>
        </div>
        <el-table  ref="orderDetailTable" id="orderDetailTable"
                   highlight-current-row :data="orderDetail"
                   :border=true style="margin-top: 5px;" :height="'500px'"
                   @current-change="handleCurrentChange"
                   show-summary>
          <el-table-column prop="id" label="编号" width="140" align="center" header-align="center">
          </el-table-column>
          <el-table-column width="240" prop="goodsType" :formatter="formatterType" label="商品类别"  align="center" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="120" prop="goodsId" label="商品ID"  align="right" header-align="center">
          </el-table-column>
          <el-table-column width="240" prop="goodsName" label="商品名称"  align="right" header-align="center">
          </el-table-column>
          <el-table-column width="240" prop="goodsPrice" :formatter="formatterBalance" style="font-weight: bolder" label="商品单价" align="right" header-align="center" sortable>
          </el-table-column>
          <el-table-column prop="goodsNum" label="消费数量" width="140" align="center" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="240" prop="goodsAmount" :formatter="formatterBalance" style="font-weight: bolder" label="商品金额" align="right" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="240" prop="realAmount" :formatter="formatterBalance" style="font-weight: bolder" label="实算金额" align="right" header-align="center" sortable>
          </el-table-column>

          <el-table-column width="240" prop="opertime" :formatter="formatterOpertime" label="操作时间" align="center" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="320" prop="remark"  style="font-weight: bolder" label="消费备注" align="left" header-align="center" sortable>
          </el-table-column>
          <el-table-column width="240" prop="opername" label="操作人员"  align="center" header-align="center">
          </el-table-column>

        </el-table>

      </el-dialog>
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: "Bill",
  methods: {

    formatterOpertime: function (row, column, cellValue, index) {
      return moment(cellValue).format('YYYY-MM-DD');
    },
    formatterType:function (row, column, cellValue, index){
      let k=[{value:'1',text:'商品'},
        {value:2,text:'剧本'}]
      for (let i=0;i<k.length;i++){
        if (k[i].value==cellValue){
          return k[i].text;
        }
      }
    },
    formatterPayType:function (row, column, cellValue, index){
      for (let i=0;i<this.payTypeList.length;i++){
        if (this.payTypeList[i].value==cellValue){
          return this.payTypeList[i].text;
        }
      }
    },
    formatterBalance:function (row, column, cellValue, index){
      return Number(cellValue).toFixed(2);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    exportExcel () {

      let _this=this;

      if (_this.date.length>1){
        /* generate workbook object from table */
        let wb;
        let fileName;

        let date1=moment(_this.date[0]).format('YYYY-MM-DD');
        let date2=moment(_this.date[1]).format('YYYY-MM-DD');
        if (_this.reportType==1){
          wb = XLSX.utils.table_to_book(document.querySelector('#goodsTable'));
          fileName='商品流水记录（'+date1+'-'+date2+'）.xlsx';
        }else if (_this.reportType==2){
          wb = XLSX.utils.table_to_book(document.querySelector('#orderTable'));
          fileName='订单报表（'+date1+'-'+date2+'）.xlsx';
        }
        /* get binary string as output */
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }),fileName);
        } catch (e)
        {
          if (typeof console !== 'undefined')
            console.log(e, wbout)
        }
        return wbout
      }else {
        return ;
      }
    },
    exportExcelDetail(type){
      let wb;
      let fileName;
      if (type==1){
        wb = XLSX.utils.table_to_book(document.querySelector('#payDetailTable'));
        fileName=this.getOrderId+'（支付详情）.xlsx';
      }else if (type==2){
        wb = XLSX.utils.table_to_book(document.querySelector('#orderDetailTable'));
        fileName=this.getOrderId+'（消费记录）.xlsx';
      }
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }),fileName);
      } catch (e)
      {
        if (typeof console !== 'undefined')
          console.log(e, wbout)
      }
      return wbout

    },
    showPayDetail :async function (rowData){
      this.payDetail=[];

      try{
        debugger;
        this.payDetail=await this.$axios.get(this.$baseUrl + '/thefog/report/findPayDetail', {
          params: {
            orderId:rowData.orderId
          }
        })
        this.getOrderId=rowData.orderId;
        this.payDetailVisible=true;
        this.utils.showSuccessTip(this, '查询成功！');
      }catch (e) {
        this.utils.showWarningTip(this, '查询成功！失败原因：'+e);
      }
    },
    showOrderDetail :async function (rowData){
      this.orderDetail=[];

      try{
        debugger;
        this.orderDetail=await this.$axios.get(this.$baseUrl + '/thefog/report/findOrderDetail', {
              params: {
                orderId:rowData.orderId
              }
        })
        this.getOrderId=rowData.orderId;
        this.orderDetailVisible=true;
        this.utils.showSuccessTip(this, '查询成功！');
      }catch (e) {
        this.utils.showWarningTip(this, '查询成功！失败原因：'+e);
      }
    },
    doRefresh:async function () {
      debugger;
      console.log(this.date);
      let _this=this;

      if (_this.date.length>1){

        let date1=moment(_this.date[0]).format('YYYY-MM-DD');
        let date2=moment(_this.date[1]).format('YYYY-MM-DD');

        if (_this.reportType==1){

          let data = await _this.$axios.get(_this.$baseUrl + '/thefog/report/getGoodsData', {
            params: {
              date1:date1,
              date2:date2,
            }})
          this.goodsData = data;
          this.goodsTableVisible=true;

        }else {
          this.goodsTableVisible=false;
        }
        if (_this.reportType==2){

          let data = await _this.$axios.get(_this.$baseUrl + '/thefog/report/getOrderData', {
            params: {
              date1:date1,
              date2:date2,
            }})
          this.orderData = data;
          this.orderTableVisible=true;

        }else {
          this.orderTableVisible=false;
        }
      }


    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if (index === 1) {
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        } else {
          sums[index] = '';
        }
      });

      return sums;
    },
    created:async function () {
    },
  },
  data() {
    return {
      goodsData:[],
      getOrderId:'',
      orderData:[],
      payDetail:[],
      orderDetail:[],
      payDetailVisible:false,
      orderDetailVisible:false,
      payTypeList:[
        {value:1,text:'现金'},
        {value:2,text:'支付宝'},
        {value:3,text:'微信'},
        {value:4,text:'会员支付'},
        {value:5,text:'刷卡'},
        {value:6,text:'转账'},
        {value:7,text:'其他'},
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      date:[],

      reportType:1,
      goodsTableVisible:false,
      orderTableVisible:false,
      TypeList: [
        {value: 1, text: '商品流水记录'},
        {value: 2, text: '订单报表'},
      ],
    };
  }
}
</script>

<style scoped>

</style>
