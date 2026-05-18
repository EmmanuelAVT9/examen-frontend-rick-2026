<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites.store'
import CardPersonajeFavorita from './CardPersonajeFavorita.vue'

const store = useFavoritesStore()
</script>

<template>
  <aside class="c-favorites-list">
    <h3>Mis Favoritos</h3>
    <div v-if="store.favorites.length === 0">
      <p>Aún no tienes personajes favoritos.</p>
    </div>
    <ul v-else>
      <li v-for="character in store.favorites" :key="character.id">
        <CardPersonajeFavorita :character="character" />
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.c-favorites-list {
  padding: 1rem;
  background: #fff;
  border-left: 1px solid #eee;
  height: 100%;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
