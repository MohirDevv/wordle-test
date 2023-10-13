<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <button @click="yourCallbackFunction(3243)">312434</button>
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
import axios from "axios";
import { telegramLoginTemp } from "vue3-telegram-login";
import { ref } from "vue";

const isLoaded = ref(false);

function telegramLoadedCallbackFunc() {
  console.log("script is loaded");
  isLoaded.value = true;
}

async function yourCallbackFunction(user) {
  // gets user as an input
  // id, first_name, last_name, username,
  // photo_url, auth_date and hash
  console.log(user);
  const formData = {
    telegram_id: user,
  };
  await axios
    .post(`/auth/`, formData)
    .then((response) => {
      cookies.set("token", response.token);

    })
    .catch((error) => {
      console.log(error);
    });
  // user.id
}
</script>
