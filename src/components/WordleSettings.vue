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

        <div class="modes">
          <div
            class="darkmode w-full flex items-center justify-between border-[#d3d6da] border-b-2 pb-3 dark:border-[#3a3a3c]"
          >
            <p class="dark:text-white">Тунги режим</p>
            <div class="switch__container mr-4">
              <input
                :checked="theme === 'auto' ? true : false"
                id="switch-shadow"
                class="switch switch--shadow darktoggle"
                type="checkbox"
                @click="toogleDark()"
              />
              <label for="switch-shadow"></label>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<!-- Dark mode -->
<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { useStore } from 'vuex'
const store = useStore()
const isDark = useDark();
const toogleDark = useToggle(isDark);

const theme = localStorage.getItem("vueuse-color-scheme");
function removeSettings() {
  store.state.SettingStatus = false;
}
</script>

<style scoped>
.sideHeader h1 {
  font-weight: 700;
  font-size: 18px;
}

.modes {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
}

.darkmode p {
  font-weight: 600;
}

.endlessmode button {
  background: #538d4e;
  border-radius: 6px;
  border: 2px #538d4e solid;
  color: white;
  cursor: pointer;
}

.endlessmode button a {
  color: white;
}

.endlessmode p {
  font-weight: 600;
}

.testmode p {
  font-weight: 600;
}

.testmode button {
  background: #538d4e;
  border-radius: 6px;
  border: 2px #538d4e solid;
  color: white;
  cursor: pointer;
}
.testmode button a:hover {
  color: white;
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

.switch__container {
  width: 30px;
}

.switch {
  visibility: hidden;
  position: absolute;
  margin-left: -9999px;
}

.switch + label {
  display: block;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
}

.switch--shadow + label {
  padding: 2px;
  width: 40px;
  height: 22px;
  border-radius: 10px;
  border: none;
}

.switch--shadow + label:before,
.switch--shadow + label:after {
  display: block;
  position: absolute;
  top: 3px;
  left: 2px;
  bottom: 1px;
  content: "";
  transition: 0.4s;
}

.switch--shadow + label:before {
  right: 1px;
  background-color: #878a8c;
  border-radius: 10px;
  border: none;
  transition: 0.4s;
}

.switch--shadow + label:after {
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.8s;
}

.switch--shadow:checked + label:before {
  background-color: #538d4e;
}

.switch--shadow:checked + label:after {
  transform: translateX(18px);
}
</style>
