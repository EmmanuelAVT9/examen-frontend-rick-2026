<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCharactersStore } from '@/stores/characters.store'
import type { Character } from '@/models/CharactersModel'
import CardPersonaje from './CardPersonaje.vue'
import ModalDetallePersonaje from './ModalDetallePersonaje.vue'
import PaginacionPersonajes from './PaginacionPersonajes.vue'

const store = useCharactersStore()

const selectedCharacter = ref<Character | null>(null)
const isModalOpen = ref(false)

const openModal = (character: Character) => {
  selectedCharacter.value = character
  isModalOpen.value = true
}

onMounted(() => {
  if (store.characters.length === 0) {
    store.loadCharacters()
  }
})
</script>

<template>
  <div class="c-character-list">
    <div v-if="store.isLoading" class="c-message">Buscando en el multiverso...</div>

    <div v-else-if="store.errorMessage" class="c-message c-message--error">
      {{ store.errorMessage }}
    </div>

    <div v-else>
      <ul class="o-grid">
        <li v-for="character in store.characters" :key="character.id">
          <CardPersonaje :character="character" @select="openModal" />
        </li>
      </ul>

      <PaginacionPersonajes />
    </div>

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
.c-message {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}
.c-message--error {
  color: #d32f2f;
}
</style>
