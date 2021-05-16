<template>
  <h1>{{this.payRoomId}}</h1>
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

    };

  },
  created() {
    alert('结账的桌号为'+this.payRoomId);
  }
}
</script>

<style scoped>

</style>
