<template>
  <div class="simple-keyboard"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  data: () => ({
    keyboard: null,
  }),
  name: "KeyBoard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
    guessedLetters: {
      type: Object,
    },
    input: {
      type: String,
    },
  },

  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      theme: "hg-theme-default hg-layout-default myTheme",
      layout: {
        default: [
          "Ё Й Ц У К Е Н Г Ш Ў З Х Ъ",
          "Ф Қ В А П Р О Л Д Ж Э",
          "Я Ч С М И Т Ь Б Ю Ғ Ҳ {bksp}",
          "{enter}",
        ],
      },
      display: {
        "{bksp}": "⌫",
        // "{enter}": "Enter",
        "{enter}": "Текшириш",
      },
      buttonTheme: [
        {
          class: "key-bg",
          buttons:
            "Ё Й Ц У К Е Н Г Ш Ў З Х Ъ Ф Қ В А П Р О Л Д Ж Э Я Ч С М И Т Ь Б Ю Ғ Ҳ {bksp} {enter}",
        },
        {
          class: "is-success",
          buttons: "{enter}",
        },
        {
          class: "df-dark",
          buttons:
            this.$store.state.guessedLetters.miss.length > 0
              ? this.$store.state.guessedLetters.miss
                  .map((name) => name.toUpperCase())
                  .join(" ")
              : "q",
        },
        {
          class: "df-success",
          buttons:
            this.$store.state.guessedLetters.miss.length > 0
              ? this.$store.state.guessedLetters.found
                  .map((name) => name.toUpperCase())
                  .join(" ")
              : "q",
        },
        {
          class: "df-warning",
          buttons:
            this.$store.state.guessedLetters.miss.length > 0
              ? this.$store.state.guessedLetters.hint
                  .map((name) => name.toUpperCase())
                  .join(" ")
              : "q",
        },
      ],
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
    });
  },
  watch: {
    guessedLetters: {
      handler(guessedLetters) {
        this.keyboard.addButtonTheme(
          guessedLetters.miss.map((name) => name.toUpperCase()).join(" "),
          "is-dark animate__animated animate__fadeIn"
        );
        this.keyboard.addButtonTheme(
          guessedLetters.found.map((name) => name.toUpperCase()).join(" "),
          "is-success animate__animated animate__fadeIn"
        );
        this.keyboard.addButtonTheme(
          guessedLetters.hint.map((name) => name.toUpperCase()).join(" "),
          "is-warning animate__animated animate__fadeIn"
        );
      },
      deep: true,
    },
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button.toLowerCase());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.simple-keyboard.hg-theme-default.myTheme {
  background: none;
  margin-top: 31px;
  max-width: 550px;
}

.hg-theme-default .hg-button{
  border-bottom: none;
}
.simple-keyboard.hg-layout-default .hg-button.key-bg {
  color: black;
  font-weight: bold;
  background: #d3d6da;
}
.dark .simple-keyboard.hg-layout-default .hg-button.key-bg {
  font-weight: bold;
  background: #818384;
}

.simple-keyboard.hg-layout-default .hg-button.is-warning {
  background: #c9b458 !important;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.is-dark {
  background: #787c7e ;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.is-success {
  background: #6aaa64 !important;
  color: white;
}

.simple-keyboard.hg-layout-default .hg-button.df-warning {
  background: #c9b458;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.df-dark {
  background: #787c7e;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.df-success {
  background: #6aaa64 !important;
  color: white;
}

@media only screen and (max-width: 350px) {
  .simple-keyboard.hg-theme-default.myTheme {
    margin-top: 30px;
  }
  .hg-theme-default .hg-row:nth-child(2) {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 9px;
  margin-bottom: 9px;
}
}
@media only screen and (min-width: 320px) and (max-width: 359px) {
  .letter-border {
    width: 29.59px;
    height: 29.59px;
    /* box-sizing: border-box; */
    line-height: 23px;
    font-size: 20px;
    /* text-align: center; */
  }
  .hg-theme-default .hg-row:nth-child(2) {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 9px;
  margin-bottom: 9px;
}
}
@media only screen and (min-width: 400px) and (max-width: 430px) {
  .simple-keyboard.hg-theme-default.myTheme {
    margin-top: 80px;
  }
  .hg-theme-default .hg-row:nth-child(2) {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 9px;
  margin-bottom: 9px;
}
}
</style>

<style>
/* .is-success.hg-button,
.is-dark.hg-button,
.is-warning.hg-button {
  color: white !important;
} */

.hg-theme-default .hg-row:nth-child(2) {
  padding-left: 25px;
  padding-right: 25px;
  margin-top: 9px;
  margin-bottom: 9px;
}

.dark .simple-keyboard.hg-layout-default .hg-button.df-dark{
  background: #3a3a3c !important;
}

.hg-theme-default .hg-button.hg-standardBtn{
  height: 42px;
}
.hg-button.hg-functionBtn.hg-button-bksp.key-bg{
  height: 42px ;
}
/* .hg-button.hg-functionBtn.hg-button-enter.key-bg{
  color: white !important;
} */
</style>
