<template>
    <div v-if="this.$store.state.isWinner" class="modal p-6 animate__animated animate__fadeIn" v-bind:class="{'is-active': this.$store.state.isFinished}">
        <div class="modal-background"></div>
        <div class="">
            <div class="modal-card info pb-5">
            <section class="modal-card-body">
            <!-- <button class="delete is-pulled-right" @click="removeStat" aria-label="close"></button> -->
            <p class="is-size-5 has-text-centered"></p>
            <p class="has-text-bold has-text-centered  is-size-4">Топилган сўзлар сони — {{this.$store.state.unlimSequenceVictory}}</p>
            <br>
            <button class="button is-fullwidth is-primary" @click="restartGame">Давом этиш</button>
            </section>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
    name: "UnlimGameStatistic",
    data() {
       return {
    
       }
    },
    props: {
        gameOver: Boolean
    },
    methods: {
        removeStat() {
          this.$store.state.isFinished = false
        },
        restartGame() {
            this.$emit('get-words')
            this.$emit('change-key')
            this.$store.commit("unlimInitializeValue")
            this.$store.state.isFinished = false
        }

    },

}
</script>


<style scoped>
    .modal-background {
        opacity: 0.3 !important;

    }
</style>