<script setup lang="ts">
  const recipes = ref<any[]>([]); 
  let isAddRecipe = ref<boolean>(false);
  let isEditRecipe = ref<boolean>(false);
  let isNameBlank = ref<boolean>(false);
  let duplicateRecipeName = ref<boolean>(false);
  let selectedRecipe = ref<any>();
  let selectedIndex = ref<number>();
  let username = "notuska"

  function checkDuplicateRecipe(data: any) {
    let res: boolean = false;

    recipes.value.forEach((recipe) => {
      if (recipe.name == data.name) {
        res = true;
        return;
      }
    });

    return res;
  }

  function toggleDuplicate() {
    duplicateRecipeName.value = !duplicateRecipeName.value;
  }

  function toggleEmpty() {
    isNameBlank.value = !isNameBlank.value;
  }

  function addRecipe(data: any) {
    if (!data.name || data.name == "") {
      isNameBlank.value = true;
      return;
    }

    if (!checkDuplicateRecipe(data)) {
      recipes.value.push(data);
      toggleIsAddRecipe();
    } else {
      console.log("duplicate recipe name");
      duplicateRecipeName.value = true;
    }
  }
  function saveEditRecipe(data: any) {
    recipes.value[selectedIndex.value!] = data;
    toggleIsEditRecipe();
  }
  function toggleIsAddRecipe() {
    isAddRecipe.value = !isAddRecipe.value;
  }
  function toggleIsEditRecipe() {
    isEditRecipe.value = !isEditRecipe.value;
  }
  function selectRecipe(index: number) {
    selectedIndex.value = index;
    selectedRecipe.value = JSON.parse(JSON.stringify(recipes.value[index]));
    toggleIsEditRecipe();
  }
</script>

<template>
  <div class="uk-card-default uk-card logout">
    <span class="uk-margin-right">Hello, {{ username }}</span>
    <NuxtLink class="uk-button uk-button-danger" to="/login">Logout</NuxtLink>
  </div>
  <RecipeTable :recipes="recipes" :on-edit-recipe="selectRecipe"/>
  <div v-if="isNameBlank" @hide="toggleEmpty" class="uk-alert-danger alert" uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <p>Name of recipe is blank</p>
  </div>
  <div v-if="duplicateRecipeName" @hide="toggleDuplicate" class="uk-alert-danger alert" uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <p>Name of recipe is already taken</p>
  </div>
</template>

<style>
  .table {
    margin: 1em;
    width: 70%;
  }
  .tableButtons {
    display: flex;
    column-gap: 1em;
  }

  .alert {
    position: absolute;
    top: 0;
    right: 1;
  }
  .logout {
    padding: 2ch;
    position: absolute;
    right: 2ch;
    top: 2ch;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
</style>
