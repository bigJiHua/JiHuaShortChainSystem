<template>
  <div id="logonCon" class="container">
    <div class="login_conten_box">
      <img class="login_img" src="https://jihau.top/api/public/uploads/undraw_Login_re_4vu2.png" />
      <div class="user_input_eara">
        <h2 v-if="islogin">登录 <small>Login</small></h2>
        <h2 v-else>欢迎回来 <small>Come Back</small></h2>
        <form class="form-horizontal" v-if="islogin">
          <div>
            <label for="username" class="login_lable"> 用户名:</label>
            <input id="username" type="text" v-model="username" class="form-control login_input" placeholder="请输入用户名"
              require />
          </div>
          <div>
            <label for="password" class="login_lable"> 密码:</label>
            <input id="password" type="password" class="form-control login_input" placeholder="请输入密码" required
              v-model="password" @keydown.enter="login" />
          </div>
        </form>
        <div class="btnmenu" v-if="islogin">
          <el-button type="primary" plain @click="register" class="Loginbtn" >注册</el-button>
          <el-button type="primary" plain @click="login" class="Loginbtn">登录</el-button>
        </div>
        <div class="btnmenu" v-else>
          <router-link to="/ControlPanel/shortenImmediately"><el-button type="primary" plain class="Loginbtn" >进入</el-button></router-link>
        </div>
      </div>
    </div>
    <p class="tip">
      <span>⚠ 本短链系统并不提供给大众使用</span><br>
      <span>⚠ 本站点仅供演示项目使用，非正式网站，如有发现大量非内测用户使用，立即关停</span><br>
      <span>如有疑问请 <a href="https://jihau.com/%e6%84%8f%e8%a7%81%e5%8f%8d%e9%a6%88">联系站长</a></span>
    </p>
  </div>
</template>

<script>
import PostLogin from '@/API/Login'

export default {
  data () {
    return {
      username: '4564aa',
      password: '123456',
      msg: '正在登录',
      setTime: 500,
      rules: {
        username: {
          rule: /^\S/,
          msg: '用户名不能为空!且长度为6-12位'
        },
        password: {
          rule: /^\S{6,12}/,
          msg: '密码不能为空!且长度为6-12位'
        }
      },
      islogin: localStorage.getItem('token') === null
    }
  },
  methods: {
    async login () {
      // 验证是否已经拥有token
      if (!localStorage.getItem('token')) {
        // 验证输入的用户名是否合法
        if (this.validata('username')) {
          // 验证输入的密码是否合法
          if (this.validata('password')) {
            // 发起请求
            const { data: res } = await PostLogin.LoginMenu(
              {
                username: this.username,
                password: this.password
              }
            )
            // 判断返回状态码是否成功
            if (res.token !== undefined) {
              localStorage.setItem('token', res.token)
              localStorage.setItem('Username', res.data.username)
              setTimeout(() => {
                this.$router.push('/ControlPanel')
              }, this.setTime)
            }
          }
        }
      } else {
        setTimeout(() => {
          this.$notify({
            title: '警告',
            message: '已经登录啦！请勿重复提交表单！',
            type: 'warning'
          })
          this.$router.push('/ControlPanel')
        }, this.setTime)
      }
    },
    register () {
      if (localStorage.getItem('token')) {
        setTimeout(() => {
          this.$notify({
            title: '警告',
            message: '已经登录啦！请勿重复提交表单！',
            type: 'warning'
          })
          this.$router.push('/ControlPanel')
        }, this.setTime)
      } else {
        this.$router.push('/register')
      }
    },
    validata (key) {
      let bool = true
      if (!this.rules[key].rule.test(this[key])) {
        this.show = true
        this.msg = this.rules[key].msg
        bool = false
        return false
      }
      return bool
    }
  },
  name: 'LoginPage'
}
</script>

<style scoped>
#logonCon {
  width: 100vw;
  height: 100vh;
  background-color: rgba(244, 244, 244, 0.4);
}

* {
  margin: 0;
  padding: 0;
}

.login_conten_box {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tip{
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 100vw;
  > span {
    color: red;
  }
}
@media only screen and (min-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 55vw;
    border-radius: 12px;
    box-shadow: 0 0px 45px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
  }

  .login_img {
    width: 50%;
    border-radius: 12px 0 0 12px;
  }

  .user_input_eara {
    width: 100%;
    padding: 20px 25px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
    color: black;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_lable {
    display: inline-block;
    width: 4rem;
    font-weight: bolder;
  }

  .login_input {
    margin: 0 0 25px 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    height: 1.8rem;
  }
}

@media only screen and (max-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 90vw;
    border-radius: 12px;
    box-shadow: 0 0 45px rgba(0, 0, 0, 0.2);
  }

  .login_img {
    display: none;
  }

  .user_input_eara {
    padding: 15px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_lable {
    display: inline-block;
    width: 4rem;
    font-weight: bolder;
  }

  .login_input {
    margin: 0 0 25px 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    height: 1.8rem;
  }
}

.btnmenu {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.Loginbtn {
  padding: 10px 18px;
}
</style>
