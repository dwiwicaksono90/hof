<template>
    <div class="comments col-md-12" id="comments">
        <div class="small text-right">{{answer.updatedAt.slice(0, 10)}}</div>
        <div class="comment mb-2 row">
            <div class="comment-avatar col-md-1 col-sm-2 text-center pr-1">
                <h6>{{answer.user.name}}</h6>
                <a><img class="mx-auto rounded-circle img-fluid" src="http://www.fao.org/fileadmin/templates/experts-feed-safety/images/profile-img03.jpg"
                        alt="avatar"></a>
            </div>
            <div class="comment-content col-md-11 col-sm-10">
                <div class="comment-body">
                    <br>
                    <div class="text-left text" style="padding:5px 20px" v-html="answer.text"></div>
                </div>

                <div class="text-right" v-if="user && answer.user._id === user.id">
                    <!-- <i type="button" class="fas fa-trash text-right" @click="updateAnswer"></i> -->
                </div>

            </div>
        </div>
        <div>
             <button class="fas fa-thumbs-up btn btn-primary" @click="upVote" v-if="user && user.id !== answer.user._id"></button>
            <!-- <button class="btn btn-primary" @click="upThread">UpVote </button> -->
            <button class="fas fa-thumbs-down btn btn-primary" @click="downVote" v-if="user && user.id !== answer.user._id"></button>
            up: {{ answer.upVotes.length }}
            <!-- <button class="btn btn-primary" @click="upVote" v-if="user && user.id !== answer.user._id">UpVote</button> -->
            down: {{ answer.downVotes.length }}
            <!-- <button class="btn btn-primary" @click="downVote" v-if="user && user.id !== answer.user._id">DownVote</button> -->
        </div>
        <div v-if="user && user.id === answer.user._id">
            <button class="btn btn-primary" data-toggle="modal" data-target="#modal-edit-answer">Edit</button>

        </div>
        <hr>

        <!-- modal Edit article -->
        <div id="modal-edit-answer" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="padding: 5% 10%;">
                    <!-- form  -->
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Your Answer</label>
                        <wysiwyg v-model='editAnswer' />
                        <!-- <textarea class="form-control" id="exampleFormControlsacTextarea1" rows="20" v-html="editQuestion"></textarea> -->
                    </div>
                    <button class="btn btn-primary" data-dismiss="modal" @click="updateAnswer">Submit</button>

                    <!--  -->
                </div>
            </div>
        </div>
        <!-- akhir modal -->
    </div>
</template>

<script>
    import config from '@/assets/config.js'
    const {
        host
    } = config

    export default {
        name: 'AnswerThumb',
        props: ['answer', 'user'],
        data() {
            return {
                editAnswer: this.answer.text
            }
        },
        methods: {
            updateAnswer() {
                axios({
                    method: 'PUT',
                    url: `${host}/answers/${this.answer._id}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    },
                    data: {
                        text: this.editAnswer
                    }
                })
                .then((result) => {
                    console.log('berhasil bang', result);
                    this.$emit('get-thread')
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            upVote() {
                axios({
                    method: 'POST',
                    url: `${host}/answers/upvote/${this.answer._id}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    }
                })
                .then((result) => {
                    console.log(result);
                    this.$emit('get-thread')
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            downVote() {
                axios({
                    method: 'POST',
                    url: `${host}/answers/downvote/${this.answer._id}`,
                    headers: {
                        token: localStorage.getItem('tokenHO')
                    }
                })
                .then((result) => {
                    console.log(result);
                    this.$emit('get-thread')
                }).catch((err) => {
                    console.log(err);
                });
            }

        }
    }
</script>

<style>

</style>