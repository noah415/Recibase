<script setup lang="ts">
  definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
  })

  const recipes = ref<any[]>([]); 
  let isAddRecipe = ref<boolean>(false);
  let isEditRecipe = ref<boolean>(false);
  let isNameBlank = ref<boolean>(false);
  let duplicateRecipeName = ref<boolean>(false);
  let selectedRecipe = ref<any>();
  let selectedIndex = ref<number>();
  let username = localStorage.username;

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

  onMounted(async () => {
    const { data, error } = await getReq('http://localhost:5050/auth/recipe');
    if (error?.value) {
      console.log(error?.value.data);
    } else {
      data?.value.recipes.forEach((recipe: any) => {
        recipes.value.push({
          recipeId: recipe.id,
          cookbook: recipe.cookbook,
          cuisine: recipe.cuisine,
          mealType: recipe.mealType,
          name: recipe.name,
          notes: recipe.notes,
          pagenumber: recipe.pagenumber,
          protein: recipe.protein,
          carb: recipe.carb,
          veggie: recipe.veggie,
          fruit: recipe.fruit,
          source: recipe.url,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        });
      });
    }
  });

  async function addRecipe(data: any) {
    if (!data.name || data.name == "") {
      isNameBlank.value = true;
      return false;
    }

    if (!checkDuplicateRecipe(data)) {
      const resp = await postReq('http://localhost:5050/auth/recipe', data);
      if (resp.error?.value) {
        console.log(resp.error?.value.data);
        return false;
      } else {
        data.recipeId = resp.data?.value.recipeId;
        console.log('created recipe whos id is ' + data.recipeId);
        recipes.value.push(data);
        toggleIsAddRecipe();
        return true;
      }
    } else {
      console.log("duplicate recipe name");
      duplicateRecipeName.value = true;
      return false;
    }
  }
  async function saveEditRecipe(data: any) {
    const resp = await putReq('http://localhost:5050/auth/recipe', data);
    if (resp.error?.value) {
      console.log(resp.error?.value.data);
      return false;
    } else {
      console.log('editted and saved recipe whos id is ' + resp.data.value.recipeId);
      recipes.value[selectedIndex.value!] = data;
      toggleIsEditRecipe();
      return true;
    }
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
  function logout() {
    localStorage.removeItem('refreshToken');
    navigateTo('/login');
  }
</script>

<template>
  <div class="uk-card-default uk-card logout">
    <span class="uk-margin-right">Hello, {{ username }}</span>
    <button class="uk-button uk-button-danger" @click="logout">Logout</button>
  </div>
  <Recipe v-if="isAddRecipe" initial-data="" :destroy="toggleIsAddRecipe" :add-recipe="addRecipe" name="Let's add a recipe!"/>
  <button @click="toggleIsAddRecipe" class="uk-button uk-card-default" v-else>Add Recipe</button>
  <Recipe v-if="isEditRecipe" :initial-data="selectedRecipe" :destroy="toggleIsEditRecipe" :add-recipe="saveEditRecipe" name="Let's edit a recipe!"/>
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
    left: 0;
    bottom: 0;
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
