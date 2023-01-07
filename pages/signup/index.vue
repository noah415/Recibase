<script setup lang="ts">
  interface SignUpResp {
    refreshToken: string,
  }

  let firstname = ref<string>();
  let lastname = ref<string>();
  let username = ref<string>();
  let password = ref<string>();
  let confPassword = ref<string>();
  let email = ref<string>();
  let age = ref<number>();

  let invalidUsername = ref<string>();
  let invalidPassword = ref<string>();
  let invalidConfPassword = ref<string>();
  let invalidFirstname = ref<string>();
  let invalidLastname = ref<string>();
  
  let isValidUsername = ref<boolean>(true);
  let isValidPassword = ref<boolean>(true);
  let isValidFirstname = ref<boolean>(true);
  let isValidLastname = ref<boolean>(true);
  let isMatchingPassword = ref<boolean>(true);
  let isMatchingUsername = ref<boolean>(false);
  let somethingWrong = ref<boolean>(false);

  function onCloseWrong() {
    somethingWrong.value = false;
  }

  function onCloseUsername() {
    isMatchingUsername.value = false;
  }

  function onClose() {
    isMatchingPassword.value = true;
  }

  function validateInputs() {
    let invalids: string[] = [];
    const usr = isValidUsername.value ? username.value : invalidUsername.value;
    const first = isValidFirstname.value ? firstname.value : invalidFirstname.value;
    const last = isValidLastname.value ? lastname.value : invalidLastname.value;
    const pass = isValidPassword.value ? password.value : invalidPassword.value;
    const confpass = isValidPassword.value ? confPassword.value : invalidConfPassword.value;

    if (!usr || usr.length === 0) {
      invalids.push('username');
      isValidUsername.value = false;
      invalidUsername.value = username.value;
    } else {
      isValidUsername.value = true;     
      isMatchingUsername.value = false;     
      username.value = invalidUsername.value ?
        invalidUsername.value : username.value;
    }
    if (!first || first.length === 0) {
      invalids.push('firstname');
      isValidFirstname.value = false;
      invalidFirstname.value = firstname.value;
    } else {
      isValidFirstname.value = true;
      firstname.value = invalidFirstname.value ? 
        invalidFirstname.value : firstname.value;
    }
    if (!last || last.length === 0) {
      invalids.push('lastname');
      isValidLastname.value = false;
      invalidLastname.value = lastname.value;
    } else {
      isValidLastname.value = true;
      lastname.value = invalidLastname.value ? 
        invalidLastname.value : lastname.value;
    }
    if (!pass || pass.length === 0) {
      invalids.push('password');
      isValidPassword.value = false;
      invalidPassword.value = password.value;
    } else if (pass !== confpass) {
      invalids.push('confpassword');
      isValidPassword.value = false;
      isMatchingPassword.value = false;
      confPassword.value = '';
      invalidPassword.value = password.value;
    } else {
      password.value = invalidPassword.value ?
        invalidPassword.value : password.value;
      confPassword.value = invalidConfPassword.value ?
        invalidConfPassword.value : confPassword.value;
      isMatchingPassword.value = true;
      isValidPassword.value = true;
    }

    if (invalids.length > 0) {
      return undefined;
    }
    return {
      username: usr,
      firstname: first,
      lastname: last,
      password: pass,
      email: email.value,
      age: age.value ? Math.floor(age.value) : undefined,
    };
  }

  async function signup() {
    const newData = validateInputs();
    if (newData) {
      console.log('good to make the req now');
      const { data, pending, error, refresh } = await useFetch('http://localhost:5050/register',{
        body: {
          username: newData.username,
          firstname: newData.firstname,
          lastname: newData.lastname,
          password: newData.password,
          email: newData.email,
          age: newData.age,
        },
        method: 'POST'
      });

      if (error.value) {
        console.log(error.value?.data.message);
        if (error.value.data.message == 'username already exists') {
          isMatchingUsername.value = true;
          isValidUsername.value = false;
          invalidUsername.value = username.value;
        } else {
          somethingWrong.value = true;
        }
      } else if (data) {
        console.log(data);
        const resp: SignUpResp = <SignUpResp> data.value;
        localStorage.refreshToken = resp.refreshToken;
        localStorage.username = newData.username;
        navigateTo('/landing')
      }
    } else {
      somethingWrong.value = true;
    }
  }
</script>

<template>
  <div v-if="somethingWrong" @hide="onCloseWrong" class="uk-alert-danger alert" uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <p>Something went wrong. </p>
  </div>
  <div v-if="isMatchingUsername" @hide="onCloseUsername" class="uk-alert-danger alert" uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <p>Username is already taken. </p>
  </div>
  <div v-if="!isMatchingPassword" @hide="onClose" class="uk-alert-danger alert" uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <p>Passwords do not match. </p>
  </div>
  <div class="uk-card uk-card-default uk-width-1-3">
    <div class="uk-card-header headerRow">
      <h3 class="uk-card-title">Sign Up</h3>
    </div>
    <div class="uk-card-body">
      <input v-if="isValidFirstname" class="uk-input" placeholder="Firstname" v-model.trim="firstname">
      <input v-else class="uk-input uk-form-danger" placeholder="Firstname" v-model.trim="invalidFirstname">
      <input v-if="isValidLastname" class="uk-input uk-margin-top" placeholder="Lastname" v-model.trim="lastname">
      <input v-else class="uk-form-danger uk-input uk-margin-top" placeholder="Lastname" v-model.trim="invalidLastname">
      <input v-if="isValidUsername" class="uk-input uk-margin-top" placeholder="Username" v-model.trim="username">
      <input v-else class="uk-form-danger uk-input uk-margin-top" placeholder="Username" v-model.trim="invalidUsername">
      <div v-if="isValidPassword">
        <input type="password" class="uk-input uk-margin-top" placeholder="Password" v-model="password">
        <input type="password" class="uk-input uk-margin-top" placeholder="Confirm Password" v-model="confPassword">
      </div>
      <div v-else>
        <input type="password" class="uk-form-danger uk-input uk-margin-top" placeholder="Password" v-model="invalidPassword">
        <input type="password" class="uk-form-danger uk-input uk-margin-top" placeholder="Confirm Password" v-model="invalidConfPassword">
      </div>
      <input type="email" class="uk-input uk-margin-top" placeholder="Email (optional)" v-model.trim="email">
      <input class="uk-input uk-margin-top" placeholder="Age (optional)" type="number" min="0" v-model.number="age">
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
.alert {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>