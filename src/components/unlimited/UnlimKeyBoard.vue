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
          buttons: this.guessedLetters.miss.join(" ").toUpperCase(),
        },
        {
          class: "df-success",
          buttons:
            this.$store.state.unlimGuessedLetters.miss.length > 0
              ? this.$store.state.unlimGuessedLetters.found
                  .map((name) => name.toUpperCase())
                  .join(" ")
              : "q",
        },
        {
          class: "df-warning",
          buttons:
            this.$store.state.unlimGuessedLetters.miss.length > 0
              ? this.$store.state.unlimGuessedLetters.hint
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
        console.log(guessedLetters);
        if (guessedLetters) {
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

          if (
            !guessedLetters.miss.length &&
            !guessedLetters.found.length &&
            !guessedLetters.hint.length
          ) {
            this.keyboard.dispatch((instance) => {
              instance.setOptions({
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
                    buttons: "",
                  },
                  {
                    class: "df-success",
                    buttons: "",
                  },
                  {
                    class: "df-warning",
                    buttons: "",
                  },
                ],
              });
            });
          }
        }
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
  background: #d3d6da;
  font-weight: bold;
}
.dark .simple-keyboard.hg-layout-default .hg-button.key-bg {
  color: white;
  background: #818384;
  font-weight: bold;
}

.simple-keyboard.hg-layout-default .hg-button.is-warning {
  background: #c9b458 !important;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.is-dark {
  background: #787c7e;
  color: white;
}
.dark .simple-keyboard.hg-layout-default .hg-button.is-dark {
  background: #3a3a3c;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.is-success {
  background: #6aaa64;
  color: white;
}
.dark .simple-keyboard.hg-layout-default .hg-button.is-success {
  background: #6aaa64;
  color: white;
}

.simple-keyboard.hg-layout-default .hg-button.reset-color {
  background: #d3d6da !important;
  color: #4a4a4a;
  font-weight: bold;
}

.simple-keyboard.hg-layout-default .hg-button.df-warning {
  background: #c9b458 !important;
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

/* @media only screen and (max-width: 350px) {
  .simple-keyboard.hg-theme-default.myTheme {
    margin-top: 30px;
  }
} */
@media only screen and (min-width: 320px) and (max-width: 359px) {
  /* .letter-border {
    width: 29.59px;
    height: 29.59px;
    box-sizing: border-box;
    line-height: 23px;
    font-size: 20px;
    text-align: center;
  } */
}
@media only screen and (min-width: 400px) and (max-width: 430px) {
  /* .simple-keyboard.hg-theme-default.myTheme {
    margin-top: 90px;
  } */
}
</style>
