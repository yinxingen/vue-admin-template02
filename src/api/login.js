import request from '@/utils/request'
const proxyPath = process.env.BASE_API;

export function login() {
  return request({
    url: 'https://www.easy-mock.com/mock/5be436246d38dd2824b55308/baseapi/login',
    method: 'post'
  })
}

export const loginExample = (params) => {
  return request.fetchPost('http://127.0.0.1:9020/cmdc-audit-component/user/queryUserAuthority', params);
}

