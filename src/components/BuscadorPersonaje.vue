<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters.store'

const store = useCharactersStore()

let timeoutId: ReturnType<typeof setTimeout>

const handleSearch = (value: string) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    store.loadCharacters(value)
  }, 500)
}
</script>

<template>
  <div class="c-buscador">
    <FormKit
      type="search"
      name="search_character"
      placeholder="Buscar..."
      @input="(value) => handleSearch(value as string)"
      :classes="{
        outer: 'c-buscador__outer',
        inner: 'c-buscador__inner',
        input: 'c-buscador__input',
      }"
    />
  </div>
</template>

<style scoped>
.c-buscador {
  width: 100%;
  max-width: 300px;
}
:deep(.c-buscador__inner) {
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
}
:deep(.c-buscador__input) {
  border: none;
  background: transparent;
  width: 100%;
  padding: 0.5rem;
  outline: none;
  font-size: 1rem;
}
</style>
