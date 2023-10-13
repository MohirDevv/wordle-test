<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <!-- Redirect mode -->
    <telegram-login-temp
      mode="redirect"
      telegram-login="WordleUzBot"
      @callback="yourCallbackFunction"
      redirect-url="/"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { useCookies } from '@vueuse/integrations/useCookies'
import { telegramLoginTemp } from "vue3-telegram-login";

async function yourCallbackFunction(user) {
  const cookies = useCookies();
  console.log(user);
  const formData = {
    telegram_id: user.id,
  };
  await axios
    .post(`/auth/`, formData)
    .then((response) => {
      cookies.set("token", response.data.token);
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
  // user.id
}
</script>
