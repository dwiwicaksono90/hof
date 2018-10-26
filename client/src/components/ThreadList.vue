<template>
<div class="container" style="border:1px solid grey">
    <thread-tumb v-for="(thread,index) in threads" :key="index" :thread="thread" ></thread-tumb>
</div>
</template>

<script>
import config from '@/assets/config.js'
import ThreadTumb from '@/components/ThreadTumb.vue'
import {mapState, mapActions} from 'vuex'

const { host } = config

export default {
    name: 'ThreadList',
    components: {
        ThreadTumb
    },
    props: [],
    created(){
        // this.getAllThreads()
        this.getThreads()
    },
    data() {
        return {
           allThreads: []
        }
    },
    computed: {
        ...mapState(['threads'])
    },
    methods: {
        ...mapActions(['getThreads']),
        // getAllThreads(){
        //     axios({
        //         method: 'GET',
        //         url: `${host}/threads`
        //     })
        //     .then((result) => {
        //         console.log(result.data);
        //         this.allThreads = result.data.reverse()
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // }
    }
}
</script>

<style>
    p {
        text-align: right;
    }
</style>
