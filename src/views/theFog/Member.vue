<template>
  <div>
    <div style="display: flex">
      <el-input  style="width:320px;margin-left: 5px" placeholder="请输入检索内容"
                 v-model="search" >
        <el-button @click="doRefresh" slot="append" icon="el-icon-refresh"></el-button>
      </el-input>

      <el-button-group>
        <el-button type="primary" v-if="dealType!==1" icon="el-icon-plus" style="margin-left: 5px" @click="addVisible=true">新增会员</el-button>
        <el-button type="primary" v-if="dealType===1" icon="el-icon-plus" style="margin-left: 5px" @click="chooseMember()">确认选择</el-button>
      </el-button-group>

    </div>

    <el-table  ref="memberTable"
               highlight-current-row :data="memberData.filter(data => !search || new String(data.id).includes(search) || data.name.toLowerCase().includes(search.toLowerCase()))"
              :border=true style="margin-top: 5px;" :height="dealType!==1?'800px':'500px'"
               @current-change="handleCurrentChange">
<!--      <el-table-column-->
<!--          type="index"-->
<!--          width="50">-->
<!--      </el-table-column>-->
      <el-table-column prop="id" label="编号" width="140" align="center" header-align="center">
      </el-table-column>
      <el-table-column
          label="姓名"
          width="180"  align="center" header-align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p><span style="font-weight: bolder">姓名：</span>{{ scope.row.name }}</p>
            <p><span style="font-weight: bolder">性别：</span>{{ scope.row.sex=='1'?'男':'女' }}</p>
            <p><span style="font-weight: bolder">住址：</span>{{ scope.row.address }}</p>
            <p><span style="font-weight: bolder">备注：</span>{{ scope.row.remark }}</p>

            <div slot="reference" class="name-wrapper">
              <el-tag  :type="scope.row.sex=='1'?'':'danger'">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="240" prop="phone" label="联系电话"  align="right" header-align="center">
      </el-table-column>
      <el-table-column width="240" v-if="dealType!==1" prop="opertime" :formatter="formatterOpertime" label="注册时间" align="center" header-align="center" sortable>
      </el-table-column>
      <el-table-column width="240" prop="balance" :formatter="formatterBalance" style="font-weight: bolder" label="余额" align="right" header-align="center" sortable>
      </el-table-column>

      <el-table-column label="操作" header-align="center" align="right" >
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="goCharge( scope.row)">余额充值</el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">充值记录</el-button>
          <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)">消费记录</el-button>
          <el-button
              size="mini"
              type="info" v-if="dealType!==1"
              @click="editMember(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <transition name="el-zoom-in-center">
      <el-dialog v-if="addVisible" title="新增会员" width="600px" :visible.sync="addVisible" :before-close="addClose"  >
        <Add></Add>
      </el-dialog>
    </transition>
    <transition name="el-zoom-in-center">
      <el-dialog v-if="editVisible" title="编辑会员信息" width="600px"  :visible.sync="editVisible" :before-close="addClose"  >
        <Add :editMemberData="editMemberData"></Add>
      </el-dialog>
    </transition>

    <transition name="el-zoom-in-center">
      <el-dialog  :modal="false" v-if="chargeVisible" title="会员充值" :visible.sync="chargeVisible" :before-close="chargeClose"  >
        <Charge :chargeMemberData="chargeMemberData"></Charge>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import moment from 'moment';
import Add from "@/views/theFog/member/Add";
import Charge from "@/views/theFog/member/Charge";
export default {
  components: {
    Add,
    Charge,
  },
  // 接受父组件的值
  props: {
    dealType: Number,
  },
  name: "Member",
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    chooseMember:function (){
      debugger;
      const _selectData = this.currentRow;
      console.log(_selectData);
      this.$parent.$parent.chooseClose(_selectData);
    },
    formatterBalance:function (row, column, cellValue, index){
      return Number(cellValue).toFixed(2);
    },
    doRefresh:async function () {
      let _this=this;
      let data = await _this.$axios.get(_this.$baseUrl + '/thefog/member/findAllMember')
      this.memberData = data;
    },
    formatterOpertime: function (row, column, cellValue, index) {
      return moment(cellValue).format('YYYY-MM-DD');
    },

    addClose(done) {
      let _this= this;
      this.$confirm('是否还有未保存的工作?确定关闭吗？')
          .then(_ => {
            _this.doRefresh();
            _this.addVisible=false;
            _this.editMemberData={};
            _this.editVisible=false;
            done();
          })
          .catch(_ => {});
    },
    goCharge(rowData){
      debugger;
      this.chargeMemberData=rowData;
      this.chargeVisible=true;
    },
    editMember(rowData){
      debugger;
      this.editMemberData=rowData;
      this.editVisible=true;
    },
    chargeClose(done) {
      let _this= this;
      this.$confirm('是否还有未保存的工作?确定关闭吗？')
          .then(_ => {
            _this.doRefresh();
            _this.chargeVisible=false;
            done();
          })
          .catch(_ => {});
    },
  },
  created() {
    this.doRefresh();
  },
  data() {
    return {
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
