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

          <div class="wrapper flex flex-col" v-if="userStats">
            <div class="stats flex items-start justify-start flex-col py-4">
              <div
                class="info sm:w-[20rem] w-[17rem] flex items-start justify-evenly flex-col"
              >
                <div
                  class="w-[100%] played flex items-center justify-between gap-9"
                >
                  <p class="text-black text-[18px] font-medium dark:text-white">
                    Ўйналган ўйинлар
                  </p>
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.sessions_count }}
                  </h1>
                </div>
               
                <div
                  class="w-[100%] played flex items-center justify-between gap-9"
                >
                  <p class="text-black text-[18px] font-medium dark:text-white">
                    Кетма-кет ғалаба
                  </p>
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.current_session_win_games_count }}
                  </h1>
                </div>
                <div
                  class="w-[100%] played flex items-center justify-between gap-9"
                >
                  <p class="text-black text-[18px] font-medium dark:text-white">
                    Кетма-кет ғалабалар рекорди
                  </p>
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.all_games_consecutive_wins_record_count }}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div class="guessInfo" v-if="userStats">
            <h1 class="uppercase text-black font-bold dark:text-white">
              ТАХМИНЛАР ТАҚСИМОТИ
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
                  {{ userStats.wins_attempts_count[6] }}
                </p>
              </div>
            </div>
          </div>

          <!-- <div class="wrapper" v-if="userStats">
            <div class="stats flex items-start justify-center flex-col py-4">
              <div
                class="info sm:w-[20rem] w-[17rem] flex items-center justify-evenly"
              >
                <div class="played flex items-center justify-center flex-col">
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.sessions_count }}
                  </h1>
                  <p class="text-black text-[13px] dark:text-white">Played</p>
                </div>

                <div class="winrate flex items-center justify-center flex-col">
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.current_session_games_count }}
                  </h1>
                  <p class="text-black text-[13px] dark:text-white">Win</p>
                </div>
                <div class="winrate flex items-center justify-center flex-col">
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.current_session_win_games_count }}
                  </h1>
                  <p class="text-black text-[13px] dark:text-white">Streak</p>
                </div>
                <div class="winrate flex items-center justify-center flex-col">
                  <h1 class="text-[25px] text-black dark:text-white">
                    {{ userStats.all_games_consecutive_wins_record_count }}
                  </h1>
                  <p class="text-black text-[13px] dark:text-white">
                    Max Streak
                  </p>
                </div>
              </div>
            </div>

            <div class="guessInfo">
              <h1 class="uppercase text-black font-bold dark:text-white">
                ТАХМИНЛАР ТАҚСИМОТИ
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
          </div> -->
          <button
            class="button is-fullwidth border-none text-white text-[18px] bg-[#6aaa64] mt-5 dark:bg-[#538d4e] hover:text-white"
            v-if="this.$store.state.isFinished && this.$store.state.gameOver"
            @click="$emit('restartGame')"
          >
            Давом этиш
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { useCookies } from "@vueuse/integrations/useCookies";
import axios from "axios";
export default {
  name: "UnlimGameStatistic",
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
    const token = useCookies().get("token");
    await axios
      .get("/statistics/unlimited-game/", {
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
  methods: {
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
  },
};
</script>

<style scoped>
.modal-background {
  opacity: 0.3 !important;
}
</style>
