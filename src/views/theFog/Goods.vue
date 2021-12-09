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
      </el-input>

      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" style="margin-left: 5px" @click="addVisible=true">新增商品</el-button>
      </el-button-group>

    </div>

    <el-table  ref="goodsTable"
               highlight-current-row :data="goodsData.filter(data => !search|| new String(data.id).includes(search) || data.goodsName.toLowerCase().includes(search.toLowerCase()))"
               :border=true style="margin-top: 5px;" :height="'780px'"
               @current-change="handleCurrentChange">
      <el-table-column prop="id" label="编号" width="140" align="center" header-align="center">
      </el-table-column>
      <el-table-column width="240" prop="goodsType" :formatter="formatterType" label="商品类别"  align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column width="240" prop="goodsName" label="商品名称"  align="right" header-align="center">
      </el-table-column>

      <el-table-column width="240" prop="goodsPrice" :formatter="formatterBalance" style="font-weight: bolder" label="商品单价" align="right" header-align="center" sortable>
      </el-table-column>

      <el-table-column label="操作" header-align="center" align="right" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="info"
              @click="editGoods(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>


    <transition name="el-zoom-in-center">
      <el-dialog v-if="addVisible" title="新增商品" width="600px" :visible.sync="addVisible" :before-close="addClose"  >
        <GoodsAdd></GoodsAdd>
      </el-dialog>
    </transition>
    <transition name="el-zoom-in-center">
      <el-dialog v-if="editVisible" title="编辑商品信息" width="600px"  :visible.sync="editVisible" :before-close="addClose"  >
        <GoodsAdd :editGoodsData="editGoodsData"></GoodsAdd>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import GoodsAdd from "@/views/theFog/GoodsAdd";

export default {
  name: "Goods",
  components: {
    GoodsAdd,
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    formatterBalance:function (row, column, cellValue, index){
      return Number(cellValue).toFixed(2);
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

    doRefresh:async function () {
      let _this=this;
      let data = await _this.$axios.get(_this.$baseUrl + '/thefog/goods/findAllGoods', {
        params: {
          goodsType: _this.goodsCheck,
        }})
      this.goodsData = data;
    },

    addClose(done) {
      let _this= this;
      this.$confirm('是否还有未保存的工作?确定关闭吗？')
          .then(_ => {
            _this.doRefresh();
            _this.addVisible=false;
            _this.editGoodsData={};
            _this.editVisible=false;
            done();
          })
          .catch(_ => {});
    },
    editGoods(rowData){
      debugger;
      this.editGoodsData=rowData;
      this.editVisible=true;
    },
  },
  created() {
    this.doRefresh();
  },
  data() {
    return {
      goodsCheck:-1,
      search:'',
      addVisible:false,//新增界面
      editVisible:false,//编辑界面
      editGoodsData:{},
      currentRow:{},
      goodsData: [],
      topUpData:[],
      nowWeek: '',
      nowDate: '',
      nowTime: '',
      TypeList: [
        {value: -1, text: '全部'},
        {value: 1, text: '商品'},
        {value: 2, text: '剧本'},
      ],
    };
  }
}
</script>

<style scoped>

</style>
