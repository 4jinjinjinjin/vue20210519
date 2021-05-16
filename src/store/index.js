import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    userId:'',
    userInfo:{

    }
  },
  mutations: {
    ['setToken'](state,token){
      sessionStorage.setItem("token",token);
      state.token = token;
    },
    ['removeToken'](state,token){
      sessionStorage.removeItem("token",token);
      state.token = token;
    },
    ['setUserId'](state,userId){
      sessionStorage.setItem("userId",userId);
      state.userId = userId;
    },
    ['setUserInfo'](state,userInfo){
      sessionStorage.setItem("userInfo",userInfo);
      state.userInfo = userInfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
