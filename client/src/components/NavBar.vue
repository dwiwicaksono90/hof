<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="navbar-brand">
            <router-link :to="{ path: '/' }"> Hacktiv Overflow </router-link>        
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Category
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                    </div>
                </li>
                <li class="form-inline" style="margin: 0 20px;">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="inputSearch">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="search">Search</button>
                </li>
            </ul>

            <div class="form-inline my-2 my-lg-0">
                    <button class="btn btn-primary" id="google-signin-button" v-if="!user" >Google</button>
                <div v-if="!user">
                    <router-link :to="{ path: `/login` }"> <button class="btn btn-primary"> Login / Register </button> </router-link>
                    <!-- <div id="signin" class="g-signin2" data-onsuccess="onSignIn()" ></div> -->
                </div>
                <div v-if="user">
                    <p>Welcome, {{user.name}}</p>
                    <button class="btn btn-primary" @click="$router.push('/thread/add')"> Add New Thread </button>
                    <!-- <button class="btn btn-primary" @click="$router.push('/mythread')"> My Thread </button> -->
                    <button type="button" class="btn btn-primary" v-if="user" @click="logout">Sign Out</button>
                </div>
                
            </div>
        </div>
        
    </nav>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import config from '@/assets/config.js'

    const {host} = config

    export default {
        name: 'NavBar',
    data(){
        return {
            inputSearch: ''
        }
    },
    methods: {
        ...mapActions(['getUser', 'getSearch']),
        logout(){
            localStorage.removeItem('tokenHO')
            this.getUser()
            this.$router.push('/')
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
             });
            this.btnGoogle()
        },
        search(){
            // this.$router.push('/')
            this.getSearch(this.inputSearch)
        },
        onSignIn(googleUser) {                            
                    // Useful data for your client-side scripts:
                    var profile = googleUser.getBasicProfile();
                    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
                    // console.log('Full Name: ' + profile.getName());
                    // console.log('Given Name: ' + profile.getGivenName());
                    // console.log('Family Name: ' + profile.getFamilyName());
                    // console.log("Image URL: " + profile.getImageUrl());
                    // console.log("Email: " + profile.getEmail());
                    
                    // The ID token you need to pass to your backend:
                var id_token = googleUser.getAuthResponse().id_token;
                // console.log("ID Token: " + id_token);
                axios({
                    method: 'POST',
                    url: `${host}/users/loginGoogle`,
                    data:{
                        token: id_token
                    }
                })
                .then(data => {
                    // console.log(data.data.token);
                    localStorage.setItem('tokenHO', data.data.token)
                    this.getUser()
                })
                .catch(err => {
                    console.log(err);
                })
        },
        btnGoogle(){
            gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
            })
        }
    },
    mounted() {
        this.btnGoogle()
    },
    computed: {
        ...mapState(['user'])
        }
    }
</script>

<style>
.btn{
    margin: 0 10px;
}
</style>