<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <button @click="pushRoute">iuhjli</button>
    <!-- Redirect mode -->
    <telegram-login-temp
      mode="callback"
      telegram-login="WordleUzBot"
      @callback="getUser"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { useCookies } from "@vueuse/integrations/useCookies";
import { telegramLoginTemp } from "vue3-telegram-login";

const router = useRouter();

async function getUser(user) {
  const cookies = useCookies();
  console.log(user);
  const formData = {
    telegram_id: user.id,
  };
  await axios
    .post(`/auth/`, formData)
    .then((response) => {
      cookies.set("token", response.data.token);
      console.log(response);
      router.push({ name: "Game" });
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
