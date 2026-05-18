<script setup lang="ts">
import { computed } from 'vue'
import Swal from 'sweetalert2'
import { useFavoritesStore } from '@/stores/favorites.store'
import type { Character } from '@/models/CharactersModel'

const props = defineProps<{
  character: Character
}>()

const store = useFavoritesStore()

// Comprueba reactivamente si este personaje ya es favorito
const isFav = computed(() => store.isFavorite(props.character.id))

const handleFavoriteClick = () => {
  const added = store.toggleFavorite(props.character)

  if (added) {
    Swal.fire({
      icon: 'success',
      title: '¡Añadido!',
      text: `${props.character.name} se añadió a favoritos.`,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'bottom-end',
    })
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Removido',
      text: `${props.character.name} se eliminó de favoritos.`,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'bottom-end',
    })
  }
}
</script>

<template>
  <button
    @click="handleFavoriteClick"
    class="c-btn-fav"
    :class="{ 'c-btn-fav--active': isFav }"
    :title="isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'"
  >
    {{ isFav ? '★' : '☆' }}
  </button>
</template>

<style scoped>
.c-btn-fav {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
}
.c-btn-fav--active {
  color: #f1c40f; /* Amarillo estrella */
}
</style>
