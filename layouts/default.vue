
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
    align-items: center;
    flex-direction: column;
    background-color: #a9b1c2;
    height: 100vh;
  }
</style>
