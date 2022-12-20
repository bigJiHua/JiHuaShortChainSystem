<template>
  <div>
    <div id="logonCon" class="container">
      <div class="login_conten_box">
        <img class="login_img" src="https://jihau.top/api/public/uploads/undraw_Login_re_4vu2.png" />
        <div class="user_input_eara">
          <h2>注册</h2>
          <div class="input_area">
            <p class="newuser">用户名:<small class="wran">⚠必填</small></p>
            <input type="text" v-model="newUser.username" class="form-control login_input"
              placeholder="请输入用户名 (6-12位且唯一)" required />
          </div>
          <div class="input_area">
            <p class="newuser">密码:<small class="wran">⚠必填</small></p>
            <input type="password" class="form-control login_input" placeholder="请输入密码 (6-12位)" required
              v-model="newUser.password" />
          </div>
          <div class="input_area">
            <p class="newuser">确认密码:<small class="wran">⚠必填</small></p>
            <input type="password" class="form-control login_input" placeholder="请再次输入密码" required
              v-model="elsepassword" />
          </div>
          <div class="input_area">
            <p class="newuser">邮箱:<small class="wran">⚠必填</small></p>
            <input type="text" v-model="newUser.email" class="form-control login_input" placeholder="请输入邮箱"
              required />
          </div>
          <div class="btnmenu">
            <el-button @click="$router.back()" class="Loginbtn">返回</el-button>
            <el-button @click="newuser" v-show="!loading" class="Loginbtn">注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostNewUser from '@/API/Login'
export default {
  data () {
    return {
      loading: false,
      elsepassword: '123456i78',
      newUser: {
        username: '4564aa',
        password: '123456i78',
        email: '1959097664@qq.com'
      },
      rules: {
        username: {
          rule: /^\w{6,12}$/,
          msg: '用户名必须为字母开头6-12位'
        },
        password: {
          rule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          msg: '密码不能位空,必须为8-16位非空、非纯字符密码'
        }
      }
    }
  },
  methods: {
    async newuser () {
      this.loading = !this.loading
      if (this.validata('username')) {
        if (this.validata('password')) {
          if (this.newUser.password === this.elsepassword) {
            const loading = this.$loading({
              lock: true,
              text: '注册中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            const { data: res } = await PostNewUser.UpnewUser(this.newUser)
            if (res.status === 200) {
              setTimeout(() => {
                this.$notify({
                  title: '注册成功',
                  message: res.message,
                  type: 'success'
                })
                this.$router.push('/Login')
              }, 2000)
            } else {
              this.$notify({
                title: '警告',
                message: res.message,
                type: 'warning'
              })
            }
            setTimeout(() => {
              loading.close()
            }, 1500)
          } else {
            this.$notify({
              title: '警告',
              message: '两次密码不一致，请检查',
              type: 'warning'
            })
          }
        }
      }
      setTimeout(() => {
        // loading.close()
        this.loading = !this.loading
      }, 1500)
    },
    validata (key) {
      if (!this.rules[key].rule.test(this.newUser[key])) {
        this.$notify.error({
          title: '注册失败',
          message: this.rules[key].msg
        })
        this.loading = !this.loading
        return false
      } else {
        this.loading = !this.loading
        return true
      }
    }
  },
  name: 'RegisterPage'
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
.input_area {
  text-align: left;
}
.newuser{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
    margin: 0 0 5px 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    height: 1.8rem;
    width: 95%;
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
    padding: 10px;
    width: 100%;
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
    width: 94%;
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
.wran {
  display: inline-block;
  margin-left: 5px;
  color: red;
  font-weight: 500;
}
</style>
