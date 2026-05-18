<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCharacters } from '@/services/characters/character.service'
import type { Character } from '@/models/CharactersModel'
import CardPersonaje from './CardPersonaje.vue'
import ModalDetallePersonaje from './ModalDetallePersonaje.vue' // <-- 1. Importar el modal

const characters = ref<Character[]>([])
const isLoading = ref<boolean>(true)
const errorMessage = ref<string | null>(null)

// 2. Estados reactivos para controlar el Modal
const selectedCharacter = ref<Character | null>(null)
const isModalOpen = ref(false)

const loadCharacters = async () => {
  try {
    isLoading.value = true
    errorMessage.value = null
    const response = await getCharacters()
    characters.value = response.results
  } catch (error: any) {
    errorMessage.value = error.message || 'Error al obtener los personajes'
  } finally {
    isLoading.value = false
  }
}

// 3. Función que recibe el personaje clickeado y abre la ventana
const openModal = (character: Character) => {
  selectedCharacter.value = character
  isModalOpen.value = true
}

onMounted(() => loadCharacters())
</script>

<template>
  <div class="c-character-list">
    <div v-if="isLoading">Cargando personajes...</div>
    <div v-else-if="errorMessage">
      {{ errorMessage }} <button @click="loadCharacters">Reintentar</button>
    </div>

    <ul v-else class="o-grid">
      <li v-for="character in characters" :key="character.id">
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
</style>
