<template>
  <div>
    <div style="display: flex">
      <el-input  style="width:320px;margin-left: 5px" placeholder="请输入检索内容"
                 v-model="search" >
        <el-button @click="doRefresh" slot="append" icon="el-icon-refresh"></el-button>
      </el-input>

      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" style="margin-left: 5px" @click="choose()">确认选择</el-button>
      </el-button-group>
    </div>

    <el-table  ref="memberTable"
               highlight-current-row :data="goodsData.filter(data => !search || new String(data.id).includes(search) || data.name.toLowerCase().includes(search.toLowerCase()))"
              :border=true style="margin-top: 5px;" :height="'500px'"
               :cell-style="setRowStyle"
               @current-change="handleCurrentChange">
      <el-table-column prop="id" label="商品编号"  align="center" header-align="center">
      </el-table-column>

      <el-table-column prop="goodsName" label="商品名称"  align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="goodsPrice" :formatter="formatterBalance"

                       style="font-weight: bolder;color: red" label="商品单价" align="right" header-align="center" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  components: {
  },
  // 接受父组件的值
  props: {
  },
  name: "GoodsChoose",
  methods: {
    setRowStyle(row) {
      debugger
      if (row.column.label == '商品单价') {
        return 'font-weight: bolder;color: red;'
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    choose:function (){
      debugger;
      const _selectData = this.currentRow;
      console.log(_selectData);
      _selectData.goodsId=_selectData.id;

      this.$parent.$parent.chooseClose(_selectData);
    },
    formatterBalance:function (row, column, cellValue, index){
      if (cellValue){
        return Number(cellValue).toFixed(2);
      }
    },
    doRefresh:async function () {
      let _this=this;
      let data = await _this.$axios.get(_this.$baseUrl + '/thefog/goods/findAllGoods')
      this.goodsData = data;
    },
  },
  created() {
    this.doRefresh();
  },
  data() {
    return {
      goodsData:[],
      search:'',
      addVisible:false,//新增界面
      editVisible:false,//编辑界面
      editMemberData:{},
      chargeMemberData:{},
      chargeVisible:false,//充值界面
      currentRow:{},
      memberData: [],
      nowWeek: '',
      nowDate: '',
      nowTime: '',
    };
  },
}
</script>

<style scoped>

</style>
