<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{
    recipes: any,
    onEditRecipe: (index: number) => void,
  }>();

  let recipes = ref(props.recipes);

  function deleteRecipe(index: number) {
    recipes.value.splice(index, 1);
  }
</script>

<template>
  <div class="table">
    <table class="uk-table uk-table-divider uk-table-hover uk-table-middle">
        <caption>Recipes</caption>
        <thead>
            <tr>
                <th>Recipe Name</th>
                <th>Recipe URL</th>
                <th>Meal Type</th>
                <th>Cuisine</th>
                <th>Utils</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(recipe, index) in $props.recipes">
                <td>{{ recipe.name }}</td>
                <td>
                  <a :href="recipe.source" target="_blank">{{ recipe.source }}</a>
                </td>
                <td>{{ recipe.mealType }}</td>
                <td>{{ recipe.cuisine }}</td>
                <td>
                  <div class="tableButtons">
                    <button @click="props.onEditRecipe(index)" class="uk-button">Edit</button>
                    <button @click="deleteRecipe(index)" class="uk-button">Delete</button>
                  </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-if="$props.recipes.length === 0">
      <p>No Recipes Have Been Saved</p>
    </div>
  </div>
</template>
