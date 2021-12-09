<template>
  <div>
    <el-form ref="addGoods" :rules="rules" :model="goods" label-width="80px" style="width: 500px" >
      <el-form-item label="商品类型" prop="goodsType">
        <el-select v-model="goods.goodsType" placeholder="请选择商品类型">
          <el-option label="商品" value="1"></el-option>
          <el-option label="剧本" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称"  prop="goodsName">
        <el-input v-model="goods.goodsName" ></el-input>
      </el-form-item>
      <el-form-item label="商品单价"  prop="goodsPrice">
        <el-input v-model="goods.goodsPrice" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editGoodsData?editSubmit('addGoods'):onSubmit('addGoods')">{{editGoodsData?'保存':'立即创建'}}</el-button>
        <el-button @click="cancleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "GoodsAdd",
  props: {
    editGoodsData: Object,
  },

  data() {
    return {
      goods: {
        goodsType: '',
        goodsPrice: '',
        goodsName: '',
        id: '',
      },
      rules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goodsType: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        goodsPrice: [
          { required: true, message: '请输入商品单价',validator:this.isNum,trigger: 'change' },
          // { validator:this.isNum,trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    isNum (rule, value, callback) {
      const age= /^[0-9.]*$/
      if (!value){
        callback(new Error('请输入商品单价'))
      }
      if (!age.test(value)) {
        callback(new Error('单价只能为数字'))
      }else{
        callback()
      }
    },
    cancleClick(){
      this.$parent.$parent.addClose();
    },
    onSubmit(formName) {
      let _this=this;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          debugger;

          debugger;
          try {
            await _this.$axios.get(_this.$baseUrl + '/thefog/goods/creatGoods',{
              params:{
                goodsJson:JSON.stringify(_this.goods),
              }
            })
            _this.utils.showSuccessTip(_this, '新增成功!');
            this.$parent.$parent._data.addVisible=false;
            this.$parent.$parent.doRefresh();
            this.$parent.$parent._data.search=_this.goods.name;
          }catch (e) {
            _this.utils.showErrorTip(_this, '新增商品异常，异常原因：'+e);
          }
        }
      });
    },

    editSubmit(formName) {
      let _this=this;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          debugger;

          debugger;
          try {
            await _this.$axios.get(_this.$baseUrl + '/thefog/goods/creatGoods',{
              params:{
                goodsJson:JSON.stringify(_this.goods),
              }
            })
            _this.utils.showSuccessTip(_this, '修改成功!');
            this.$parent.$parent._data.editVisible=false;
            this.$parent.$parent._data.editGoodsData= {};
            this.$parent.$parent.doRefresh();
            this.$parent.$parent._data.search=_this.goods.name;
          }catch (e) {
            _this.utils.showErrorTip(_this, '修改会员信息异常，异常原因：'+e);
          }
        }
      });
    }
  },
  created() {
    if (this.editGoodsData){
      this.goods = Object.assign({},this.editGoodsData);
    }
  }
}
</script>

<style scoped>

</style>
