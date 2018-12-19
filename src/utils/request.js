import axios from 'axios'
import qs from 'qs'
// import { Message } from 'element-ui'
// import store from '@/store'

var instance = axios.create();
instance.defaults.timeout = 10000;
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default {
    fetchGet(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(res => {
              console.log(res)
              resolve(res.data);
            }).catch(error => {
              console.log(error)
                reject(error);
            })
        })
    },
    fetchPost(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error);
            })
        })
    }
}