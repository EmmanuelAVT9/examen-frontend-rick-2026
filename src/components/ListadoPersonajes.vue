<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCharacters } from '@/services/characters/character.service'
import type { Character } from '@/models/CharactersModel'

// Estados reactivos
const characters = ref<Character[]>([])
const isLoading = ref<boolean>(true)
const errorMessage = ref<string | null>(null)

// Función para cargar los datos
const loadCharacters = async () => {
  try {
    isLoading.value = true
    errorMessage.value = null
    const response = await getCharacters()
    characters.value = response.results
  } catch (error: any) {
    // Aquí recibimos el ApiError estructurado desde el interceptor
    errorMessage.value = error.message || 'Error al obtener los personajes'
  } finally {
    isLoading.value = false
  }
}

// Ejecutar al montar el componente
onMounted(() => {
  loadCharacters()
})
</script>

<template>
  <div class="c-character-list">
    <h2>Personajes de Rick and Morty</h2>

    <div v-if="isLoading" class="c-character-list__loading">
      <p>Cargando personajes...</p>
    </div>

    <div v-else-if="errorMessage" class="c-character-list__error">
      <p>{{ errorMessage }}</p>
      <button @click="loadCharacters">Reintentar</button>
    </div>

    <ul v-else class="o-grid">
      <li v-for="character in characters" :key="character.id" class="c-card">
        <img
          :src="character.image"
          :alt="`Imagen de ${character.name}`"
          class="c-card__image"
          loading="lazy"
        />
        <div class="c-card__body">
          <h3>{{ character.name }}</h3>
          <p><strong>Estado:</strong> {{ character.status }}</p>
          <p><strong>Especie:</strong> {{ character.species }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Estilos base orientados a BEM / ITCSS */
.o-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
}

.c-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.c-card:hover {
  transform: translateY(-5px);
}

.c-card__image {
  width: 100%;
  height: auto;
  display: block;
}

.c-card__body {
  padding: 1rem;
}

.c-character-list__error {
  color: #d32f2f;
  text-align: center;
  padding: 2rem;
  background-color: #ffebee;
  border-radius: 8px;
}
</style>
