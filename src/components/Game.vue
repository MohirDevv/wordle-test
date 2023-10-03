<template>
  <div class="wrapper">
    <Ads
    />
    <About
    />
    <Settings 
    
    />
    <GameStatistic
     :gameOver="this.$store.state.gameOver"
    />
    <div class="">
      <div class="mt-6">
        <WordRow
          v-for="(guess, i) in this.$store.state.guesses"
          :key="i"
          :value="guess"
          :solution="this.$store.state.solution"
          :submitted="this.$store.state.submitted && i < this.$store.state.currentGuessIndex"
          :temp_colors="this.$store.state.colorList[i]"
        />
      </div>
      <div class="is-centered">
         <KeyBoard
          @keypress="onKeyPress"
          @onKeyPress="onKeyPress"
          :guessedLetters="this.$store.state.guessedLetters"
          :input="input"
          :key="componentKey"/>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import WordRow from './WordRow.vue';
import KeyBoard from './KeyBoard.vue';
import About from './WordleAbout.vue'
import Settings from './WordleSettings.vue';
import GameStatistic from './GameStatistic.vue'
import Ads from './WordleAds.vue';
import { toast } from 'bulma-toast'

export default {
  name: 'Game',
  components: {
    KeyBoard,
    WordRow,
    About,
    GameStatistic,
    Ads,
    Settings
  },
  data() {
    return {
      input: "",
      guessedLetters: {
        miss: [],
        found: [],
        hint: []
      },
      componentKey: 0,
    }
  },
  async beforeMount() {
    await this.getData()
    await this.getWords()
  },
  mounted() {
    window.addEventListener("keypress", (e) =>{
      e.preventDefault();
      let button =
        e.keyCode == 13
         ? "{enter}"
         : e.keyCode == 8
         ? "{bksp}"
         : String.fromCharCode(e.keyCode).toLowerCase();
         this.onKeyPress(button.toLowerCase())
    })
    window.addEventListener("keyup", (e) =>{
      e.preventDefault();
      let button =
         e.keyCode == 8
         ? "{bksp}"
         : ""
        this.onKeyPress(button)
    })
    document.title = "Wordle"
  },
  methods: {

    async getData() {
      let formData = {
        today: parseInt(localStorage.getItem("today")) ? parseInt(localStorage.getItem("today")) : 0,
        victory: parseInt(localStorage.getItem("victoryPercentage"))
          ? parseInt(localStorage.getItem("victoryPercentage"))
          : 0,
        number_of_games: parseInt(localStorage.getItem("NumberOfGames"))
          ? parseInt(localStorage.getItem("NumberOfGames"))
          : 0,
        number_of_victory: parseInt(localStorage.getItem("numberOfVictory"))
          ? parseInt(localStorage.getItem("numberOfVictory"))
          : 0,
        sequance_victory: parseInt(localStorage.getItem("numberOfsequenceVictory"))
          ? parseInt(localStorage.getItem("numberOfsequenceVictory"))
          : 0,
        sequance_victory_records: parseInt(localStorage.getItem("numberOfsequenceVictoryRecord"))
          ? parseInt(localStorage.getItem("numberOfsequenceVictoryRecord"))
          : 0,
        current_guess_index: parseInt(localStorage.getItem("currentGuessIndex"))
          ? parseInt(localStorage.getItem("currentGuessIndex"))
          : 0,
        color_list: localStorage.getItem("color")
          ? localStorage.getItem("color")
          : JSON.stringify([
              ["", "", "", "", ""],
              ["", "", "", "", ""],
              ["", "", "", "", ""],
              ["", "", "", "", ""],
              ["", "", "", "", ""],
              ["", "", "", "", ""],
            ]),
        guessed_letters: localStorage.getItem("guessedLetters")
          ? localStorage.getItem("guessedLetters")
          : JSON.stringify({
              miss: [],
              found: [],
              hint: [],
            }),
        guesses: localStorage.getItem("guesses")
          ? localStorage.getItem("guesses")
          : JSON.stringify(["", "", "", "", "", ""]),
        last_submitted: localStorage.getItem("lastSubmitted")
          ? localStorage.getItem("lastSubmitted")
          : "",
        true_guess: localStorage.getItem("trueGuess")
          ? localStorage.getItem("trueGuess")
          : JSON.stringify(this.$store.state.trueGuess),
        user_tries: localStorage.getItem("userTries")
          ? localStorage.getItem("userTries")
          : JSON.stringify(this.$store.state.userTries),
        is_finished: this.$store.state.isFinished
          ? this.$store.state.isFinished
          : false,
      };

      var telegram_id = this.$route.params.telegram_id

      await axios
        .post(`api/v1/daily-statistics/${telegram_id}`, formData)
        .then((response) => {
          console.log(response.data)
          let state = this.$store.state;
          let responseData = response.data;
          state.today = responseData.today;

          // getting data
          state.guesses = JSON.parse(responseData.guesses)
          state.colorList = JSON.parse(responseData.color_list);
          console.log(state.colorList)
          state.currentGuessIndex = responseData.current_guess_index;
          state.guessedLetters = JSON.parse(responseData.guessed_letters);
          state.isFinished = responseData.is_finished;
          state.isWinner = responseData.is_winner;
          state.lastSubmitted = responseData.last_submitted;
          state.numberOfGames = responseData.number_of_games;
          state.numberOfVictory = responseData.number_of_victory;
          state.sequenceVictory = responseData.sequance_victory;
          state.sequenceVictoryRecord = responseData.sequance_victory_records;
          state.userTries = JSON.parse(responseData.user_tries);
          state.trueGuess = JSON.parse(responseData.true_guess);
        })
        .catch((error) => {
          console.log(error);
        });
    },  
    async getWords() {
      const now = new Date()
      const start = new Date(2022, 7, 23)
      const diff = Number(now) - Number(start)
      let state = this.$store.state;
      console.log(localStorage.getItem('color'))
      let day = Math.floor(diff / (1000 * 60 * 60 * 24))
      console.log(day)
      if (state.today  < day) {
        let formData = {
          today: day,
          current_guess_index: 0,
          color_list: JSON.stringify([
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                      ]),
          guessed_letters: JSON.stringify({
                              miss: [],
                              found: [],
                              hint: [],
                            }),
          guesses: JSON.stringify(["", "", "", "", "", ""]),
          last_submitted: "",
          user_tries: JSON.stringify([
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["", "", "", "", ""],
                      ]),
          is_finished: false,
        };

        var telegram_id = this.$route.params.telegram_id

        await axios
          .put(`api/v1/daily-statistics/${telegram_id}`, formData)
          .then((response) => {
            console.log(response.data)
            
            let responseData = response.data;
            state.today = responseData.today;

            // getting data
            state.guesses = JSON.parse(responseData.guesses)
            state.colorList = JSON.parse(responseData.color_list);
            state.currentGuessIndex = responseData.current_guess_index;
            state.guessedLetters = JSON.parse(responseData.guessed_letters);
            state.isFinished = responseData.is_finished;
            state.lastSubmitted = responseData.last_submitted;
            state.userTries = JSON.parse(responseData.user_tries),

            // force render Keyboar comp.
            this.componentKey+=1
          })
          .catch((error) => {
            console.log(error);
          });
      }
      while (day > this.$store.state.words_list.length) {
        day -= this.$store.state.words_list.length
      }
      console.log(this.$store.state.words_list[day])
      console.log(state.currentGuessIndex)
      this.$store.state.solution = this.$store.state.words_list[day]
      return this.$store.state.words_list[day]
    },
    onKeyPress(button) {
      const guesses = this.$store.state.guesses
      const currentGuessIndex = this.$store.state.currentGuessIndex
      const currentGuess = guesses[currentGuessIndex]
      if (currentGuessIndex >= 6 || this.$store.state.lastSubmitted==this.$store.state.solution) {
        return;
      }
      if (button == "{enter}") {
        this.$store.state.submitted = true
        if (currentGuess.length == 5) {
          if (this.$store.state.words_list.includes(this.$store.state.guesses[currentGuessIndex])) {
            this.$store.state.currentGuessIndex++;
            localStorage.setItem('currentGuessIndex', parseInt(this.$store.state.currentGuessIndex))
            for (var i = 0; i < currentGuess.length; i ++) {
              let c = currentGuess.charAt(i);
              if (c == this.$store.state.solution.charAt(i)) {
                this.$store.state.guessedLetters.found.push(c)
              } else if (this.$store.state.solution.indexOf(c) != -1) {
                this.$store.state.guessedLetters.hint.push(c);
              } else {
                this.$store.state.guessedLetters.miss.push(c);
              }
            }
            localStorage.setItem('guessedLetters', JSON.stringify(this.$store.state.guessedLetters))
          } else {
            toast({
                message: "Бундай сўз рўйхатда мавжуд эмас",
                type: 'is-warning',
                dismissible: false,
                animate: { in: 'shakeX'},
                pauseOnHover: false,
                duration: 2000,
                position: 'top-center',
            })
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
  }
}
</script>

<style>
</style>