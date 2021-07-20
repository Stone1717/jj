<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="登录手机号码" prop="telephone">
            <el-input type="telephone" v-model="ruleForm.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verification_code">
            <el-input type="number" v-model="ruleForm.verification_code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>


    <router-link to="/">GO TO HOME</router-link>
    <router-link to="/login">GO TO login</router-link>
    <router-view></router-view>


</template>

<script>
import { getList } from './api/index';

export default {
    name: 'App',
    data(){
        var validateTelephone = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('手机号不能为空'));
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'))
                }
            }
        };
        return {
            ruleForm:{
                telephone:'',
                verification_code:'',
            },
            rules:{
                telephone: [
                    { validator: validateTelephone, trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
        getList({
            // get请求放params
            // post请求放data里面
            // 参考链接：https://axios-http.com/docs/req_config
            params: {
              sss: '3',
            },
        });
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate(valid)=>{
                if(valid){
                    this.$https.post('/api')
                    .then(data=>{
                        if(data.data.code == 200){
                            setTimeout(() => {
                                Cookies.set('token',data.data.token,30);
                                this.$store.commit('settoken',data.data.token);
                                this.$router.push({path:'/home'});
                                this.$message('登录成功');
                            }, 2000);
                        }
                    })
                    .catch(err=>{
                        this.$message('服务器繁忙,请重试');
                        this.$router.push({path:'/'})
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
