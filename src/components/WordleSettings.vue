<template>
  <div
    class="modal p-6 animate__animated"
    :class="{ 'is-active animate__fadeIn': this.$store.state.SettingStatus }"
  >
    <div class="modal-background"></div>
    <div class="modal-card game-settings">
      <section class="modal-card-body bg-white dark:bg-[#252525] dark:border-[#3c3c3c]">
        <div class="sideHeader">
          <h1 class="dark:text-white">Созламалар</h1>

          <button
            class="delete is-pulled-right"
            @click="removeSettings"
            aria-label="close"
          ></button>
        </div>

        <div class="modes">
          <div class="darkmode">
            <p class="dark:text-white">Darkmode 🌙</p>
            <!-- <div class="switch__container">
              <input
                id="switch-shadow"
                class="switch switch--shadow darktoggle"
                type="checkbox"
                @click="toogleDark(), isDarkValid()"
                
              />
              <label for="switch-shadow"></label>
            </div> -->
            <button class="px-2" @click="toogleDark()"><p>On/Off Darkmode</p></button>
          </div>

          <div class="endlessmode">
            <p class="dark:text-white">Test yourself 🦾</p>
            <button>
              <a class="px-2" href="http://localhost:8080/mode=unlim/3322444"
                >Endless Mode 🔄</a
              >
            </button>
          </div>

          <div class="testmode">
            <p class="dark:text-white">???</p>
            <button class="px-2">???</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toogleDark = useToggle(isDark);
</script>

<script>
export default {
  name: "Settings",
  data() {
    return {};
  },
  props: {
    isActive: Boolean,
  },
  setup() {},
  mounted() {},
  methods: {
    removeSettings() {
      this.$store.state.SettingStatus = false;
    },
  },
};
</script>

<style scoped>
.sideHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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

.darkmode {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.darkmode p {
  font-weight: 600;
}

.darkmode button {
  background: #fc6600;
  border-radius: 6px;
  border: 2px #ff7417 solid;
  color: white;
  cursor: pointer;
}

.endlessmode {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.endlessmode button {
  background: #fc6600;
  border-radius: 6px;
  border: 2px #ff7417 solid;
  color: white;
  cursor: pointer;
}

.endlessmode button a {
  color: white;
}

.endlessmode p {
  font-weight: 600;
}
.testmode {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.testmode p {
  font-weight: 600;
}

.testmode button {
  background: #fc6600;
  border-radius: 6px;
  border: 2px #ff7417 solid;
  color: white;
  cursor: pointer;
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
}
.modal-background {
  opacity: 0.3 !important;
}

.modal-card-body {
  border: 2px #b5b9bb solid;
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
  width: 44px;
  height: 20px;
  border-radius: 10px;
  border: none;
  background-color: #dddddd;
}
.switch--shadow + label:before,
.switch--shadow + label:after {
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  content: "";
}
.switch--shadow + label:before {
  right: 1px;
  background-color: #f1f1f1;
  border-radius: 10px;
  border: none;
  transition: background 0.4s;
}
.switch--shadow + label:after {
  width: 20px;
  height: 18px;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.4s;
}
.switch--shadow:checked + label:before {
  background-color: #8ce196;
}
.switch--shadow:checked + label:after {
  transform: translateX(22px);
}
</style>
