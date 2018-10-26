<template>
    <div class="row" style="border:1px solid grey" >
        <div class="col-md-1">
            <div class="text-center"> {{ thread.upVotes.length + thread.downVotes.length }} </div>
            <div class="text-center" style="font-size:13px;"> votes </div>
        </div>
        <div class="col-md-1 " style="border-left:1px solid grey">
            <div class="text-center"> {{ thread.answers.length }} </div> 
            <div class="text-center" style="font-size:13px;" > answers </div>
        </div>
        <!-- <div class="col-md-1" style="border-left:1px solid grey">{{ thread.views }}</div> -->
        <div class="col-md-9" style="border-left:1px solid grey">
            <div>
                <router-link :to="{ path: `/thread/${thread._id}`}">
                    <a class="btn"> <h5> {{ thread.title }} </h5> </a>
                </router-link>
                <p style="font-size:14px;">by. {{ thread.author.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThreadTumb',
    props: ['thread'],
    data() {
        return {
            
        }
    }
}
</script>

<style>

</style>
