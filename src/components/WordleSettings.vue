<template>
  <div
    class="modal p-6 animate__animated"
    :class="{ 'is-active animate__fadeIn': this.$store.state.SettingStatus }"
  >
    <div class="modal-background"></div>
    <div class="modal-card game-settings">
      <section class="modal-card-body main">
        <div class="sideHeader">
          <h1>Созламалар</h1>

          <button
            class="delete is-pulled-right"
            @click="removeSettings"
            aria-label="close"
          ></button>
        </div>

        <div class="modes">
          <div class="darkmode">
            <p>Darkmode 🌙</p>
            <div class="switch__container">
              <input
                id="switch-shadow"
                class="switch switch--shadow darktoggle"
                type="checkbox"
                @click="checkDaBox()"
                v-model="isDark"
              />
              <label for="switch-shadow"></label>
            </div>
          </div>

          <div class="endlessmode">
            <p>Test yourself 🦾</p>
            <button>
              <a href="http://localhost:8080/mode=unlim/3322444"
                >Endless Mode 🔄</a
              >
            </button>
          </div>

          <div class="testmode">
            <p>???</p>
            <button>???</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "Settings",
  data() {
    return {
      isDark: false,
    };
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
    checkDaBox() {
      const checkbox = document.querySelector(".darktoggle");
      const modal = document.querySelector(".main");
      // const modes = document.querySelector('.modes');
      // const sideHeader = document.querySelector('.sideHeader');
      // const header = document.querySelector('.header');
      // const headerH1 = document.querySelector('.title');
      // const menu = document.querySelector('.icon-menu');
      // const cube = document.querySelector('.wrapper');
      // const keyboard = document.querySelector('.keyboard');
      // const instructions = document.querySelector('.about');
      // const extra = document.querySelector('.strong');
      // const stats = document.querySelector('.stats');
      // const rows = document.querySelector('.myTheme');

      checkbox.addEventListener("change", function () {
        if (this.checked) {
          modal.classList.add('dark')
          // modes.classList.add('dark')
          // sideHeader.classList.add('dark')
          // header.classList.add('dark')
          // headerH1.classList.add('dark')
          // menu.classList.add('darkHeader')
          // cube.classList.add('dark')
          // keyboard.classList.add('dark')
          // instructions.classList.add('dark')
          // extra.classList.add('dark')
          // stats.classList.add('dark')
          // rows.classList.add('dark')
          
          this.isDark = true
          console.log("Checkbox is checked..");
          console.log(this.isDark);
        } else {
          console.log("Checkbox is not checked..");
          modal.classList.remove('dark')
          // modes.classList.remove('dark')
          // sideHeader.classList.remove('dark')
          // header.classList.remove('dark')
          // headerH1.classList.remove('dark')
          // menu.classList.remove('darkHeader')
          // cube.classList.remove('dark')
          // keyboard.classList.remove('dark')
          // instructions.classList.remove('dark')
          // extra.classList.remove('dark')
          // stats.classList.remove('dark')
          // rows.classList.remove('dark')
          this.isDark = false
          console.log(this.isDark);
        }
      });
    },
  },
};
</script>

<style >
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

.dark{
  background: #000;
  color: white;
  background-color: #000;
}

.darkHeader{
  background-color: white;
  border: 1px #b5b9bb solid;
  border-radius: 8px;
}

.darkmode p {
  font-weight: 600;
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
