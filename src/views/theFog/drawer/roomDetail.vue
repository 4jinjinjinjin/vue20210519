<el-drawer
    :visible.sync="roomDetailDw"
    size="40%" :with-header="false">
<div style="padding-left: 15px">
  <h1 style="font-size: xx-large">房间详情</h1>
  <el-form ref="form" :model="roomDetail" label-width="80px" style="width: 50%;">
    <el-form-item label="房间名称">
      <el-input v-model="roomDetail.name"></el-input>
    </el-form-item>
  </el-form>

  <el-button @click="inroomDetailDw = true">打开里面的!</el-button>
  <el-drawer
      title="我是里面的"
      :append-to-body="true"
      :before-close="handleClose"
      :visible.sync="inroomDetailDw">
    <p>_(:зゝ∠)_</p>
  </el-drawer>
</div>
</el-drawer>


<script>
export default {
  name: "roomDetail",
  data() {
    return {
      drawer: false,
      inroomDetailDw: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>

<style scoped>

</style>
