<template>
  <div>
    <el-form ref="form" :model="roomDetail" label-width="80px" style="width: 100%;" disabled>
      <el-row>
        <el-col :span="6">
          <el-form-item label="房间编号" >
            <el-input v-model="roomDetail.id" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房间名称">
            <el-input v-model="roomDetail.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="roomDetail.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开始时间">
            <el-input :value="formatDate(roomDetail.startTime, 'YYYY-MM-DD HH:mm:ss')"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-input :value="getDiffTime(roomDetail.startTime, new Date())"> </el-input>
        </el-col>
      </el-row>
    </el-form>

    <el-collapse  accordion>
      <el-collapse-item title="房间信息" name="1">
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
    <h1>{{this.payRoomId}}</h1>
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

</style>
