<template>
  <div class="column is-12">
    <div
      class="columns is-flex is-vcentered is-centered"
      :class="{ 'animate__animated animate__shakeX': isActive }"
    >
      <Letter
        v-for="i in 5"
        :key="i"
        :letter="value[i - 1]"
        :color="temp_colors[i - 1]"
        :id="is_found ? `letter${i}` : ''"
      />
    </div>
  </div>
</template>

<script>
import Letter from "./Letter.vue";
import { toast } from "bulma-toast";
import axios from "axios";

export default {
  name: "WordRow",
  props: {
    value: String,
    solution: String,
    submitted: Boolean,
    temp_colors: Array,
    is_found: Boolean,
  },
  data() {
    return {
      colors: ["", "", "", "", ""],
      isActive: false,
      victoryMessage: [
        "ДАҲО",
        "АЖОЙИБ",
        "БАРАКАЛЛА",
        "ЗЎР",
        "ҚОЙИЛ",
        "УДДАЛАДИК",
      ],
      gameOver: false,
    };
  },
  components: {
    Letter,
  },
  methods: {
    async submitData() {
      let state = this.$store.state;
    },
    send_message(word) {
      var message = { type: "receive_word", word: word };
      this.$store.state.useWebsocket.send(JSON.stringify(message));
    },
  },
  watch: {
    isFound(newVal) {
      if (newVal) {
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            const el = document.getElementById(`letter${i + 1}`);
            setTimeout(() => {
              el.classList.add("bounce2");
            }, 100 * i);
          }
        }, 1);
      }
    },
    submitted() {
      console.log(this.value);
      if (this.value) {
        const state = this.$store.state;
        if (state.lastSubmitted != this.value) {
          state.lastSubmitted = this.value;
          this.send_message(this.value);
          console.log(state.lastSubmitted);
          console.log(this.value);
        }
      }
    },
  },
};
</script>

<style scoped>
.letter-border {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
