<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 300px">
      <el-card style="width: 400px; padding-left: 50px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input type="password" v-model="user.password" placeholder="请输入密码"
                        @keydown.enter.native="doLogin"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <td colspan="2 ">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->

              <el-button style="width: 150px" type="success" @click="doRegister">注册</el-button>
              <el-button style="width: 150px" type="primary" @click="doLogin">登录</el-button>

            </td>
          </tr>
        </table>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  //单页面中不支持前面的data:{}方式
  data() {
    return {
      user: {
        id: '',
        username: '',
        password: '',
      }
    }
  },
  methods: {
    doRegister: async function () {//注册按钮
      let _this = this;
      try {
        if (!_this.user.username&&_this.user.username!==0){
          _this.utils.showWarningTip(_this, '请输入用户名！');
          return;
        }
        if (!_this.user.password&&_this.user.password!==0){
          _this.utils.showWarningTip(_this, '请输入密码！');
          return;
        }
        let data = await _this.$axios.get(_this.$baseUrl + '/thefog/user/registerLoginUser', {
          params: {
            username: _this.user.username,
            password: _this.user.password
          }
        })
        if (data) {
          _this.user = data;
          _this.utils.showSuccessTip(_this, '注册成功');
          this.$store.commit('setUserId', this.user.id);
          this.$store.commit('setUserInfo', JSON.stringify(this.user));
          console.log('注册成功,' + sessionStorage.getItem('userId'));
          this.$router.push('/Main');
        } else {
          _this.utils.showWarningTip(_this, '注册失败，缺少返回数据。');
        }
      } catch (e) {
        console.log('注册失败，失败原因：' + e);
        _this.utils.showErrorTip(_this, '注册失败，失败原因：' + e);
      }
    },
    doLogin: async function () {//一点击登录按钮，这个方法就会执行
      let _this = this;
      try {
        debugger;
        if (!_this.user.username&&_this.user.username!==0){
          _this.utils.showWarningTip(_this, '请输入用户名！');
          return;
        }
        if (!_this.user.password&&_this.user.password!==0){
          _this.utils.showWarningTip(_this, '请输入密码！');
          return;
        }
        let data = await _this.$axios.get(_this.$baseUrl + '/thefog/user/checkUserLogin', {
          params: {
            username: _this.user.username,
            password: _this.user.password
          }
        })
        if (data) {
          _this.user = data;
          _this.utils.showSuccessTip(_this, '登录成功');
          this.$store.commit('setUserId', this.user.id);
          this.$store.commit('setUserInfo', JSON.stringify(this.user));
          console.log('登录成功,' + sessionStorage.getItem('userId'));
          this.$router.push('/Main');
        } else {
          _this.utils.showWarningTip(_this, '登录失败，缺少返回数据。');
        }
      } catch (e) {
        console.log('登录失败，失败原因：' + e);
        _this.utils.showErrorTip(_this, '登录失败，失败原因：' + e);
      }

    },
  }
}
</script>

<style scoped>

</style>
