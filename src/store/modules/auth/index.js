import Cookies from 'js-cookie'
import Auth from '@/utils/auth'
import request from '@/utils/request'
import axios from 'axios'
import {login,loginExample} from '@/api/login'

const state = {
    navList: []
}

const mutations = {
    setNavList: (state, data) => {
        state.navList = data
    },
    setToken: (state, data) => {
        if(data){
            Auth.setToken(data)
            Auth.setLoginStatus()
        } else {
            Auth.removeToken()
            Auth.removeLoginStatus()
        }
        state.token = data
    }
}

const actions = {
    // 登录
    userLogin({ commit },userInfo) {
        return new Promise((resolve) => {
            console.log(userInfo)
            loginExample({...userInfo}).then(res=>{
                if(res.code =='00000'){
                    localStorage.Audit_userInfo = JSON.stringify(res.data) 
                    commit('setToken', res.data.token)
                }
                resolve(res)
            })
        });
    },
    // 获取该用户的菜单列表
    getNavList({commit}){
        return new Promise((resolve) =>{
            axios.get('https://www.easy-mock.com/mock/5be436246d38dd2824b55308/baseapi/user/navlist').then(res=>{
                console.log(res)
                commit("setNavList", res.data)
                resolve(res)
            })
            // axios.get({
            //     url: 'https://www.easy-mock.com/mock/5be436246d38dd2824b55308/baseapi/user/navlist',
            // }).then(res=>{
            //     console.log(res)
            //     commit("setNavList", res.data)
            //     resolve(res) 
            // })
        })
    },
    // 将菜单列表扁平化形成权限列表
    getPermissionList({state}){
        return new Promise((resolve) =>{
            let permissionList = []
            // 将菜单数据扁平化为一级
            function flatNavList(arr){
                for(let v of arr){
                    if(v.child && v.child.length){
                        flatNavList(v.child)
                    } else{
                        permissionList.push(v)
                    }
                }
            }
            flatNavList(state.navList)
            resolve(permissionList)
        })
    },
    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit('setToken', '')
            commit('user/setName', '', { root: true })
            commit('tagNav/removeTagNav', '', {root: true})
            resolve()
        })
    },

    // 重新获取用户信息及Token
    // TODO: 这里不需要提供用户名和密码，实际中请根据接口自行修改
    relogin({dispatch, commit, state}){
        return new Promise((resolve) => {
            // 根据Token进行重新登录
            let token = Cookies.get('token'),
                userName = Cookies.get('userName')

            // 重新登录时校验Token是否存在，若不存在则获取
            if(!token){
                dispatch("getNewToken").then(() => {
                    commit('setToken', state.token)
                })
            } else {
                commit('setToken', token)
            }
            // 刷新/关闭浏览器再进入时获取用户名
            commit('user/setName', decodeURIComponent(userName), { root: true })
            resolve()
        })
    },

    // 获取新Token
    getNewToken({commit, state}){
        return new Promise((resolve) => {
            axios({
                url: '/getToken',
                method: 'get',
                param: {
                    token: state.token
                }
            }).then((res) =>{
                commit("setToken", res.token)
                resolve()
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}