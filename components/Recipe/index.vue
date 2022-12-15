<script setup lang="ts">
  import { ref } from 'vue';
  const props = defineProps<{
    name: string,
    initialData: any,
    addRecipe: (data: any) => void,
    destroy: () => void,
  }>();

  interface Ingredient {
    quantity: string,
    name: string,
  }

  const cuisines = [
    'American',
    'Asian',
    'Mexican',
    'Other',
  ];

  const mealTypes = [
    'Breakfast',
    'Brunch',
    'Lunch',
    'Dinner',
    'Dessert',
    'Other',
  ];

  let recipeName = ref(props.initialData ? props.initialData.name : null);
  let cuisine = ref(props.initialData ? props.initialData.cuisine : cuisines[0]);
  let mealType = ref(props.initialData ? props.initialData.mealType : mealTypes[0]);
  let ingredients = ref<Ingredient[]>(props.initialData ? props.initialData.ingredients : []);

  function onCancel() {
    clearAllData();
    props.destroy();
  }

  function clearAllData() {
    recipeName.value = '';
    mealType.value = mealTypes[0];
    cuisine.value = cuisines[0];
    ingredients.value = [];
  }

  function deleteIngredient(index: number) {
    ingredients.value.splice(index, 1);
  }

  function addIngredient() {
    ingredients.value.push({
      quantity: '',
      name: '',
    });
  }

  function saveRecipe() {
    props.addRecipe({
      name: recipeName.value,
      cuisine: cuisine.value,
      mealType: mealType.value,
      ingredients: ingredients.value,
    });
    clearAllData();
  }
</script>

<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header headerRow">
      <h3 class="uk-card-title">{{ $props.name }}</h3>
      <button @click="onCancel" class="uk-button">Cancel</button>
    </div>
    <div class="uk-card-body">
      <div class="addRecipeContainer">
        <div class="inputColumn">
          <input class="uk-input" placeholder="Name" v-model="recipeName">
          <select class="uk-select" v-model="cuisine" placeholder="Cuisine">
            <option v-for="choice in cuisines" :value="choice">{{ choice }}</option>
          </select>
          <select class="uk-select" v-model="mealType" placeholder="Meal Type">
            <option v-for="choice in mealTypes" :value="choice">{{ choice }}</option>
          </select>
        </div>
        <div class="ingredientsColumn">
          <div v-if="ingredients.length > 0" class="ingredients">
            <div v-for="(ingredient, index) in ingredients" class="ingredientLine">
              <p class="index">{{ index + 1 }}:</p>
              <input class="uk-input" placeholder="Name" v-model="ingredient.name">
              <input class="uk-input" placeholder="Quantity" v-model="ingredient.quantity">
              <button @click="deleteIngredient(index)" class="uk-button">Delete</button>
            </div>
          </div>
          <div v-else>
            <p>No Ingredients?</p>
          </div>
          <button @click="addIngredient" class="uk-button">Add Ingredient</button>
          <button @click="saveRecipe" class="uk-button save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
  input.name {
    width: 70%;
  }
  input.ingredient {
    width: 20ch;
  }
  p {
    font-weight: 600;
  }
  h1.addRecipe {
    color: white;
  }
  .save {
    align-self: flex-end;
  }
  .headerRow {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }
  .index {
    min-width: 2em;
    text-align: end;
  }
  .input {
    width: 70%;
  }
  .ingredientInput {
    width: 40%;
    /* margin-top: 1.25em; */
  }
  .ingredientLine {
    display: flex;
    align-items: baseline;
    justify-content: center;
    min-width: 50ch;
    width: 100%;
    column-gap: 2em;
  }
  .addRecipeContainer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    column-gap: 1em;
    min-width: 65vw;
  }
  .inputColumn {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 1em;
  }
  .ingredientsColumn {
    width: 60%;
    row-gap: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .ingredients {
    row-gap: 1em;
    display: flex;
    margin: auto;
    flex-direction: column;
    max-height: 30vh;
    overflow-y: scroll;
    overflow-x: auto;
  }
</style>
