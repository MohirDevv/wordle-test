<template>
  <div
    class="modal p-6 animate__animated"
    :class="{ 'is-active animate__fadeIn': this.$store.state.aboutStatus }"
  >
    <div class="modal-background" @click="removeAbout()"></div>
    <div class="modal-card game-help">
      <section class="modal-card-body rounded-md dark:bg-[#252525]">
        <i
          class="fas fa-times float-right text-[16px] cursor-pointer text-black dark:text-white"
          @click="removeAbout()"
        ></i>
        <div class="instruction pt-2">
          <p><strong class="dark:text-white">Ўйин қоидалари</strong></p>
          <br />
          <p class="dark:text-white">
            6 та уринишда кун
            <strong class="dark:text-white">СЎЗ</strong>ини топинг
          </p>
          <br />
          <p class="dark:text-white">
            Ҳар бир тахминдан сўнг, катакларнинг ранги ўзгариб, сизнинг
            тахминингиз кун сўзига қанчалик яқин эканлигини кўрсатади.
          </p>
        </div>
        <div class="examples mt-3">
          <div class="example">
            <div class="row has-text-centered is-flex has-text-weight-medium">
              <p
                class="letter mr-1 has-background-success has-text-white animate__animated animate__flipInX"
              >
                С
              </p>
              <p class="letter mr-1 dark:text-white">А</p>
              <p class="letter mr-1 dark:text-white">Л</p>
              <p class="letter mr-1 dark:text-white">О</p>
              <p class="letter mr-1 dark:text-white">М</p>
            </div>
          </div>
          <p class="dark:text-white">
            <strong class="dark:text-[#6aaa64]">С</strong> ҳарфи СЎЗ ичида бор
            ва тўғри ўриндан жой олган.
          </p>
          <div class="example">
            <div class="row has-text-centered is-flex has-text-weight-medium">
              <p class="letter mr-1 dark:text-white">П</p>
              <p class="letter mr-1 dark:text-white">А</p>
              <p
                class="letter mr-1 has-background-warning has-text-white animate__animated animate__flipInX"
              >
                Х
              </p>
              <p class="letter mr-1 dark:text-white">Т</p>
              <p class="letter mr-1 dark:text-white">А</p>
            </div>
          </div>
          <p class="dark:text-white">
            <strong class="dark:text-[#c9b458]">Х</strong> ҳарфи СЎЗ ичида бор
            лекин, нотўғри ўриндан жой олган.
          </p>
          <div class="example">
            <div class="row has-text-centered is-flex has-text-weight-medium">
              <p
                class="letter mr-1 animate__animated animate__fadeIn dark:text-white"
              >
                К
              </p>
              <p class="letter mr-1 dark:text-white">И</p>
              <p class="letter mr-1 dark:text-white">Т</p>
              <p class="letter mr-1 dark:text-white">О</p>
              <p
                class="letter mr-1 has-text-white has-background-grey-light animate__animated animate__flipInX"
              >
                Б
              </p>
            </div>
          </div>
          <p class="mb-2 dark:text-white">
            <strong class="dark:text-[#787c7e]">Б</strong> ҳарфи СЎЗ ичида
            иштирок этмаган.
          </p>
        </div>
        <br />
        <p>
          <strong class="dark:text-white">Ҳар куни сўз янгиланади!</strong>
        </p>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {};
  },
  props: {
    isActive: Boolean,
  },
  setup() {},
  mounted() {},
  methods: {
    removeAbout() {
      this.$store.state.aboutStatus = false;
    },
  },
};
</script>

<style scoped>
.border-gray-500 {
  border-color: #000000 !important;
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
.modal-card {
  max-width: 500px !important;
}

.instructions {
  font-size: 14px;
}
.examples {
  border-bottom: 1px solid;
  border-top: 1px solid;
}
.example {
  margin-top: 25px;
  margin-bottom: 10px;
}
.letter {
  width: 40px;
  height: 40px;
  font-size: 2rem;
  border: 2px solid #878a8c;
  box-sizing: border-box;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 20px;
  line-height: 35px;
}

.animate__animated.animate__flipInX{
  animation-delay: .3s;
  /* --animate-duration: 2.4s; */
}
@media only screen and (max-width: 500px) {
  .letter {
    width: 30px;
    height: 30px;
    line-height: 26px;
    text-align: center;
    font-size: 24px;
  }
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
@media only screen and (min-width: 320px) and (max-width: 370px) {
  .letter {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    text-align: center;
    line-height: 24px;
    font-size: 25px;
  }
  p {
    line-height: 20px;
    font-size: 15px;
  }
  .modal-card {
    width: 350px;
    max-height: 680px;
  }

  .modal-card-body {
    margin-left: 20px;
    margin-right: 20px;
  }
}
.modal-background {
  opacity: 0.3 !important;
}

.modal-card-body {
  border-radius: 6px;
}
</style>
