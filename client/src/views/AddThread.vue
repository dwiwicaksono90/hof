<template>
    <div class="container" style="border: 1px solid grey; min-height:500px; padding:50px;">
    <div class="alert alert-warning" role="alert" v-if="allertMsg"> {{ allertMsg }} </div>
    <div class="alert alert-success" role="alert" v-if="successMsg"> {{ successMsg }} </div>
        <div style="height:120px;">
            <h2>Add New Thread</h2>
            <hr>
        </div>
        <div>
            <div class="form-group" >
                <label for="exampleInputEmail1">Title</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="title" v-model="inputTitle">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Question Description</label>
                <wysiwyg v-model='inputQuestion'/>
                <!-- <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="title" v-model="inputTitle"> -->
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">tags</label>
                <!-- <div> <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/> </div> -->
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" v-model="inputTags"></textarea>
            </div>
            <button class="btn btn-primary" data-dismiss="modal" @click="AddThread">Submit</button>
        </div>

    </div>
</template>

<script>
    // import VueTagsInput from '@johmun/vue-tags-input';
    import config from '@/assets/config.js'
    const { host } = config

    export default {
        name: 'AddThread',
        components: {
            // VueTagsInput
        },
        data(){
            return {
                // tag: '',
                // tags: []
                allertMsg: null,
                successMsg: null,
                inputTitle: '',
                inputQuestion: '',
                inputTags: ''
            }
        },
        methods: {
            AddThread(){
                // let self = this
                if(this.inputTitle === '' || this.inputDescription === ''){
                    this.getWarning('field title & description must not null')
                } else {
                    axios({
                        method: 'POST',
                        url: `${host}/threads`,
                        headers: {
                            token: localStorage.getItem('tokenHO')
                        },
                        data: {
                            title: this.inputTitle,
                            question: this.inputQuestion,
                            tags: this.inputTags
                        }
                    })
                    .then((result) => {
                        // console.log('siniiiii', result.data.result._id);
                        // console.log(result.data.result);
                        this.getStatus(1, result.data.msg)
                        setTimeout(() => {
                            this.$router.push(`/thread/${result.data.result._id}`)
                        },1000)
                    }).catch((err) => {
                        console.log(err.response);
                        this.getStatus(0, err.response)
                    }, 1000);

                }
            },
            getStatus(status, text){
                if(status === 1){
                    this.successMsg = text
                } else {
                    this.allertMsg = text
                }
                this.allertMsg = text 
                setTimeout(() => { 
                    this.allertMsg = null
                    this.successMsg = null
                }, 3000);
            }
        }
    }
</script>

<style>
.alert-warning {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
}
</style>