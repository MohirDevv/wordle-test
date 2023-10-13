<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <div class="widget_container" id="widget_container">
      <iframe
        id="telegram-login-WordleUzBot"
        src="https://oauth.telegram.org/embed/WordleUzBot?origin=http%3A%2F%2Flocalhost%3A8080&amp;return_to=http%3A%2F%2Flocalhost%3A8080%2Flogin&amp;size=large&amp;request_access=write"
        width="238"
        height="40"
        frameborder="0"
        scrolling="no"
        style="overflow: hidden; color-scheme: light dark; border: none"
      ></iframe>
    </div>
  </div>
</template>

<script type="text/javascript">
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
</script>
