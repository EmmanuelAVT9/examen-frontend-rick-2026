<script setup lang="ts"></script>

<template>
  <main>Home View</main>
  <p>Input prueba sencillo</p>
  <FormKit type="text" />
  <p>Input prueba con props</p>
  <FormKit
    type="text"
    name="name"
    id="name"
    label="Name"
    help="Your full name"
    placeholder="“Jon Doe”"
  />
</template>
