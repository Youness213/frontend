const state = {
    user: null,
    timeout: null,
    username:'',
    useremail:''
  };
  const getters = {
    isAuthentified: () => {
      if (state.user == null) {
          return false
      } else {
          return true
      }
    },
  };
  const actions = {
    async LogIn ({ commit }, user) {
      let data = null
      console.log(user)
      await commit('setUser', data.ID)
    },
    async LogOut ({ commit }) {
      const user = null
      commit('logout', user)
    }
  };
  
  const mutations = {
    setUser (state, Login) {
      state.user = Login
    },
    logout (state, user) {
      state.user = user
      state.modules = user
    }
  };
  export default {
    state,
    actions,
    mutations,
    getters
  }
  