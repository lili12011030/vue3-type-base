<template>

<div class="login-container">

  <el-form class='login-form' label-width="100px" :model="form" :rules="rules" ref="registerForm">
    <div class="title-container">
      <img src="/logo.png" alt="">
    </div>
    <el-form-item prop="email" label="邮箱">
      <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="captcha" label="验证码" class="captcha-container" >
      <div class="captcha">
        <img :src="code.captcha" @click="resetCaptcha">
      </div>

      <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>

    </el-form-item>

    <el-form-item prop="nickname" label="昵称">
      <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
    </el-form-item>

        <el-form-item prop="passwd" label="密码">
      <el-input type="password" v-model="form.passwd" placeholder="请输入密码"></el-input>
    </el-form-item>

    <el-form-item prop="repeatPasswd" label="确认密码">
      <el-input type="password" v-model="form.repeatPasswd" placeholder="请再次输入密码"></el-input>
    </el-form-item>

    <el-form-item label=" ">
      <el-button type="primary" @click="handleRegister" >注册</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script lang="ts" setup>
import { register } from '@/api/users'
import {reactive, ref, inject} from "vue";
import {ElForm, ElMessageBox, ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const form = reactive({
  email:"316783812@qq.com",
  nickname:"大圣老师",
  passwd:"a316783812",
  repeatPasswd:"a316783812",
  captcha:""
})
const rules = reactive({
  email:[
    { required:true, message:"请输入邮箱" },
    { type:'email', message:"请输入正确的邮箱格式" },
  ],
  captcha:[
    { required:true, message:"请输入验证码" },
  ],
  nickname:[
    { required:true, message:"请输入昵称" },
  ],
  passwd:[
    { required:true, pattern:/^[\w_-]{6,12}$/g, message:"请输入6~12位密码" },
  ],
  repeatPasswd:[
    { required:true, message:"请再次输入密码" },
    { validator: (rule:any,value:string,callback:(e? : Error|string) => void)=>{
        if(value!== form.passwd){
          callback(new Error('两次密码不一致'))
        }
        callback()
      }}
  ],
})
const registerForm = ref<InstanceType<typeof ElForm>>()
const router  = useRouter()
const handleRegister = function (){
  registerForm.value?.validate( async valid =>{
    if(valid){
      let obj = {
        email:form.email,
        nickname:form.nickname,
        passwd: form.passwd,
        captcha:form.captcha,
      }

      let ret:any = await register(obj)
      if(ret.code === 0){
        await ElMessageBox.alert('注册成功', '成功', {
          confirmButtonText: "去登录",
          callback: () => {
            router.push("/login")
          }
        })
      } else{
        ElMessage.error(ret.message)
      }
    }

  })
}

const code = reactive({
  captcha:"/dev-api/captcha"
})
const resetCaptcha = function (){
  code.captcha = '/dev-api/captcha?_t'+new Date().getTime()
}


</script>

<style lang="scss">
.login-container {
  width: 100%;
  min-height: 100%;

  .login-form {
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    text-align: center;
    margin-bottom: 20px;

    img {
      width: 200px
    }
  }

  .captcha-container {
    width: 340px;
    position: relative;

    .el-button {
      width: 90px;
      padding: 0;
      line-height: 40px
    }

    .captcha {
      position: absolute;
      right: -110px ;
      img {
        width: 90px;
        height: 50px;
        cursor: pointer;
      }
    }
  }
}
</style>

