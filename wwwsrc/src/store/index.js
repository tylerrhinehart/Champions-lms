import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//trhinehart-keepr.herokuapp.com/' : '//localhost:3000/';

let auth = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true
})

let api = axios.create({
  baseURL: baseUrl + 'api/',
  timeout: 10000,
  withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    userVaults: [
      // { id: 1, title: 'Tigers', description: 'cool tiger keeps' },
      // { id: 2, title: 'Bears', description: 'cool bear keeps' }
    ],
    homeKeeps: [
      //   { id: 1, private: false, title: 'Tigers are cool!', description: 'Tigers live in Asia', imgUrl: 'https://static.pexels.com/photos/516541/pexels-photo-516541.jpeg' },
      //   { id: 2, private: false, title: 'Mountains', description: 'Snowy mountains underneath a star-filled night sky', imgUrl: 'https://static.pexels.com/photos/291732/pexels-photo-291732.jpeg' },
      //   { id: 3, private: false, title: 'Tigers are cool!', description: 'Tigers live in Asia', imgUrl: 'https://static.pexels.com/photos/516541/pexels-photo-516541.jpeg' },
      //   { id: 4, private: false, title: 'Mountains', description: 'Snowy mountains underneath a star-filled night sky', imgUrl: 'https://static.pexels.com/photos/291732/pexels-photo-291732.jpeg' },
      //   { id: 5, private: false, title: 'Tigers are cool!', description: 'Tigers live in Asia', imgUrl: 'https://static.pexels.com/photos/516541/pexels-photo-516541.jpeg' },
      //   { id: 6, private: false, title: 'Mountains', description: 'Snowy mountains underneath a star-filled night sky', imgUrl: 'https://static.pexels.com/photos/291732/pexels-photo-291732.jpeg' }
    ],
    activeVault: {},
    activeVaultKeeps: [],
    activeKeep: {},
    showBottomVaultsBar: false,
    selectedKeep: '',
    defaultVault: ''
  },

  mutations: {
    login(state, payload) {
      state.user = payload
      state.loggedIn = true
    },
    logout(state) {
      state.user = {}
      state.loggedIn = false
    },
    addVault(state, payload) {
      state.userVaults.push(payload)
    },
    findKeep(state, payload) {
      state.activeKeep = state.homeKeeps.find(k => k._id == payload)
    },
    clearActiveKeep(state) {
      state.activeKeep = {}
    },
    addKeep(state, payload) {
      state.homeKeeps.push(payload)
    },
    addToVault(state, payload) {

    },
    showBottomVaultsBar(state) {
      state.showBottomVaultsBar = !state.showBottomVaultsBar
    },
    findVault(state, payload) {
      state.activeVault = state.userVaults.find(v => v.id == payload)
    },
    updateKeeps(state, payload) {
      state.homeKeeps = payload
    },
    updateVaults(state, payload) {
      state.userVaults = payload
    },
    selectKeep(state, payload) {
      state.selectedKeep = payload
    },
    setActiveVault(state, payload) {
      state.activeVault = payload
    },
    setVaultKeeps(state, payload) {
      state.activeVaultKeeps = payload
    },
    setDefaultVault(state) {
      state.defaultVault = state.userVaults.find(v => v.title == 'Created Keeps')
    },
    updateKeep(state, payload) {
      var index = state.homeKeeps.findIndex(k => k._id == payload._id)
      state.homeKeeps.splice(index, 1, payload)
    }
  },

  actions: {
    login({ commit, dispatch }, payload) {
      auth.post('login', payload).then((res) => {
        commit('login', res.data.data)
        router.push('/dashboard')
      })
        .then(() => {
          dispatch('getUserVaults')
        })
        .catch((err) => console.error(err))
    },
    signup({ commit, dispatch }, payload) {
      auth.post('register', payload).then((res) => {
        commit('login', res.data.data)
        router.push('/dashboard')
        dispatch('defaultVault')
      })
        .catch((err) => console.error(err))
    },
    logout({ commit, dispatch }) {
      auth.delete('logout').then(() => {
        commit('logout')
        router.push('/')
      })
    },
    getAuth({ commit, dispatch }) {
      auth('authenticate').then(res => {
        if (!res.data.data) {
          return router.push('/')
        }
        commit('login', res.data.data)
        router.push('/dashboard')
      })
        .then(() => {
          dispatch('getUserVaults')
        })
        .catch((err) => console.error(err))
    },
    defaultVault({ commit, dispatch }) {
      var vault = {
        title: 'Created Keeps',
        description: 'Creates that I created',
        private: true
      }
      api.post('vaults', vault).then((res) => {
        dispatch('getUserVaults')
      })
    },
    addVault({ commit, dispatch }, payload) {
      api.post('vaults', payload).then((res) => {
        dispatch('getUserVaults')
      })
    },
    findKeep({ commit, dispatch }, payload) {
      commit('findKeep', payload)
    },
    clearActiveKeep({ commit, dispatch }) {
      commit(clearActiveKeep)
    },
    addKeep({ commit, dispatch }, payload) {
      api.post('keeps', payload).then((res) => {
        dispatch('getKeeps')
        commit('selectKeep', res.data.data._id)
        var obj = {
          vaultId: this.state.defaultVault._id
        }
        dispatch('addToVault', obj)
      })
    },
    incrementKeep({ commit, dispatch }, payload) {
      api.post('keeps/increment/' + (payload ? payload : this.state.selectedKeep)).then((res) => {
        commit('updateKeep', res.data.data)
      })
    },
    addToVault({ commit, dispatch }, payload) {
      api.put('vaults/' + payload.vaultId + '/addkeep/' + this.state.selectedKeep).then((res) => {
        dispatch('incrementKeep')
      })
    },
    showBottomVaultsBar({ commit, dispatch }) {
      commit('showBottomVaultsBar')
    },
    getVaultKeeps({ commit, dispatch }, payload) {
      api('vaults/' + payload + '/keeps').then((res) => {
        commit('setVaultKeeps', res.data.data)
      })
        .catch((err) => console.error(err))
    },
    getKeeps({ commit, dispatch }) {
      api('keeps/public/get').then((res) => {
        commit('updateKeeps', res.data.data)
      })
        .catch((err) => console.error(err))
    },
    getUserVaults({ commit, dispatch }) {
      api('uservaults').then((res) => {
        commit('updateVaults', res.data.data)
        commit('setDefaultVault')
      })
        .catch((err) => console.error(err))
    },
    selectKeep({ commit, dispatch }, payload) {
      commit('selectKeep', payload)
    },
    setActiveVault({ commit, dispatch }, payload) {
      commit('setActiveVault', payload)
    },
    deleteKeep({ commit, dispatch }, payload) {
      api.delete('keeps/' + payload).then((res) => {
        dispatch('getKeeps')
      })
    }
  }
})

export default store