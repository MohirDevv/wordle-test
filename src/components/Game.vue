<template>
  <div class="wrapper">
    <Header />
    <Ads />
    <About />
    <Settings />
    <GameStatistic :gameOver="this.$store.state.gameOver" />
    <div class="">
      <div class="mt-6">
        <WordRow
          v-for="(guess, i) in this.$store.state.guesses"
          :key="i"
          :value="guess"
          :solution="this.$store.state.solution"
          :submitted="
            this.$store.state.submitted &&
            i == this.$store.state.currentGuessIndex &&
            this.$store.state.lastSubmitted != guess
          "
          :temp_colors="this.$store.state.colorList[i]"
          :is_found="isFound"
        />
      </div>
      <div class="is-centered">
        <KeyBoard
          @keypress="onKeyPress"
          @onKeyPress="onKeyPress"
          :guessedLetters="this.$store.state.guessedLetters"
          :input="input"
          :key="componentKey"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from "@vueuse/integrations/useCookies";
import Header from "./WordleHeader.vue";
import WordRow from "./WordRow.vue";
import KeyBoard from "./KeyBoard.vue";
import About from "./WordleAbout.vue";
import Settings from "./WordleSettings.vue";
import GameStatistic from "./GameStatistic.vue";
import Ads from "./WordleAds.vue";
import { toast } from "bulma-toast";

export default {
  name: "Game",
  components: {
    Header,
    KeyBoard,
    WordRow,
    About,
    GameStatistic,
    Ads,
    Settings,
  },
  data() {
    return {
      isFound: false,
      input: "",
      guessedLetters: {
        miss: [],
        found: [],
        hint: [],
      },
      componentKey: 0,
    };
  },
  async beforeMount() {
    await this.getData();
    await this.getWords();
  },
  mounted() {
    window.addEventListener("keypress", (e) => {
      e.preventDefault();
      let button =
        e.keyCode == 13
          ? "{enter}"
          : e.keyCode == 8
          ? "{bksp}"
          : String.fromCharCode(e.keyCode).toLowerCase();
      this.onKeyPress(button.toLowerCase());
    });
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      let button = e.keyCode == 8 ? "{bksp}" : "";
      this.onKeyPress(button);
    });
    document.title = "Wordle";
    this.$store.state.useWebsocket.onmessage = this.onSocketMessage;
    this.$store.state.useWebsocket.onclose = this.onSocketClose;
  },
  unmounted() {
    window.removeEventListener("keypress", () => this.onKeyPress());
  },
  methods: {
    onSocketClose() {
      // console.log("Removed");
      window.removeEventListener("keypress", () => this.onKeyPress());
    },
    async onSocketMessage(evt) {
      this.$store.state.submitted = false;
      const state = this.$store.state;
      const index = state.currentGuessIndex;
      var value = state.guesses[index];
      console.log(index);
      console.log(value);
      var res = JSON.parse(evt.data);
      console.log(res);
      console.log(res.message);
      if (!value) {
        var word = "";
        for (const key in res.message) {
          if (res.message.hasOwnProperty(key) && key != "correct_word") {
            word = key;
          }
        }
        state.guesses[index] = word;
        value = word;
      }
      const checked = res.message[value];
      console.log(checked);
      console.log(state.guesses[index]);
      if (res.is_won || res.is_won == false) {
        console.log("Finished");
        console.log(this.$store.state.guesses)
        state.gameOver = true;
        setTimeout(() => {
          state.isFinished = true;
          if (res.is_won) this.isFound = true;
        }, 2500);
      } else if (res.type == "error") {
        this.$store.state.lastSubmitted = "";
        toast({
          message: res.message,
          type: "is-warning",
          dismissible: false,
          animate: { in: "shakeX" },
          pauseOnHover: false,
          duration: 2000,
          position: "top-center",
        });
      } else if (checked) {
        if (state.currentGuessIndex < 5) state.currentGuessIndex++;
        for (let i = 0; i < 5; i++) {
          console.log(res.message);
          console.log(state.colorList);
          state.colorList[index][i] = res.message[value][i];

          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        for (let i = 0; i < res.message[value].length; i++) {
          // miss
          if (
            res.message[value][i] == -1 &&
            !state.guessedLetters.miss.includes(value[i])
          ) {
            state.guessedLetters.miss.push(value[i]);
          }
          // success
          if (
            res.message[value][i] == 1 &&
            !state.guessedLetters.found.includes(value[i])
          ) {
            state.guessedLetters.found.push(value[i]);
          }
          // hint
          if (
            res.message[value][i] == 0 &&
            !state.guessedLetters.hint.includes(value[i]) &&
            !state.guessedLetters.found.includes(value[i])
          ) {
            state.guessedLetters.hint.push(value[i]);
          }
        }

        if (state.currentGuessIndex >= 6) {
          state.isFinished = true;
        }
      }
    },
    async getData() {
      const cookies = useCookies();
    },
    async getWords() {
      // const now = new Date();
      // const start = new Date(2022, 7, 23);
      // const diff = Number(now) - Number(start);
      // let state = this.$store.state;
      // // console.log(localStorage.getItem("color"));
      // let day = Math.floor(diff / (1000 * 60 * 60 * 24));
      // // console.log(day);
      // if (state.today < day) {
      //   let formData = {
      //     today: day,
      //     current_guess_index: 0,
      //     color_list: JSON.stringify([
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //     ]),
      //     guessed_letters: JSON.stringify({
      //       miss: [],
      //       found: [],
      //       hint: [],
      //     }),
      //     guesses: JSON.stringify(["", "", "", "", "", ""]),
      //     last_submitted: "",
      //     user_tries: JSON.stringify([
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //       ["", "", "", "", ""],
      //     ]),
      //     is_finished: false,
      //   };

      //   var telegram_id = this.$route.params.telegram_id;

      //   await axios
      //     .put(`api/v1/daily-statistics/${telegram_id}`, formData)
      //     .then((response) => {
      //       console.log(response.data);

      //       let responseData = response.data;
      //       state.today = responseData.today;

      //       // getting data
      //       state.guesses = JSON.parse(responseData.guesses);
      //       state.colorList = JSON.parse(responseData.color_list);
      //       state.currentGuessIndex = responseData.current_guess_index;
      //       state.guessedLetters = JSON.parse(responseData.guessed_letters);
      //       state.isFinished = responseData.is_finished;
      //       state.lastSubmitted = responseData.last_submitted;
      //       (state.userTries = JSON.parse(responseData.user_tries)),
      //         // force render Keyboar comp.
      //         (this.componentKey += 1);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
      // while (day > this.$store.state.words_list.length) {
      //   day -= this.$store.state.words_list.length;
      // }
      // // console.log(this.$store.state.words_list[day]);
      // // console.log(state.currentGuessIndex);
      // this.$store.state.solution = this.$store.state.words_list[day];
      // return this.$store.state.words_list[day];
    },
    onKeyPress(button) {
      const guesses = this.$store.state.guesses;
      const currentGuessIndex = this.$store.state.currentGuessIndex;
      const currentGuess = guesses[currentGuessIndex];
      if (!this.$store.state.isFinished && !this.$store.state.gameOver) {
        if (button == "{enter}") {
          if (currentGuess && currentGuess.length == 5) {
            this.$store.state.submitted = true;
          }
          // if (
          //   this.$store.state.words_list.includes(
          //     this.$store.state.guesses[currentGuessIndex]
          //   )
          // ) {
          //   this.$store.state.currentGuessIndex++;
          //   localStorage.setItem(
          //     "currentGuessIndex",
          //     parseInt(this.$store.state.currentGuessIndex)
          //   );
          //   for (var i = 0; i < currentGuess.length; i++) {
          //     let c = currentGuess.charAt(i);
          //     if (c == this.$store.state.solution.charAt(i)) {
          //       this.$store.state.guessedLetters.found.push(c);
          //     } else if (this.$store.state.solution.indexOf(c) != -1) {
          //       this.$store.state.guessedLetters.hint.push(c);
          //     } else {
          //       this.$store.state.guessedLetters.miss.push(c);
          //     }
          //   }
          //   localStorage.setItem(
          //     "guessedLetters",
          //     JSON.stringify(this.$store.state.guessedLetters)
          //   );
          // } else {
          //   toast({
          //     message: "Бундай сўз рўйхатда мавжуд эмас",
          //     type: "is-warning",
          //     dismissible: false,
          //     animate: { in: "shakeX" },
          //     pauseOnHover: false,
          //     duration: 2000,
          //     position: "top-center",
          //   });
          // }
        } else if (button == "{bksp}") {
          guesses[currentGuessIndex] = currentGuess.slice(0, -1);
        } else if (currentGuess.length < 5) {
          const alphaRegex = /[а-яА-Я,Ғ,Ҳ,Қ,Ё,Ў,ғ,ҳ,қ,ё,ў]/;
          if (alphaRegex.test(button)) {
            guesses[currentGuessIndex] += button;
          }
        }
      }
    },
  },
};
</script>
