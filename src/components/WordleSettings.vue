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
          class="fas fa-times float-right text-[16px] text-black cursor-pointer dark:text-white"
          @click="removeSettings()"
        ></i>
        <div class="sideHeader">
          <h1 class="text-black pt-2 dark:text-white">Созламалар</h1>
        </div>
        <h1 class="text-black pt-2 dark:text-white">Тун режими</h1>
        <form class="pl-[10px] pt-2 gap-5">
          <!-- <label for="01">Авто</label>
          <input id="01" type="radio" name="r" @change="toogleDark()" checked /> -->
          <label for="02" class="text-black dark:text-white">Тун режими</label>
          <input
            id="02"
            type="radio"
            name="r"
            @change="toogleDark()"
            :checked="theme === 'auto' ? true : false"
          />
          <label for="03" class="text-black dark:text-white">Кун режими</label>
          <input
            id="03"
            type="radio"
            name="r"
            @change="toogleDark()"
            :checked="theme === 'light' ? true : false"
          />
        </form>
        <h1 class="text-black pt-2 dark:text-white">Ўйин режими</h1>
        <form class="pl-[10px] pt-2 gap-5">
          <label for="04" class="text-black dark:text-white">Ҳар кунлик</label>
          <input
            id="04"
            type="radio"
            name="r"
            v-model="selectedPage"
            value="game"
            @change="redirectToPage"
            checked
          />
          <label for="05" class="text-black dark:text-white">Ютқазгунча</label>
          <input id="05" type="radio" name="r"  v-model="selectedPage" value="unlim" @change="redirectToPage"/>
          <!-- <label for="06" class="text-black dark:text-white">Блиц</label>
          <input id="06" type="radio" name="r" /> -->
        </form>
      </section>
    </div>
  </div>
</template>

<!-- Dark mode -->
<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { useStore } from "vuex";
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const isDark = useDark();
const toogleDark = useToggle(isDark);
const selectedPage = ref(null);
const route = useRoute();
const router = useRouter();

const theme = localStorage.getItem("vueuse-color-scheme");
const redirectToPage = () => {
  if (selectedPage.value) {
    console.log(selectedPage.value);
    router.push({ path: `/unlim` });
  }
};
function removeSettings() {
  store.state.SettingStatus = false;
}
</script>

<style scoped>
form {
  color: black;
  font-size: 18px;
  font-weight: 600;
  --radio-size: 30px;
  position: relative;
  display: grid;
  grid-template-columns: auto var(--radio-size);
  align-items: center;
  label {
    cursor: pointer;
  }
  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    outline: none;
    margin: 0;
    cursor: pointer;
    border-radius: 50%;
    width: 300px;
    display: grid;
    justify-self: end;
    justify-items: center;
    align-items: center;
    overflow: hidden;
    transition: border 0.5s ease;
    &::before,
    &::after {
      content: "";
      display: flex;
      justify-self: center;
      border-radius: 50%;
    }
    &::before {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    &::after {
      position: relative;
      width: calc(100% / 2);
      height: calc(100% / 2);
      top: var(--y, 100%);
      transition: top 0.5s cubic-bezier(0.48, 1.97, 0.5, 0.63);
    }
    &:checked {
      &::before {
        --opacity: 0;
      }
      ~ input[type="radio"] {
        &::after {
          --y: -100%;
        }
      }
    }
    &:not(:checked) {
      &::before {
        --opacity: 1;
        transition: opacity 0s linear 0.5s;
      }
    }
  }
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

