<script setup lang="ts">
  const props = defineProps<{
    recipes: any,
    onEditRecipe: (index: number) => void,
  }>();

  let recipes = ref(props.recipes);

  async function deleteRecipe(index: number) {
    const req = {
      recipeId: recipes.value[index].recipeId,
      recipeName: recipes.value[index].name,
    }
    const { data, error } = await deleteReq('http://localhost:5050/auth/recipe', req);

    if (error?.value) {
      console.log(error.value.data);
    } else {
      console.log(data.value);
      recipes.value.splice(index, 1);
    }
  }
</script>

<template>
  <div class="uk-card uk-card-default uk-width-auto table">
    <div class="container">
      <table class="uk-table uk-table-divider uk-table-hover uk-table-middle">
          <caption>Recipes</caption>
          <thead>
              <tr>
                  <th>
                    <button class="uk-button uk-button-default">
                      Name
                    </button>
                  </th>
                  <th>
                    <button class="uk-button uk-button-default">
                      URL
                    </button>
                  </th>
                  <th>
                    <button class="uk-button uk-button-default">
                      Book
                    </button>
                  </th>
                  <th>
                    <button class="uk-button uk-button-default">
                      Page #
                    </button>
                  </th>
                  <th>
                    <button class="uk-button uk-button-default">
                      Type
                    </button>
                  </th>
                  <th>
                    <button class="uk-button uk-button-default">
                      Cuisine
                    </button>
                  </th>
                  <!-- <th>Recipe</th>
                  <th>URL</th>
                  <th>Book</th>
                  <th>Page #</th>
                  <th>Meal Type</th>
                  <th>Cuisine</th> -->
                  <th></th>
              </tr>
          </thead>
          <tbody class="body">
              <tr v-for="(recipe, index) in $props.recipes">
                  <td>{{ recipe.name }}</td>
                  <td>
                    <a :href="recipe.source" target="_blank">{{ recipe.source }}</a>
                  </td>
                  <td>{{ recipe.cookbook }}</td>
                  <td>{{ recipe.pagenumber == 0 ? null : recipe.pagenumber }}</td>
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
  </div>
</template>

<style>
  .table {
    padding: 2ch;
    align-items: center;
    justify-content: center;
  }
  .container {
    max-width: 100%;
  }
  .body {
    text-align: center;
  }
  .tableButtons {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
