<template>
  <div
    class="letter-border has-text-centered has-text-weight-bold dark:border-[#3a3a3c] dark:text-white"
    
    :class="{
      'border-gray-500': color == '' && letter.length > 0,
      '': !pulse,
      scale: pulse,
      'has-background-grey-light has-text-white animate__animated animate__flipInX':
        color == '-1',
      'has-background-success	has-text-white animate__animated animate__flipInX':
        color == '1',
      'has-background-warning has-text-white animate__animated animate__flipInX':
        color == '0',
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
.dark .has-background-grey-light {
  background: #3a3a3c !important;
  border-color: #3a3a3c !important;
}
.has-background-success {
  background: #6aaa64 !important;
  border-color: #6aaa64 !important;
}
.dark .has-background-success {
  background: #538d4e !important;
  border-color: #538d4e !important;
}
.letter-border {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  border: 2px solid #d3d6da;
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
/* @media only screen and (min-width: 320px) and (max-width: 359px) {
  .letter-border {
    width: 27.59px;
    height: 27.59px;
    line-height: 23px;
    font-size: 20px;
  }
} */

.bounce2 {
  animation: bounce2 1s ease;
}
@keyframes bounce2 {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
