<script setup lang="ts">
import ListadoPersonajes from '@/components/ListadoPersonajes.vue'
import ListadoPersonajesFavoritos from '@/components/ListadoPersonajesFavoritos.vue'
</script>

<template>
  <main class="l-home">
    <section class="l-home__main">
      <h1>Bienvenido a la API de Rick and Morty</h1>
      <hr />
      <ListadoPersonajes />
    </section>

    <aside class="l-home__sidebar">
      <ListadoPersonajesFavoritos />
    </aside>
  </main>
</template>

<style scoped>
.l-home {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .l-home {
    grid-template-columns: 1fr;
  }
}
</style>
