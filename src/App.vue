<template>
  <div class="wrapper min-h-[100vh] dark:bg-[#121213]">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/WordleHeader.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
@import "~bulma/css/bulma.css";
.is-centered {
  display: flex;
  justify-content: center;
}
.info {
  width: 370px;
}

@media only screen and (max-width: 500px) {
  .info {
    width: 370px;
  }
}
@media only screen and (min-width: 320px) and (max-width: 360px) {
  .info {
    width: 340px;
  }
}
</style>