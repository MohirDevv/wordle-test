<template>
  <div
    class="modal p-6 animate__animated animate__fadeIn"
    v-bind:class="{ 'is-active': this.$store.state.isFinished }"
  >
    <div class="modal-background" @click="removeStat"></div>
    <div class="">
      <div class="modal-card info pb-5">
        <section
          class="modal-card-body rounded-md dark:bg-[#252525] dark:border-[#3c3c3c]"
        >
          <i
            class="fas fa-times float-right text-black cursor-pointer dark:text-white"
            @click="removeStat"
          ></i>

          <h1
            class="text-black text-[19px] font-medium flex items-center justify-center dark:text-white"
          >
            Статистика
          </h1>
          <div class="wrapper" v-if="userStats">
            <div class="stats flex items-start justify-center flex-col py-4">
              <div
                class="info sm:w-[20rem] w-[17rem] flex items-center justify-evenly"
              >
                <div class="played flex items-center justify-center flex-col">
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.games_count }}
                  </h1>
                  <p class="text-black text-[13px] dark:text-white">Played</p>
                </div>

                <div class="winrate flex items-center justify-center flex-col">
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.wins_percent }}%
                  </h1>
                  <p class="text-black text-[13px] dark:text-white">Win%</p>
                </div>
                <div class="winrate flex items-center justify-center flex-col">
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.consecutive_wins_count }}
                  </h1>
                  <p class="text-black text-[13px] dark:text-white">Streak</p>
                </div>
                <div class="winrate flex items-center justify-center flex-col">
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.consecutive_wins_record_count }}
                  </h1>
                  <p class="text-black text-[13px] dark:text-white">
                    Max Streak
                  </p>
                </div>
              </div>
            </div>

            <div class="guessInfo">
              <h1 class="uppercase text-black font-bold dark:text-white">
                Guess Distribution
              </h1>
              <div class="tables pt-2">
                <div class="pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    1
                  </p>
                  <p
                    class="first flex justify-end pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    {{ userStats.wins_attempts_count[1] }}
                  </p>
                </div>
                <div class="pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    2
                  </p>
                  <p
                    class="second flex justify-end pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    {{ userStats.wins_attempts_count[2] }}
                  </p>
                </div>
                <div class="pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    3
                  </p>
                  <p
                    class="third flex justify-end pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    {{ userStats.wins_attempts_count[3] }}
                  </p>
                </div>
                <div class="pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    4
                  </p>
                  <p
                    class="fourth flex justify-end pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    {{ userStats.wins_attempts_count[4] }}
                  </p>
                </div>
                <div class="pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    5
                  </p>
                  <p
                    class="fifth flex justify-end pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    {{ userStats.wins_attempts_count[5] }}
                  </p>
                </div>
                <div class="flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    6
                  </p>
                  <p
                    class="sixth pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    0
                  </p>
                </div>
              </div>
            </div>

            <div class="trademark"></div>
          </div>

          <div class="final pt-3" v-if="this.$store.state.gameOver">
            <p class="has-text-centered is-size-5 dark:text-white">
              Кун сўзи янгиланишигача:
            </p>
            <p
              id="demo"
              class="has-text-bold has-text-centered is-size-2 dark:text-white"
            ></p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from "@vueuse/integrations/useCookies";
import axios from "axios";

export default {
  name: "GameStatistic",
  data() {
    return {
      statData: {
        data: "",
        userTries: "",
        setEmoji: "",
      },
      userData: "",
      userStats: null,
    };
  },
  props: {
    gameOver: Boolean,
  },
  async beforeMount() {
    await this.getStats();
    this.distLenght();
  },
  mounted() {
    this.timer();
  },
  watch: {
    gameOver: {
      async handler(gameOver) {
        if (gameOver) {
          await this.getStats();
          setTimeout(() => {
            this.timer();
          }, 1000);
        }
      },
    },
  },
  methods: {
    async getStats() {
      const token = useCookies().get("token");
      await axios
        .get("/statistics/daily-game/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.userStats = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async sendResult() {
      // console.log(this.$store.state.victoryPercentage)
      // console.log(this.$store.state.sequenceVictory)
      // console.log(this.$store.state.sequenceVictoryRecord)
      // console.log(this.$store.state.today)
      // console.log(this.$store.state.numberOfGames)

      // let formData = {
      //     victory: this.$store.state.victoryPercentage,
      //     number_of_games: this.$store.state.numberOfGames,
      //     number_of_victory: this.$store.state.numberOfVictory,
      //     sequance_victory: this.$store.state.sequenceVictory,
      //     sequance_victory_records: this.$store.state.sequenceVictoryRecord,
      //     is_finished: true
      // }
      // await axios
      //     .put(`api/v1/daily-statistics/474796533`, formData)
      //     .then(response => {
      //         this.userData = response.data
      //         console.log(this.userData)
      //     })
      //     .catch(error => {
      //         console.log(error)
      //     })
      let tg = window.Telegram.WebApp;
      let emoji = ["🤯", "🤩", "😎", "🥳", "👍", "👏"];
      let statText = "<b>СТАТИСТИКА</b>\n\n";

      statText += `Ўйналган ўйинлар — <b>${this.$store.state.numberOfGames} </b>та\n`;
      statText += `Ғалаба — <b> ${this.$store.state.victoryPercentage} % </b>\n`;
      statText += `Кетма-кет ғалаба — <b>${this.$store.state.sequenceVictory} </b>та\n`;
      statText += `Кетма-кет ғалабалар рекорди — <b>${this.$store.state.sequenceVictoryRecord}</b> та\n\n`;
      statText += "<b>ТАХМИНЛАР ТАҚСИМОТИ</b>\n\n";
      statText += `1 🤯 × <b>${this.$store.state.trueGuess[0]}</b>\n`;
      statText += `2 🤩 × <b>${this.$store.state.trueGuess[1]}</b>\n`;
      statText += `3 😎 × <b>${this.$store.state.trueGuess[2]}</b>\n`;
      statText += `4 🥳 × <b>${this.$store.state.trueGuess[3]}</b>\n`;
      statText += `5 👍 × <b>${this.$store.state.trueGuess[4]}</b>\n`;
      statText += `6 👏 × <b>${this.$store.state.trueGuess[5]}</b>\n`;

      // let userTry = `${
      //   this.$store.state.words_list.indexOf(this.$store.state.solution) + 1
      // } `;
      userTry += this.$store.state.isWinner
        ? `${localStorage.getItem("currentGuessIndex")}/6 \n`
        : "x/6 \n";
      for (let i = 0; i < this.$store.state.currentGuessIndex; i++) {
        userTry += `\n`;
        for (let j = 0; j < 5; j++) {
          userTry += `${this.$store.state.userTries[i][j]}`;
        }
      }

      this.statData.data = statText;
      this.statData.userTries = userTry;
      this.statData.setEmoji = this.$store.state.isWinner
        ? emoji[this.$store.state.currentGuessIndex - 1]
        : "☹️";
      console.log(this.statData);
      tg.sendData(JSON.stringify(this.statData));
    },
    removeStat() {
      this.$store.state.isFinished = false;
    },
    distLenght() {
      const first = document.querySelector(".first");
      const second = document.querySelector(".second");
      const third = document.querySelector(".third");
      const fourth = document.querySelector(".fourth");
      const fifth = document.querySelector(".fifth");
      const sixth = document.querySelector(".sixth");

      if (this.userStats.wins_attempts_count[1] >= 3) {
        first.classList.add("w-[96px]");
      } else if (this.userStats.wins_attempts_count[1] >= 6) {
        first.classList.add("w-[192px]");
      } else if (this.userStats.wins_attempts_count[1] >= 10) {
        first.classList.add("w-[290px]");
      }
      if (this.userStats.wins_attempts_count[2] >= 3) {
        second.classList.add("w-[96px]");
      } else if (this.userStats.wins_attempts_count[2] >= 6) {
        second.classList.add("w-[192px]");
      } else if (this.userStats.wins_attempts_count[2] >= 10) {
        second.classList.add("w-[290px]");
      }
      if (this.userStats.wins_attempts_count[3] >= 3) {
        third.classList.add("w-[96px]");
      } else if (this.userStats.wins_attempts_count[3] >= 6) {
        third.classList.add("w-[192px]");
      } else if (this.userStats.wins_attempts_count[3] >= 10) {
        third.classList.add("w-[290px]");
      }
      if (this.userStats.wins_attempts_count[4] >= 3) {
        fourth.classList.add("w-[96px]");
      } else if (this.userStats.wins_attempts_count[4] >= 6) {
        fourth.classList.add("w-[192px]");
      } else if (this.userStats.wins_attempts_count[4] >= 10) {
        fourth.classList.add("w-[290px]");
      }
      if (this.userStats.wins_attempts_count[5] >= 3) {
        fifth.classList.add("w-[96px]");
      } else if (this.userStats.wins_attempts_count[5] >= 6) {
        fifth.classList.add("w-[192px]");
      } else if (this.userStats.wins_attempts_count[5] >= 10) {
        fifth.classList.add("w-[290px]");
      }
      if (this.userStats.wins_attempts_count[6] >= 3) {
        sixth.classList.add("w-[96px]");
      } else if (this.userStats.wins_attempts_count[6] >= 6) {
        sixth.classList.add("w-[192px]");
      } else if (this.userStats.wins_attempts_count[6] >= 10) {
        sixth.classList.add("w-[290px]");
      }
    },
    calcTimer(countDownDate) {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate.getTime() - now;

      // Time calculations for days, hours, minutes and seconds
      // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        return "Янги сўз киритилишини кутинг";
      }

      // Output the result in an element with id="demo"
      return (
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
      );
    },
    timer() {
      var tomorrow = new Date().getDate() + 1;
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var countDownDate = new Date(year, month, tomorrow, 0, 0, 0);
      const calcCountDown = this.calcTimer;
      const timerEl = document.getElementById("demo");
      if (timerEl) {
        timerEl.innerHTML = calcCountDown(countDownDate);
        // Update the count down every 1 second
        setInterval(function () {
          timerEl.innerHTML = calcCountDown(countDownDate);
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.modal-background {
  opacity: 0.3 !important;
}

.modal-card-body {
  border-radius: 6px;
}

@media only screen and (min-width: 320px) and (max-width: 380px) {
  .modal-card-body {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
