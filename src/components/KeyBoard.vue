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
        // "{bksp}": "⌫",
        "{bksp}": " ",
        "{enter}": "Текшириш",
      },
      buttonTheme: [
        {
          class: "key-bg",
          buttons:
            "Ё Й Ц У К Е Н Г Ш Ў З Х Ъ Ф Қ В А П Р О Л Д Ж Э Я Ч С М И Т Ь Б Ю Ғ Ҳ {bksp} {enter}",
        },
        {
          class: "bksp",
          buttons: "{bksp}",
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
<style>
.bksp {
  background: url('data:image/svg+xml,<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="game-icon" data-testid="icon-backspace"><path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>')
      no-repeat center,
    #d3d6da !important;
  min-width: 44px;
}

.dark .bksp {
  background: url('data:image/svg+xml,<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="game-icon" data-testid="icon-backspace"><path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>')
      no-repeat center,
    #818384 !important;
}

.simple-keyboard.hg-theme-default.myTheme {
  background: none;
  margin-top: 31px;
  max-width: 550px;
}

.hg-theme-default .hg-button {
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
  background: #787c7e;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.is-success {
  background: #6aaa64 !important;
  color: white;
}
.dark .simple-keyboard.hg-layout-default .hg-button.is-success {
  background: #538d4e !important;
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
.dark .simple-keyboard.hg-layout-default .hg-button.df-success {
  background: #538d4e !important;
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
  /* .letter-border {
    width: 27.59px;
    height: 27.59px;
    box-sizing: border-box;
    line-height: 23px;
    font-size: 20px;
    text-align: center;
  } */
  .simple-keyboard.hg-theme-default.myTheme {
    margin-top: 40px;
  }
  .hg-theme-default .hg-row:nth-child(2) {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 9px;
    margin-bottom: 9px;
  }
}
@media only screen and (min-width: 400px) and (max-width: 430px) {
  /* .simple-keyboard.hg-theme-default.myTheme {
    margin-top: 30px;
  } */
  .hg-theme-default .hg-row:nth-child(2) {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 9px;
    margin-bottom: 9px;
  }
}
</style>

<style>
.hg-theme-default .hg-row:nth-child(2) {
  padding-left: 25px;
  padding-right: 25px;
  margin-top: 9px;
  margin-bottom: 9px;
}

.dark .simple-keyboard.hg-layout-default .hg-button.df-dark {
  background: #3a3a3c !important;
}

.hg-theme-default .hg-button.hg-standardBtn {
  height: 42px;
}
.hg-button.hg-functionBtn.hg-button-bksp.key-bg {
  height: 42px;
}
</style>
