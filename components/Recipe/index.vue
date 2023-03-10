<script setup lang="ts">
  const props = defineProps<{
    name: string,
    initialData: any,
    addRecipe: (data: any) => Promise<boolean>,
    destroy: () => void,
  }>();

  interface Ingredient {
    index: number,
    ingredient: string,
    amount?: number,
    measurement: string,
  }

  interface Instruction {
    index: number,
    instruction: string,
  }

  interface Sides {
    carb: boolean,
    veggie: boolean,
    fruit: boolean,
  }

  const cuisines = [
    'American',
    'Asian',
    'Italian',
    'Mexican',
    'Other',
  ];

  const proteins = [
    'Beef',
    'Chicken',
    'Pork',
    'Seafood',
    'Vegetarian',
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

  const measurements = [
    '',
    'gram',
    'tsp',
    'oz',
    'tbsp',
    'cup',
    'liter',
    'gallon',
  ];

  const recipeId = props.initialData.recipeId ? props.initialData.recipeId : null;
  let recipeName = ref(props.initialData ? props.initialData.name : null);
  let recipeSource = ref(props.initialData ? props.initialData.source : null);
  let cookbook = ref(props.initialData ? props.initialData.cookbook : null);
  let pagenumber = ref(props.initialData ? props.initialData.pagenumber : null);
  let cuisine = ref(props.initialData ? props.initialData.cuisine : cuisines[0]);
  let protein = ref(props.initialData ? props.initialData.protein : proteins[0]);
  let mealType = ref(props.initialData ? props.initialData.mealType : mealTypes[0]);
  let ingredients = ref<Ingredient[]>(props.initialData ? props.initialData.ingredients : []);
  let carb = ref<boolean>(props.initialData ? props.initialData.carb : false); 
  let veggie = ref<boolean>(props.initialData ? props.initialData.veggie : false); 
  let fruit = ref<boolean>(props.initialData ? props.initialData.fruit : false); 

  function onCancel() {
    clearAllData();
    props.destroy();
  }

  function clearAllData() {
    recipeName.value = '';
    recipeSource.value = '';
    mealType.value = mealTypes[0];
    cuisine.value = cuisines[0];
    ingredients.value = [];
  }

  function deleteIngredient(index: number) {
    ingredients.value.splice(index, 1);
  }

  function addIngredient() {
    ingredients.value.push({
      index: ingredients.value.length,
      ingredient: '',
      measurement: measurements[0],
    });
  }

  async function saveRecipe() {
    let success = false;

    if (props.initialData.recipeId) {
      success = await props.addRecipe({
        recipeId: recipeId,
        name: recipeName.value,
        source: recipeSource.value,
        cookbook: cookbook.value,
        pagenumber: pagenumber.value,
        cuisine: cuisine.value,
        mealType: mealType.value,
        protein: protein.value,
        carb: carb.value,
        veggie: veggie.value,
        fruit: fruit.value,
        ingredients: ingredients.value,
        instructions: [],
      });
    } else {
      success = await props.addRecipe({
        name: recipeName.value,
        source: recipeSource.value,
        cookbook: cookbook.value,
        pagenumber: pagenumber.value,
        cuisine: cuisine.value,
        mealType: mealType.value,
        protein: protein.value,
        carb: carb.value,
        veggie: veggie.value,
        fruit: fruit.value,
        ingredients: ingredients.value,
        instructions: [],
      });
    }

    if (success) {
      clearAllData();
    }
  }
</script>

<template>
  <div class="uk-card uk-card-default recipe">
    <div class="uk-card-header headerRow">
      <h3 class="uk-card-title">{{ $props.name }}</h3>
      <button @click="onCancel" class="uk-button uk-button-default">Cancel</button>
    </div>
    <div class="uk-card-body">
      <div class="addRecipeContainer">
        <div class="inputColumn">
          <input class="uk-input" placeholder="Name" v-model.trim="recipeName">
          <select class="uk-select" v-model="protein">
            <option v-for="choice in proteins" :value="choice">{{ choice }}</option>
          </select>
          <select class="uk-select" v-model="cuisine" placeholder="Cuisine">
            <option v-for="choice in cuisines" :value="choice">{{ choice }}</option>
          </select>
          <select class="uk-select" v-model="mealType" placeholder="Meal Type">
            <option v-for="choice in mealTypes" :value="choice">{{ choice }}</option>
          </select>
          <input class="uk-input" placeholder="URL (optional)" v-model.trim="recipeSource">
          <input class="uk-input" placeholder="Cookbook (optional)" v-model.trim="cookbook">
          <input class="uk-input" placeholder="Page # (optional)" type="number" v-model.number="pagenumber">
          <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <p>Side</p>
            <label><input class="uk-checkbox" type="checkbox" name="carb" v-model="carb"> Carb</label>
            <label><input class="uk-checkbox" type="checkbox" name="veggie" v-model="veggie"> Veggie</label>
            <label><input class="uk-checkbox" type="checkbox" name="fruit" v-model="fruit"> Fruit</label>
          </div>
        </div>
        <div class="ingredientsColumn">
          <div v-if="ingredients.length > 0" class="ingredients">
            <div v-for="(ingredient, index) in ingredients" class="ingredientLine uk-child-width-1-2">
              <div class="row">
                <div class="row">
                  <p class="index">{{ index + 1 }}:</p>
                </div>
                <input class="uk-input" placeholder="1.25" type="number" min="0" v-model.number="ingredient.amount">
                <select class="uk-select" placeholder="Measurement" v-model="ingredient.measurement">
                  <option v-for="choice in measurements" :value="choice">{{ choice }}</option>
                </select>
              </div>
              <div class="row">
                <input class="uk-input" placeholder="Name" v-model.trim="ingredient.ingredient">
                <button @click="deleteIngredient(index)" class="uk-button">Delete</button>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No Ingredients?</p>
          </div>
          <button @click="addIngredient" class="uk-button">Add Ingredient</button>
          <button @click="saveRecipe" class="uk-button uk-button-primary save">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .recipe {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 12ch;
    z-index: 5;
  }
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
    margin: 0;
    min-width: 2em;
    text-align: center;
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
    align-items: center;
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
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 1em;
  }
  .ingredientsColumn {
    width: 75%;
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
  .disabled {
    color: grey;
  }
</style>
