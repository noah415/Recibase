<script setup lang="ts">

  function signup() {
    navigateTo('/landing');
  }
</script>

<template>
  <div class="uk-card uk-card-default uk-width-1-3">
    <div class="uk-card-header headerRow">
      <h3 class="uk-card-title">Sign Up</h3>
    </div>
    <div class="uk-card-body">
      <input class="uk-input" placeholder="Firstname">
      <input class="uk-input uk-margin-top" placeholder="Lastname">
      <input class="uk-input uk-margin-top" placeholder="Username">
      <input class="uk-input uk-margin-top" placeholder="Password">
      <input class="uk-input uk-margin-top" placeholder="Confirm Password">
      <input class="uk-input uk-margin-top" placeholder="Email (optional)">
      <input class="uk-input uk-margin-top" placeholder="Age (optional)">
      <div class="buttonRow">
        <NuxtLink class="uk-button uk-button-default" to="/login">Login</NuxtLink>
        <button class="uk-button uk-button-primary" @click="signup">Sign Up</button>
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