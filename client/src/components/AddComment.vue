<template>
    <div class="container" >
        <h4 class="mb-2">Answer This!</h4>
        <div class="form-group">
            <wysiwyg v-model='text'/>
            <!-- <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="text"></textarea> -->
            <button class="btn btn-sm btn-primary" @click="comment">comment</button>
        </div> <hr>
    </div>
</template>

<script>
import config from '@/assets/config.js'

const { host } = config

export default {
    name: 'AddComment',
    props: ['threadId'],
    data(){
        return {
            text: ''
        }
    },
    methods: {
        comment(){            
            axios({
                method: 'POST',
                url: `${host}/answers`,
                headers: {
                    token: localStorage.getItem('tokenHO')
                },
                data: {
                    text: this.text,
                    threadId: this.threadId
                }
            })
            .then((result) => {
                this.text = ''
                this.$emit('get-thread')
                console.log('comment sukses', result);               
            }).catch((err) => {
                console.log(err);
                
            });
            
        }
    }
}
</script>
<style>

</style>
