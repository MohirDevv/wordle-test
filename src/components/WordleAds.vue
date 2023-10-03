<template>
  <div v-if="ads.is_active">
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="image">
          <a v-bind:href="ads.link" target="blank"
            ><img v-bind:src="'http://127.0.0.1:8000' + ads.image"
          /></a>
        </p>
      </div>
      <button
        class="modal-close is-large"
        @click="switchModal"
        aria-label="close"
      ></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Ads",
  data() {
    return {
      ads: {},
      isActive: true,
    };
  },
  mounted() {
    // this.getAds()
  },
  methods: {
    async getAds() {
      await axios
        .get("api/v1/ads/1")
        .then((response) => {
          this.ads = response.data;
          if (!this.ads.is_active) {
            this.$store.commit("checkWinner");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    switchModal() {
      if (!localStorage.getItem("newUser")) {
        localStorage.setItem("newUser", false);
        this.$store.state.aboutStatus = true;
        this.$store.state.SettingStatus = true;
      } else {
        this.$store.state.aboutStatus = false;
        this.$store.state.SettingStatus = false;
      }
      this.isActive = false;
      this.$store.commit("checkWinner");
    },
  },
};
</script>
