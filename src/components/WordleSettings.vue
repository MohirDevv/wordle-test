<template>
  <div
    class="modal p-6 animate__animated"
    :class="{ 'is-active animate__fadeIn': store.state.SettingStatus }"
  >
    <div class="modal-background" @click="removeSettings()"></div>
    <div class="modal-card game-settings">
      <section
        class="modal-card-body bg-white dark:bg-[#252525] dark:border-[#3c3c3c]"
      >
        <i
          class="fas fa-times float-right text-black cursor-pointer dark:text-white"
          @click="removeSettings()"
        ></i>
        <div class="sideHeader flex items-center justify-center">
          <h1
            class="text-black text-[19px] font-medium flex items-center justify-center dark:text-white"
          >
            Созламалар
          </h1>
        </div>
        <h1 class="text-black pt-2 dark:text-white">Тунги режим</h1>
        <div class="darkmodes pl-[10px] pt-2">
          <label
            class="label py-[4px] mb-0 flex items-center justify-between border-[#787c7e] border-t-[2px] dark:border-[#3a3a3c]"
          >
            <span
              class="text text-[18px] font-semibold text-black cursor-pointer dark:text-white"
              >Тун режими</span
            >
            <input
              type="radio"
              name="name1"
              class="checkbox"
              :checked="theme === 'auto' || 'dark' ? true : false"
              @click="toogleDark()"
            />
            <span class="fake"></span>
          </label>
          <label
            class="label py-[4px] flex items-center justify-between border-[#787c7e] border-t-[1px] border-b-[2px] dark:border-[#3a3a3c]"
          >
            <span
              class="text text-[18px] font-semibold text-black cursor-pointer dark:text-white"
              >Кун режими</span
            >
            <input
              type="radio"
              name="name1"
              class="checkbox"
              :checked="theme === 'light' ? true : false"
              @click="toogleDark()"
            />
            <span class="fake"></span>
          </label>
        </div>
        <h1 class="text-black pt-2 dark:text-white">Ўйин режими</h1>
        <div class="routePart pl-[10px] pt-2">
          <router-link
            to="/"
            class="py-[4px] border-[#787c7e] border-t-[2px] flex justify-between items-center dark:border-[#3a3a3c]"
            @click="isRedirected"
          >
            <span class="text-[18px] font-semibold text-black dark:text-white"
              >Ҳар кунлик</span
            >
            <div v-if="route.name == 'Game'" class="">✔️</div>
          </router-link>
          <router-link
            to="/unlim"
            class="py-[4px] border-[#787c7e] border-t-[1px] border-b-[2px] flex justify-between items-center dark:border-[#3a3a3c]"
            @click="isRedirected"
          >
            <span class="text-[18px] font-semibold text-black dark:text-white"
              >Ютқазгунча</span
            >
            <div v-if="route.name == 'Unlimited'" class="">✔️</div>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<!-- Dark mode -->
<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const isDark = useDark();
const toogleDark = useToggle(isDark);
const selectedPage = ref(null);
const route = useRoute();
const router = useRouter();

const theme = localStorage.getItem("vueuse-color-scheme");

function isRedirected() {
  store.state.SettingStatus = false;
}
function removeSettings() {
  store.state.SettingStatus = false;
}
</script>

<style scoped>
.checkbox {
  display: none;
}

.fake {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
}

.fake::before {
  content: "✔️";
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: 0.2s;
}

.checkbox:checked + .fake::before {
  opacity: 1;
}
.sideHeader h1 {
  font-weight: 700;
  font-size: 18px;
}
.modal-card {
  max-width: 500px !important;
}

@media only screen and (max-width: 500px) {
  p {
    line-height: 20px;
    font-size: 16px;
  }
  .modal-card {
    width: 350px;
    max-height: 710px;
  }
}

@media only screen and (min-width: 320px) and (max-width: 360px) {
  p {
    line-height: 20px;
    font-size: 15px;
  }
  .modal-card {
    width: 350px;
    max-height: 680px;
    padding: 0 15px 0 15px;
  }

  .modal-card-body {
    margin-left: 15px;
    margin-right: 15px;
  }
}

.modal-background {
  opacity: 0.3 !important;
}

.modal-card-body {
  border-radius: 6px;
}
</style>
