<template>
  <div class="header dark:bg-[#121213] dark:border-b-[#3a3a3c]">
    <div class="title is-size-6-mobile mt-5 dark:text-white">@WordleUzBot</div>
    <div class="icon-menu gap-3">
      <button
        type="button"
        id="help-button"
        @click="showAboutStatus()"
        class="button"
        aria-label="Help"
        tabindex="-1"
      >
        <i
          class="far fa-question-circle text-[26px] text-black dark:text-white"
        ></i>
      </button>

      <button
        type=""
        id="statistics-button"
        @click="showStat()"
        class="button stats is-inverted"
        aria-label="Statistics"
        tabindex="-1"
      ></button>
      <button
        type=""
        id="settings-button"
        @click="settingsModal()"
        class="button"
        aria-label="Settings"
        tabindex="-1"
      >
        <i class="fas fa-cog text-[26px] text-black dark:text-white"></i>
      </button>
    </div>
  </div>
  <!-- <div class="title pt-5 pb-2 is-size-6-mobile"><span class="animate__animated animate__bounce">@WORDLEUZBOT</span></div> -->
</template>

<script>
export default {
  name: "Header",
  date() {
    return {};
  },
  methods: {
    showAboutStatus() {
      this.$store.state.aboutStatus = true;
    },
    showStat() {
      this.$store.state.isFinished = true;
    },
    settingsModal() {
      this.$store.state.SettingStatus = true;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  padding: 0px 16px;
  height: 50px;
  color: #000000;
  border-bottom: 1px solid #d3d6da;
}
.title {
  flex-grow: 2;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 0.01em;
  text-align: left;
  left: 0;
  right: 0;
  pointer-events: none;
  position: relative;
}
.icon-menu {
  display: flex;
  justify-content: flex-end;
}
.button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  box-shadow: none;
  outline: none;
  color: white;
}
button:focus {
  box-shadow: none;
  outline: none !important;
}

button.stats {
  background: url('data:image/svg+xml,<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="4 4 24 24" width="24" class="game-icon" data-testid="icon-statistics"><path fill="black" d="M20.6666 14.8333V5.5H11.3333V12.5H4.33325V26.5H27.6666V14.8333H20.6666ZM13.6666 7.83333H18.3333V24.1667H13.6666V7.83333ZM6.66659 14.8333H11.3333V24.1667H6.66659V14.8333ZM25.3333 24.1667H20.6666V17.1667H25.3333V24.1667Z"></path></svg>') no-repeat center;
  min-width: 26px;
}

.dark button.stats {
  background: url('data:image/svg+xml,<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="4 4 24 24" width="24" class="game-icon" data-testid="icon-statistics"><path fill="white" d="M20.6666 14.8333V5.5H11.3333V12.5H4.33325V26.5H27.6666V14.8333H20.6666ZM13.6666 7.83333H18.3333V24.1667H13.6666V7.83333ZM6.66659 14.8333H11.3333V24.1667H6.66659V14.8333ZM25.3333 24.1667H20.6666V17.1667H25.3333V24.1667Z"></path></svg>') no-repeat center;
  min-width: 26px;
}
</style>
