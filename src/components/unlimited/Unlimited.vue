<template>
  <div class="wrapper">
    <Header />
    <Settings />
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
          :submitted="i < this.$store.state.unlimCurrentGuessIndex"
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
import Settings from "../WordleSettings.vue";
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
    Settings,
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
  },
  methods: {
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
          if (
            this.$store.state.words_list.includes(
              this.$store.state.unlimGuesses[currentGuessIndex]
            )
          ) {
            this.$store.state.unlimCurrentGuessIndex++;
            localStorage.setItem(
              "unlimCurrentGuessIndex",
              parseInt(this.$store.state.unlimCurrentGuessIndex)
            );
            for (var i = 0; i < currentGuess.length; i++) {
              let c = currentGuess.charAt(i);
              if (c == this.$store.state.unlimSolution.charAt(i)) {
                this.$store.state.unlimGuessedLetters.found.push(c);
              } else if (this.$store.state.unlimSolution.indexOf(c) != -1) {
                this.$store.state.unlimGuessedLetters.hint.push(c);
              } else {
                this.$store.state.unlimGuessedLetters.miss.push(c);
              }
            }
            localStorage.setItem(
              "unlimGuessedLetters",
              JSON.stringify(this.$store.state.unlimGuessedLetters)
            );
          } else {
            toast({
              message: "Бундай сўз рўйхатда мавжуд эмас",
              type: "is-warning",
              dismissible: false,
              animate: { in: "shakeX" },
              pauseOnHover: false,
              duration: 2000,
              position: "top-center",
            });
          }
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
