<script setup lang="ts">
import ListadoPersonajes from '@/components/ListadoPersonajes.vue'
</script>

<template>
  <main>
    <h1>Bienvenido a la API de Rick and Morty</h1>
    <hr />
    <ListadoPersonajes />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
