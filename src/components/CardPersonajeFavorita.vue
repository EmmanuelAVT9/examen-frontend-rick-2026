<script setup lang="ts">
import type { Character } from '@/models/CharactersModel'
import BotonFavorito from './BotonFavorito.vue'

defineProps<{
  character: Character
}>()
</script>

<template>
  <article class="c-card-fav">
    <img :src="character.image" :alt="character.name" class="c-card-fav__image" loading="lazy" />
    <div class="c-card-fav__info">
      <h4>{{ character.name }}</h4>
    </div>
    <BotonFavorito :character="character" />
  </article>
</template>

<style scoped>
.c-card-fav {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: #f9f9f9;
}
.c-card-fav__image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}
.c-card-fav__info {
  flex-grow: 1;
  text-align: left;
}
</style>
