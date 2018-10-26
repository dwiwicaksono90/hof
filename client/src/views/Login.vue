<template>
    <div class="container">
        <!-- login -->
        <div class="row">
            <div class="col-md-4 offset-md-4" style="border: 1px solid grey; padding: 50px;">

                 <div class="alert alert-warning" role="alert" v-if="warningText">
                    {{ warningText }}
                </div>
                <div class="alert alert-success" role="alert" v-if="successText">
                    {{ successText }}
                </div>
                
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="loginEmail">                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="loginPassword">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary" @click="login">login</button>
                </div>
                <div class="form-group">
                    <span class="btn" data-toggle="modal" data-target="#modal-register"> Register </span>
                </div>
            </div>
        </div>


         <!-- register -->
        <div class="modal fade" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Name" required v-model='registerName'>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="registerEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" v-model="registerPassword" placeholder="Password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="register">Submit</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    import {mapActions, mapState} from "vuex"
    import config from '@/assets/config.js'
    const { host } = config

    export default {
        name: 'Login',
        props: [],
        data(){
            return{
                registerName: '',
                registerEmail: '',
                registerPassword: '',
                loginEmail: '',
                loginPassword: '',
                warningText: '',
                successText: ''
            }
        },
        methods: {
            ...mapActions(["getUser"]),
            register(){
                axios({
                method: 'POST',
                url: `${host}/users/register`,
                data: {
                    name: this.registerName,
                    email: this.registerEmail,
                    password: this.registerPassword
                    }
                })
                .then((result) => {
                    this.getClear()
                    // this.getAllert()
                    console.log('masuk resul');
                    
                    console.log(result);
                    
                }).catch((err) => {
                    this.getWarning(err.response.data.message)
                    // console.log(err.response.data.errors);
                    this.registerPassword = ''
                    console.log(err.response.data.message);
                    // console.log(err);
                    
                });
            },
            login(){ 
                if(this.loginEmail === '' || this.loginPassword === ''){
                    this.getWarning('email and password  must require!')
                } else {
                    axios({
                        method: 'POST',
                        url: `${host}/users/login`,
                        data: {
                            email: this.loginEmail,
                            password: this.loginPassword
                        }
                    })
                    .then((result) => {
                        console.log(result.data.msg);
                        localStorage.setItem('tokenHO', result.data.token)
                        this.getSuccess()
                        this.getClear()
                        this.getUser()
                        this.$router.push('/')
                    }).catch((err) => {
                        this.loginPassword = ''
                        this.getWarning(err.response.data.msg)
                        // console.log(err.response.data.msg);
                    });
                }            
            },
            getWarning(text){
                this.warningText = text 
                setTimeout(() => { 
                    this.warningText = null
                }, 5000);
            },
            getSuccess(text){
                this.successText = text 
                setTimeout(() => { 
                    this.successText = null
                }, 5000);
            },
            getClear(){
                this.registerName = '',
                this.registerEmail = '',
                this.registerPassword = '',
                this.loginEmail = '',
                this.loginPassword = ''
            }
        
        },
        computed: {
            ...mapState(["user"])
        }
    }
</script>

<style>

</style>