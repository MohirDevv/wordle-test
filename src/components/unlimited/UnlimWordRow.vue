<template>
  <div class="column is-12">
    <div
      class="columns is-flex is-vcentered is-centered"
      :class="{ 'animate__animated animate__shakeX': isActive }"
    >
      <Letter
        v-if="value != undefined"
        v-for="i in 5"
        :key="i"
        :letter="value[i - 1]"
        :color="temp_colors[i - 1]"
      />
    </div>
  </div>
</template>

<script>
import Letter from "../Letter.vue";
import { toast } from "bulma-toast";
import axios from "axios";
export default {
  name: "UnlimWordRow",
  props: {
    value: String,
    solution: String,
    submitted: Boolean,
    temp_colors: Array,
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
    };
  },
  components: {
    Letter,
  },
  methods: {
    send_message(word) {
      var message = { type: "receive_word", word: word };
      this.$store.state.useWebsocket.send(JSON.stringify(message));
    },
  },
  watch: {
    submitted() {
      if (this.value) {
        const state = this.$store.state;
        if (state.unlimLastSubmitted != this.value) {
          state.unlimLastSubmitted = this.value;
          this.send_message(this.value);
          console.log(state.unlimLastSubmitted);
          console.log(this.value);
        }
      }
      //   async handler(submitted) {
      //     if (submitted) {
      //       localStorage.setItem(
      //         "unlimGuesses",
      //         JSON.stringify(this.$store.state.unlimGuesses)
      //       );

      //       let s = this.solution;
      //       let v = this.value;
      //       console.log(v);
      //       // adding colors for letteres
      //       let temp = ["gray", "gray", "gray", "gray", "gray"];
      //       let letterPool = [];
      //       for (let i = 0; i < 5; i++) {
      //         if (s.charAt(i) == v.charAt(i)) {
      //           temp[i] = "green";
      //         } else {
      //           letterPool.push(s.charAt(i));
      //         }
      //       }
      //       for (let i = 0; i < 5; i++) {
      //         if (temp[i] == "gray") {
      //           if (letterPool.indexOf(v.charAt(i)) != -1) {
      //             letterPool.splice(letterPool.indexOf(v.charAt(i)), 1);
      //             temp[i] = "yellow";
      //           }
      //         }
      //         this.$store.state.unlimColorList[
      //           this.$store.state.unlimCurrentGuessIndex - 1
      //         ][i] = temp[i];
      //         await new Promise((resolve) => setTimeout(resolve, 500));
      //       }
      //       localStorage.setItem(
      //         "unlimColor",
      //         JSON.stringify(this.$store.state.unlimColorList)
      //       );

      //       if (s == v) {
      //         localStorage.setItem("unlimLastSubmitted", s);
      //         localStorage.setItem("unlimFinished", true);
      //         this.$store.commit("setIsWinner", true);
      //         this.$store.state.gameOver = true;
      //         this.$store.state.unlimLastSubmitted = s;
      //         this.$store.state.unlimSequenceVictory =
      //           this.$store.state.unlimSequenceVictory + 1;

      //         let formData = {
      //           unlim_stat: this.$store.state.unlimSequenceVictory,
      //           started_at: JSON.parse(localStorage.getItem("startedAt")),
      //           finished_at: new Date(),
      //         };

      //         var telegram_id = this.$route.params.telegram_id;
      //         await axios
      //           .post(`api/v1/statistics/${telegram_id}`, formData)
      //           .then((response) => {
      //             console.log(response.data);
      //           })
      //           .catch((error) => {
      //             console.log(error);
      //           });
      //         let unlimSequenceVictory = this.$store.state.unlimSequenceVictory;
      //         localStorage.setItem(
      //           "unlimSequenceVictory",
      //           parseInt(unlimSequenceVictory)
      //         );
      //         console.log(unlimSequenceVictory);

      //         // message when found word
      //         toast({
      //           message:
      //             this.victoryMessage[
      //               this.$store.state.unlimCurrentGuessIndex - 1
      //             ],
      //           type: "is-success is-light",
      //           dismissible: false,
      //           animate: { in: "backInDown", out: "backOutDown" },
      //           pauseOnHover: false,
      //           duration: 2000,
      //           position: "top-center",
      //         });
      //       } else if (this.$store.state.unlimCurrentGuessIndex >= 6) {
      //         localStorage.removeItem("startedAt");
      //         localStorage.setItem("unlimFinished", true);
      //         this.$store.commit("setIsWinner", false);

      //         this.$store.state.gameOver = true;

      //         // solution msg if cannot find word
      //         toast({
      //           message: this.$store.state.unlimSolution,
      //           type: "is-dark is-light",
      //           dismissible: false,
      //           animate: { in: "backInDown", out: "backOutDown" },
      //           pauseOnHover: false,
      //           duration: 2000,
      //           position: "top-center",
      //         });

      //         // send result to user
      //         let tg = window.Telegram.WebApp;
      //         let text = `${this.$store.state.unlimSolution}\n`.toUpperCase();
      //         text += `Топилган сўзлар сони — ${this.$store.state.unlimSequenceVictory}`;
      //         tg.sendData(text);

      //         this.$store.state.unlimSequenceVictory = 0;
      //         localStorage.setItem("unlimSequenceVictory", parseInt(0));
      //       }
      //       this.$store.commit("unlimCheckWinner");
      //     }
      //   },
    },
  },
};
</script>
