<template>
    <div class="loginMain">
        <el-input placeholder="输入" v-model="password" 
            class="input"
            @change="login"
            show-password
            clearable>
        </el-input> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            var _this = this
            this.$axios.post('/api/login',"username=mayuchao&password=" + this.password)
                .then((response)=>{
                    console.log(response.data)
                    if(response.data.status == 200) {
                        this.$notify({
                            // title: 'ERROR',
                            // message: 'ERROR',
                            type: 'success',
                            position: 'top-right',
                            offset: 100,
                            customClass: "errorNotify",
                            showClose: false,
                            duration: 1500
                        });
                        _this.$router.push({name:'Index'});

                    } else {
                        // this.$message({
                        //     type: 'error',
                        //     message: 'ERROR',
                        //     center: true
                        // });
                        this.$notify({
                            // title: 'ERROR',
                            // message: 'ERROR',
                            type: 'error',
                            position: 'top-right',
                            offset: 100,
                            customClass: "errorNotify",
                            showClose: false,
                            duration: 1500
                        });
                    }
                })
        }
    }
}
</script>

<style>

    .input {
        width: 270px;
    }

    .input input {

        text-align: center;
    }
    
    .input input::-webkit-input-placeholder {
        text-align: center;
    }
    
    .loginMain{
        margin-top: 123px;
    }

    .errorNotify {
        width: 50px;
    }
</style>