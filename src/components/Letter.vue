<template>
  <div
    class="letter-border has-text-centered has-text-weight-bold dark:border-white"
    :class="{
      'border-gray-500': color == '' && letter.length > 0,
      '': !pulse,
      scale: pulse,
      'has-background-grey-light has-text-white animate__animated animate__flipInX':
        color == 'gray',
      'has-background-success	has-text-white animate__animated animate__flipInX':
        color == 'green',
      'has-background-warning has-text-white animate__animated animate__flipInX':
        color == 'yellow',
    }"
  >
    {{ letter }}
  </div>
</template>

<script>
export default {
  name: "Letter",
  props: {
    letter: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      pulse: false,
    };
  },

  watch: {
    letter: {
      handler(letter) {
        if (letter && letter.length > 0) {
          this.pulse = true;
          setTimeout(() => {
            this.pulse = false;
          }, 70);
        }
      },
    },
  },
};
</script>

<style scoped>
.scale {
  transform: scale(1.05);
}
.border-gray-500 {
  border-color: #878a8c !important;
}
.has-background-warning {
  background: #c9b458 !important;
  border-color: #c9b458 !important;
}
.has-background-grey-light {
  background: #787c7e !important;
  border-color: #787c7e !important;
}
.has-background-success {
  background: #6aaa64 !important;
  border-color: #6aaa64 !important;
}
.letter-border {
  width: 60px;
  height: 60px;
  font-size: 2rem;
  border: 2.4px solid #d3d6da;
  box-sizing: border-box;
  text-transform: uppercase;
  margin: 2px;
}
@media only screen and (max-width: 500px) {
  .letter-border {
    width: 50px;
    height: 50px;
    line-height: 3rem;
    text-align: center;
    font-size: 25px;
  }
}
@media only screen and (min-width: 320px) and (max-width: 359px) {
  .letter-border {
    width: 27.59px;
    height: 27.59px;
    line-height: 23px;
    font-size: 20px;
  }
}
</style>