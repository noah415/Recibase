<script setup lang="ts">
  import { ref } from 'vue';

  const recipes = ref<any[]>([]); 
  let isAddRecipe = ref<boolean>(false);
  let isEditRecipe = ref<boolean>(false);
  let selectedRecipe = ref<any>();
  let selectedIndex = ref<number>();

  function addRecipe(data: any) {
    recipes.value.push(data);
    toggleIsAddRecipe();
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
  <Recipe v-if="isAddRecipe" initial-data="" :destroy="toggleIsAddRecipe" :add-recipe="addRecipe" name="Let's add a recipe!"/>
  <button @click="toggleIsAddRecipe" class="uk-button" v-else>Add Recipe</button>
  <div v-if="isEditRecipe">
    <Recipe :initial-data="selectedRecipe" :destroy="toggleIsEditRecipe" :add-recipe="saveEditRecipe" name="Let's edit a recipe!"/>
  </div>
  <RecipeTable :recipes="recipes" :on-edit-recipe="selectRecipe"/>
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
</style>
