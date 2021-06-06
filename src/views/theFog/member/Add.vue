<template>
  <div>
    <el-form ref="addMember" :rules="rules" :model="member" label-width="80px" style="width: 500px" >
      <el-form-item label="会员姓名"  prop="name">
        <el-input v-model="member.name" ></el-input>
      </el-form-item>
      <el-form-item label="会员性别" prop="sex">
        <el-select v-model="member.sex" placeholder="请选择会员性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model.number="member.phone"></el-input>
      </el-form-item>
      <el-form-item label="联系住址">
        <el-input v-model="member.address"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="member.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('addMember')">立即创建</el-button>
        <el-button @click="cancleClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Add",
  props: {
    payRoomId: Number,
    payVisible: Boolean
  },

  data() {
    return {
      member: {
        id: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
        remark: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入会员名称', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择会员性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    cancleClick(){
      this.$parent.$parent.addClose();
    },
    onSubmit(formName) {
      let _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          debugger;
          //开始新增
          this.$message({
            message: '新增成功！',
            type: 'success'
          });
          this.$parent.$parent._data.addVisible=false;
          this.$parent.$parent._data.search=_this.member.name;

        }
      });
    }
  }
}
</script>

<style scoped>

</style>
