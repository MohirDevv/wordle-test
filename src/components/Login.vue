<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <!-- Callback mode -->
    <span v-if="!isLoaded">Loading...</span>
    <telegram-login-temp
      mode="callback"
      telegram-login="WordleUzBot"
      @loaded="telegramLoadedCallbackFunc"
      @callback="yourCallbackFunction"
    />

    <!-- Redirect mode -->
    <telegram-login-temp
      mode="redirect"
      telegram-login="WordleUzBot"
      @loaded="telegramLoadedCallbackFunc"
      redirect-url="/"
    />
  </div>
</template>

<script setup>
function onTelegramAuth(user) {
  alert(
    "Logged in as " +
      user.first_name +
      " " +
      user.last_name +
      " (" +
      user.id +
      (user.username ? ", @" + user.username : "") +
      ")"
  );
}
import { telegramLoginTemp } from "vue3-telegram-login";
import { ref } from "vue";

const isLoaded = ref(false);

function telegramLoadedCallbackFunc() {
  console.log("script is loaded");
  isLoaded.value = true;
}

function yourCallbackFunction(user) {
  // gets user as an input
  // id, first_name, last_name, username,
  // photo_url, auth_date and hash
  console.log(user);
}
</script>
