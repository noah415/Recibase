<script setup lang="ts">
  interface LoginResp {
    refreshToken: string,
  }

  let username = ref<string>(localStorage.username);
  let password = ref<string>();
  let invalidUsername = ref<string>();
  let invalidPassword = ref<string>();
  let invalidCredentials = ref<boolean>(false);

  async function login() {
    const usr: string | undefined = !invalidCredentials.value ?
          username.value :
          invalidUsername.value;
    const pass: string | undefined = !invalidCredentials.value ?
          password.value :
          invalidPassword.value;
    const { data, pending, error, refresh } = await useFetch('http://localhost:5050/login',{
      body: {
        username: usr,
        password: pass,
      },
      method: 'POST'
    });

    if (error.value) {
      invalidUsername.value = username.value;
      invalidCredentials.value = true;
    } else if (data.value) {
      const resp: LoginResp = <LoginResp> data.value;
      localStorage.refreshToken = resp.refreshToken;
      localStorage.username = usr;
      navigateTo('/landing')
    }
  }

</script>

<template>
  <div class="uk-card uk-card-default uk-width-1-3">
    <div class="uk-card-header headerRow">
      <h3 class="uk-card-title">Login</h3>
    </div>
    <div class="uk-card-body">
      <div v-if="!invalidCredentials">
        <input class="uk-input uk-margin" placeholder="Username" v-model="username">
        <input type="password" class="uk-input" placeholder="Password" v-model="password">
      </div>
      <div v-else>
        <input class="uk-input uk-form-danger uk-margin" placeholder="Username" v-model="invalidUsername">
        <input type="password" class="uk-input uk-form-danger" placeholder="Password" v-model="invalidPassword">
      </div>
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