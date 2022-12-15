<template>
  <div class="template">
    <h1 class="title">ReciBase</h1>
    <slot>
    </slot>
  </div>
</template>

<style>
  .title {
    margin: 1em;
  }
  .template {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
