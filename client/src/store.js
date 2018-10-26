import Vue from 'vue'
import Vuex from 'vuex'
import config from '../src/assets/config'
import { get } from 'https';

const {host}  = config
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    threads: []
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    }
    ,
    setAllThreads(state, payload){
      state.threads = payload
    }
  },
  actions: {
    getUser({ commit, dispatch }, payload){      
      let token = localStorage.getItem('tokenHO')
      if(token){
        axios({
          method: 'GET',
          url: `${host}/users`,
          headers : {
            token: token
          }
        })
        .then((result) => {
            // console.log(result.data);
          commit('setUser', result.data)
        }).catch((err) => {
          localStorage.removeItem('tokenHO')
        });
      } else {
        commit('setUser', null)
      }
    }
    ,
    getThreads({commit, dispatch}, payload){
      // console.log('masuk');
      axios({
          method: 'GET',
          url: `${host}/threads`
      })
      .then((result) => {
        let datas = result.data.reverse()
        commit('setAllThreads', datas)
      }).catch((err) => {
          console.log(err);
      });
    },
    getSearch({commit, dispatch}, payload){
      // console.log(payload);
      axios({
        method: 'GET',
        url: `${host}/threads/search/${payload}`,
      })
      .then((result) => {
          // console.log(result.data.result);
          commit('setAllThreads', result.data.result)
      }).catch((err) => {
          console.log(err);
      });
    }
  }
})
