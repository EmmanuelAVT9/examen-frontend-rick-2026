<script setup lang="ts">
import type { Character } from '@/models/CharactersModel'
import BotonFavorito from './BotonFavorito.vue'

defineProps<{
  character: Character
}>()

// Definimos el evento que vamos a emitir hacia el padre
defineEmits<{
  (e: 'select', character: Character): void
}>()
</script>

<template>
  <article class="c-card" @click="$emit('select', character)">
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

      <div class="c-card__actions" @click.stop>
        <BotonFavorito :character="character" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.c-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  cursor: pointer; /* Cambia el cursor a una manita */
  transition: transform 0.2s ease;
}

/* Efecto visual al pasar el mouse (opcional pero recomendado) */
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
.c-card__actions {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
</style>
