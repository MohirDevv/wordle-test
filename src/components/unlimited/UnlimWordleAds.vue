<template>
    <div v-if="ads.is_active">
        <div class="modal" :class="{'is-active': isActive}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <p class="image">
                    <a v-bind:href=ads.link target="blank"><img v-bind:src="'https://cp.wordlebot.uz'+ads.image"></a>
                </p>
            </div>
            <button class="modal-close is-large" @click="switchModal"  aria-label="close"></button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'UnlimAds',
        data() {
            return {
                ads: {},
                isActive: true,
            }
        },
        mounted() {
            this.getAds()
        },
        methods: {
            async getAds() {
                await axios
                    .get('api/v1/ads/1')
                    .then(response => {
                        this.ads = response.data
                        if(!this.ads.is_active) {
                            this.$store.commit('unlimCheckWinner')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            switchModal() {
                if (!localStorage.getItem('newUser')) {
                    localStorage.setItem('newUser', false)
                    this.$store.state.aboutStatus = true
                } else {
                    this.$store.state.aboutStatus = false
                }
                this.isActive = false
                this.$store.commit('unlimCheckWinner')
            }
        }

    }
</script>