<template>
  <div class="home">
    
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
    <p>home</p>
  </div>
</template>

<script>
import axios from 'axios'
import {loginExample} from '@/api/login'
import { mapState, mapActions } from 'vuex'
import Auth from '@/utils/auth'
export default {
  name: 'home',
  data () {
    return {

    }

  },
  created () {
    console.log(11)
    console.log(Auth.hasToken())
    // this.getData()
  },
  methods: {
    getData() {
      // axios.post('http://192.168.43.129:9020/cmdc-audit-component/user/queryUserAuthority',{
      //   "password": "string",
      //     "userId": "zhuxh",
      //     "verifycode": "string"  
      // }).then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });

      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home{
    font-size: 18px;
    color: aqua;
    z-index: 9999;
  }
</style>
