<template>
  <div>
    <h1>登录界面</h1>
    <el-button round @click="gotoMain">主界面</el-button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Login",
  methods: {
    gotoMain:function (){
      this.$router.push('/Main');
      alert('测试跳转');
    },
  }
}
</script>

<style scoped>

</style>