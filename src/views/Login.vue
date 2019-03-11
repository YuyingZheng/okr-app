<template>
  <div class="Login">
    <div class="LoginHeader">
      <h1>Hello</h1>
      <p>欢迎来到OKR管理系统</p>
    </div>

    <cell-group class="LoginForm">
      <Field v-model="account"  label="账号/手机号" placeholder="账号/手机号"></Field>
      <Field v-model="password"  label="请输入密码" placeholder="请输入密码"></Field>
      <Button type="info" class="submit">登陆</Button>

      <!-- <Input /> -->
    </cell-group>

    <div class="LoginFooter">
      <img :src="imgUrl">
    </div>
  </div>
</template>

<script>
import { Field, CellGroup, Button } from 'vant'
// import Input from 'components/input'
export default {
  name: 'Login',

  components: {
    Field,
    CellGroup,
    Button
  },

  data () {
    return {
      imgUrl: require('assets/background.png'),
      account: '',
      password: ''
    }
  },

  submit () {
    console.log('submit login data')
  }
}
</script>
<style lang="scss">
  .Login {
    padding: 56px 35px;

    .LoginHeader {

      margin-bottom: 80px;
      text-align: left;
      h1 {
        margin: 0;
      }
    }

    .van-cell {
      padding-left: 0;
      padding-right: 0;
      margin-bottom: 20px;
    }

    .submit {
      width: 100%;
    }

    .LoginFooter {
      margin-left: -56px;
      margin-right: -56px;
      margin-top: 80px;

      img {
        max-width: 100%;
      }
    }
  }
</style>
