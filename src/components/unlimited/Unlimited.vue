<template>
  <div class="wrapper">
    <Header />
    <UnlimSettings />
    <UnlimGameStatistic
      :gameOver="this.$store.state.gameOver"
      @get-words="getWords"
      @change-key="changeKey"
    />
    <About />
    <div class="">
      <div class="mt-6">
        <UnlimWordRow
          v-for="(guess, i) in this.$store.state.unlimGuesses"
          :key="i"
          :value="guess"
          :solution="this.$store.state.unlimSolution"
          :submitted="
            this.$store.state.submitted &&
            i == this.$store.state.unlimCurrentGuessIndex &&
            this.$store.state.unlimLastSubmitted != guess
          "
          :temp_colors="this.$store.state.unlimColorList[i]"
        />
      </div>
      <div class="is-centered">
        <KeyBoard
          @keypress="onKeyPress"
          @onKeyPress="onKeyPress"
          :guessedLetters="this.$store.state.unlimGuessedLetters"
          :key="componentKey"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../WordleHeader.vue";
import UnlimWordRow from "./UnlimWordRow.vue";
import KeyBoard from "./UnlimKeyBoard.vue";
import UnlimSettings from "./UnlimitedSettings.vue";
import About from "../WordleAbout.vue";
import UnlimGameStatistic from "./UnlimGameStatistic.vue";
import { toast } from "bulma-toast";

export default {
  name: "Unlimited",
  components: {
    Header,
    KeyBoard,
    UnlimWordRow,
    About,
    UnlimGameStatistic,
    UnlimSettings,
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  beforeMount() {
    this.getWords();
  },
  mounted() {
    if (!localStorage.getItem("startedAt")) {
      var date = new Date();
      localStorage.setItem("startedAt", JSON.stringify(date));
    }

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
  },
  methods: {
    async onSocketMessage(evt) {
      this.$store.state.submitted = false;
      const state = this.$store.state;
      const index = state.unlimCurrentGuessIndex;
      var value = state.unlimGuesses[index];
      console.log(index);
      console.log(value);
      var res = JSON.parse(evt.data);
      console.log(res);
      console.log(res.message);
      if (!value) {
        var word;
        for (const key in res.message) {
          if (res.message.hasOwnProperty(key)) {
            word = key;
          }
        }
        state.unlimGuesses[index] = word;
        value = word;
      }
      const checked = res.message[value];
      console.log(checked);
      console.log(state.unlimGuesses[index]);
      if (checked) {
        this.$store.state.unlimCurrentGuessIndex++;
        for (let i = 0; i < 5; i++) {
          state.unlimColorList[index][i] = res.message[value][i];

          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        for (let i = 0; i < res.message[value].length; i++) {
          // miss
          if (
            res.message[value][i] == -1 &&
            !state.unlimGuessedLetters.miss.includes(value[i])
          ) {
            state.unlimGuessedLetters.miss.push(value[i]);
          }
          // success
          if (
            res.message[value][i] == 1 &&
            !state.unlimGuessedLetters.found.includes(value[i])
          ) {
            state.unlimGuessedLetters.found.push(value[i]);
          }
          // hint
          if (
            res.message[value][i] == 0 &&
            !state.unlimGuessedLetters.hint.includes(value[i]) &&
            !state.unlimGuessedLetters.found.includes(value[i])
          ) {
            state.unlimGuessedLetters.hint.push(value[i]);
          }
        }
      } else if (res.type == "error") {
        this.$store.state.unlimLastSubmitted = "";
        toast({
          message: res.message,
          type: "is-warning",
          dismissible: false,
          animate: { in: "shakeX" },
          pauseOnHover: false,
          duration: 2000,
          position: "top-center",
        });
      }
    },
    getWords() {
      if (
        localStorage.getItem("unlimIsNewUser") == "true" ||
        localStorage.getItem("unlimFinished") == "true"
      ) {
        (this.$store.state.unlimGuesses = ["", "", "", "", "", ""]),
          (this.$store.state.unlimColorList = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ]),
          (this.$store.state.unlimGuessedLetters = {
            miss: [],
            found: [],
            hint: [],
          }),
          (this.$store.state.unlimCurrentGuessIndex = 0);

        localStorage.setItem(
          "unlimCurrentGuessIndex",
          this.$store.state.unlimCurrentGuessIndex
        );
        localStorage.setItem(
          "unlimGuesses",
          JSON.stringify(this.$store.state.unlimGuesses)
        );
        localStorage.setItem(
          "unlimColor",
          JSON.stringify(this.$store.state.unlimColorList)
        );
        localStorage.setItem(
          "unlimGuessedLetters",
          JSON.stringify(this.$store.state.unlimGuessedLetters)
        );
        localStorage.setItem("unlimFinished", false);
        localStorage.getItem("unlimIsNewUser", false);

        var num = Math.floor(Math.random() * 2001);
        this.$store.state.unlimSolution = this.$store.state.words_list[num];
        console.log(this.$store.state.unlimSolution);
        localStorage.setItem("unlimSolution", this.$store.state.unlimSolution);
        console.log(this.$store.state.words_list[num]);
        return this.$store.state.words_list[num];
      }
    },
    changeKey() {
      this.componentKey += 1;
    },
    onKeyPress(button) {
      const guesses = this.$store.state.unlimGuesses;
      const currentGuessIndex = this.$store.state.unlimCurrentGuessIndex;
      const currentGuess = guesses[currentGuessIndex];
      if (
        currentGuessIndex >= 6 ||
        localStorage.getItem("unlimLastSubmitted") ==
          this.$store.state.unlimSolution ||
        localStorage.getItem("unlimCurrentGuessIndex") >= 6
      ) {
        return;
      }
      if (button == "{enter}") {
        if (currentGuess.length == 5) {
          this.$store.state.submitted = true;
          // if (
          //   this.$store.state.words_list.includes(
          //     this.$store.state.unlimGuesses[currentGuessIndex]
          //   )
          // ) {
          //   this.$store.state.unlimCurrentGuessIndex++;
          //   localStorage.setItem(
          //     "unlimCurrentGuessIndex",
          //     parseInt(this.$store.state.unlimCurrentGuessIndex)
          //   );
          //   for (var i = 0; i < currentGuess.length; i++) {
          //     let c = currentGuess.charAt(i);
          //     if (c == this.$store.state.unlimSolution.charAt(i)) {
          //       this.$store.state.unlimGuessedLetters.found.push(c);
          //     } else if (this.$store.state.unlimSolution.indexOf(c) != -1) {
          //       this.$store.state.unlimGuessedLetters.hint.push(c);
          //     } else {
          //       this.$store.state.unlimGuessedLetters.miss.push(c);
          //     }
          //   }
          //   localStorage.setItem(
          //     "unlimGuessedLetters",
          //     JSON.stringify(this.$store.state.unlimGuessedLetters)
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
        }
      } else if (button == "{bksp}") {
        guesses[currentGuessIndex] = currentGuess.slice(0, -1);
      } else if (currentGuess.length < 5) {
        const alphaRegex = /[а-яА-Я,Ғ,Ҳ,Қ,Ё,Ў,ғ,ҳ,қ,ё,ў]/;
        if (alphaRegex.test(button)) {
          guesses[currentGuessIndex] += button;
        }
      }
    },
  },
};
</script>

<style></style>
