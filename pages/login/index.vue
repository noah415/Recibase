<script setup lang="ts">
  let username = ref<string>();
  let password = ref<string>();

  function login() {
    navigateTo('/landing');
  }

</script>

<template>
  <div class="uk-card uk-card-default uk-width-1-3">
    <div class="uk-card-header headerRow">
      <h3 class="uk-card-title">Login</h3>
    </div>
    <div class="uk-card-body">
      <input class="uk-input uk-margin" placeholder="Username">
      <input class="uk-input" placeholder="Password">
      <div class="buttonRow">
        <NuxtLink class="uk-button uk-button-default" to="/signup">Sign Up</NuxtLink>
        <button class="uk-button uk-button-primary" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<style>
.buttonRow {
  display: flex;
  margin-top: 2ch;
  flex-direction: row;
  justify-content: space-between;
}
</style>