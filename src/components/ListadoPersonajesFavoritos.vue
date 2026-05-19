<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites.store'
import CardPersonaje from './CardPersonaje.vue'
import ModalDetallePersonaje from './ModalDetallePersonaje.vue'
import { ref } from 'vue'
import type { Character } from '@/models/CharactersModel'

const store = useFavoritesStore()

const selectedCharacter = ref<Character | null>(null)
const isModalOpen = ref(false)

const openModal = (character: Character) => {
  selectedCharacter.value = character
  isModalOpen.value = true
}
</script>

<template>
  <div class="c-favorites-grid">
    <div v-if="store.favorites.length === 0" class="c-favorites-empty">
      <p>Por el momento no tienes personajes favoritos.</p>
    </div>

    <ul v-else class="o-grid">
      <li v-for="character in store.favorites" :key="character.id">
        <CardPersonaje :character="character" @select="openModal" />
      </li>
    </ul>

    <ModalDetallePersonaje
      :character="selectedCharacter"
      :is-open="isModalOpen"
      @close="isModalOpen = false"
    />
  </div>
</template>

<style scoped>
.o-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
}
.c-favorites-empty {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
}
</style>
