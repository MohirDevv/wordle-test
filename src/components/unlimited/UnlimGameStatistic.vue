<template>
  <div
    class="modal p-6 animate__animated animate__fadeIn"
    v-bind:class="{ 'is-active': this.$store.state.isFinished }"
  >
    <div class="modal-background" @click="removeStat"></div>
    <div class="">
      <div class="modal-card info pb-5">
        <section class="modal-card-body">
          <div class="wrapper" v-if="userStats">
            <div class="stats flex items-start justify-center flex-col py-4">
              <h1
                class="pb-3 text-black font-bold text-sm uppercase tracking-[.1em] dark:text-white"
              >
                Статистика
              </h1>
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
                <div class="first pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    1
                  </p>
                  <p
                    class="w-[290px] flex justify-end pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    3
                  </p>
                </div>
                <div class="secon pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    2
                  </p>
                  <p
                    class="w-[96px] flex justify-end pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    1
                  </p>
                </div>
                <div class="third pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    3
                  </p>
                  <p
                    class="w-[192px] flex justify-end pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    2
                  </p>
                </div>
                <div class="fourth pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    4
                  </p>
                  <p
                    class="pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    0
                  </p>
                </div>
                <div class="fifth pb-2 flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    5
                  </p>
                  <p
                    class="pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    0
                  </p>
                </div>
                <div class="sixth flex items-center justify-start gap-1">
                  <p
                    class="text-black font-bold text-[12px] leading-5 tracking-widest dark:text-white"
                  >
                    6
                  </p>
                  <p
                    class="pl-2 pr-1 bg-[#787c7e] font-bold text-[12px] text-white leading-[18px] dark:bg-[#3a3a3c]"
                  >
                    0
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            class="button is-fullwidth is-primary mt-5"
            v-if="this.$store.state.isFinished && this.$store.state.gameOver"
            @click="restartGame"
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
    restartGame() {
      this.$store.commit("unlimInitializeValue");
      this.$store.state.isFinished = false;
    },
  },
};
</script>

<style scoped>
.modal-background {
  opacity: 0.3 !important;
}
</style>
