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
        :id="isFound ? `letter${i}` : ''"
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
      isFound: false,
    };
  },
  components: {
    Letter,
  },
  methods: {
    async submitData() {
      let state = this.$store.state;
      let formData = {
        current_guess_index: state.currentGuessIndex,
        color_list: JSON.stringify(state.colorList),
        guessed_letters: JSON.stringify(state.guessedLetters),
        guesses: JSON.stringify(state.guesses),
        number_of_victory: state.numberOfVictory,
        number_of_games: state.numberOfGames,
        last_submitted: state.lastSubmitted,
        sequance_victory: state.sequenceVictory,
        sequance_victory_records: state.sequenceVictoryRecord,
        victory: state.victoryPercentage,
        user_tries: JSON.stringify(state.userTries),
        true_guess: JSON.stringify(state.trueGuess),
        is_finished: state.isFinished,
      };

      var telegram_id = this.$route.params.telegram_id;
      await axios
        .put(`api/v1/daily-statistics/${telegram_id}`, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
    submitted: {
      async handler(submitted) {
        if (submitted) {
          localStorage.setItem(
            "guesses",
            JSON.stringify(this.$store.state.guesses)
          );

          let s = this.solution;
          let v = this.value;

          // adding colors for letteres
          let temp = ["gray", "gray", "gray", "gray", "gray"];
          let userTries = ["⬜️", "⬜️", "⬜️", "⬜️", "⬜️"];
          let letterPool = [];
          for (let i = 0; i < 5; i++) {
            if (s.charAt(i) == v.charAt(i)) {
              temp[i] = "green";
              userTries[i] = "🟩";
            } else {
              letterPool.push(s.charAt(i));
            }
          }
          for (let i = 0; i < 5; i++) {
            if (temp[i] == "gray") {
              if (letterPool.indexOf(v.charAt(i)) != -1) {
                letterPool.splice(letterPool.indexOf(v.charAt(i)), 1);
                temp[i] = "yellow";
                userTries[i] = "🟨";
              }
            }
            this.$store.state.colorList[
              this.$store.state.currentGuessIndex - 1
            ][i] = temp[i];
            this.$store.state.userTries[
              this.$store.state.currentGuessIndex - 1
            ][i] = userTries[i];
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          // localStorage.setItem("color", JSON.stringify(this.$store.state.colorList))
          localStorage.setItem(
            "userTries",
            JSON.stringify(this.$store.state.userTries)
          );

          if (s == v) {
            this.isFound = true;
            localStorage.setItem("lastSubmitted", s);
            this.$store.commit("setIsWinner", true);
            this.gameOver = true;
            // update and set number of victory
            // let numberOfVictory = this.$store.state.numberOfVictory
            // localStorage.setItem('numberOfVictory', parseInt(numberOfVictory)+1)
            this.$store.state.lastSubmitted = s;
            this.$store.state.numberOfVictory++;

            // update and set true guesses value
            this.$store.state.trueGuess[
              this.$store.state.currentGuessIndex - 1
            ] =
              this.$store.state.trueGuess[
                this.$store.state.currentGuessIndex - 1
              ] + 1;
            // localStorage.setItem("trueGuess", JSON.stringify(this.$store.state.trueGuess))

            // message when found word
            toast({
              message:
                this.victoryMessage[this.$store.state.currentGuessIndex - 1],
              type: "is-success is-light",
              dismissible: false,
              animate: { in: "backInDown", out: "backOutDown" },
              pauseOnHover: false,
              duration: 2000,
              position: "top-center",
            });
          } else if (this.$store.state.currentGuessIndex >= 6) {
            // solution msg if cannot find word
            this.$store.commit("setIsWinner", false);
            this.gameOver = true;
            toast({
              message: this.$store.state.solution,
              type: "is-dark is-light",
              dismissible: false,
              animate: { in: "backInDown", out: "backOutDown" },
              pauseOnHover: false,
              duration: 2000,
              position: "top-center",
            });
          }
          Promise.all([
            this.$store.commit("checkWinner"),
            this.$store.commit("checkNumberOfGames"),
          ])
            .then(() => {
              this.submitData();
            })
            .then(() => {
              if (this.gameOver) {
                this.$store.state.gameOver = true;
              } else {
                this.$store.state.gameOver = false;
              }
            })
            .catch((error) => {
              console.log("An error occured", error);
            });
        }
      },
    },
  },
};
</script>

<style scoped>
.letter-border{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
