<template>
  <div>
    <div style="display: flex">
      <el-select style="width:160px;" @change="doRefresh" v-model="goodsCheck" placeholder="请选择">
        <el-option
            v-for="item in TypeList"
            :key="item.value"
            :label="item.text"
            :value="item.value">
        </el-option>
      </el-select>
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

      <el-table-column width="240" prop="goodsType" :formatter="formatterType" label="商品类别"  align="center" header-align="center" sortable>
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
    formatterType:function (row, column, cellValue, index){
      debugger
      let k=[{value:'1',text:'商品'},
        {value:2,text:'剧本'}]
      for (let i=0;i<k.length;i++){
        if (k[i].value==cellValue){
          return k[i].text;
        }
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
      let data = await _this.$axios.get(_this.$baseUrl + '/thefog/goods/findAllGoods',{
        params: {
          goodsType: _this.goodsCheck,
        }})
      this.goodsData = data;
    },
  },
  created() {
    this.doRefresh();
  },
  data() {
    return {
      goodsCheck:-1,
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
      TypeList: [
        {value: -1, text: '全部'},
        {value: 1, text: '商品'},
        {value: 2, text: '剧本'},
      ],
    };
  },
}
</script>

<style scoped>

</style>
