<script setup lang="ts">
import { computed } from 'vue'
import { useCharactersStore } from '@/stores/characters.store'

const store = useCharactersStore()

const paginationArray = computed(() => {
  const current = store.currentPage
  const total = store.totalPages
  const delta = 1

  if (total <= 1) return []

  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= total; i++) {
    if (i == 1 || i == total || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
})

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page !== store.currentPage) {
    store.loadCharacters(page)
  }
}
</script>

<template>
  <nav v-if="store.totalPages > 1" class="c-pagination" aria-label="Navegación de páginas">
    <button
      class="c-page-item c-page-item--nav"
      :class="{ 'c-page-item--disabled': store.currentPage === 1 }"
      @click="store.prevPage"
      :disabled="store.currentPage === 1"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <template v-for="(page, index) in paginationArray" :key="index">
      <span v-if="page === '...'" class="c-page-item--dots">...</span>

      <button
        v-else
        class="c-page-item"
        :class="{ 'c-page-item--active': page === store.currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      class="c-page-item c-page-item--nav"
      :class="{ 'c-page-item--disabled': store.currentPage === store.totalPages }"
      @click="store.nextPage"
      :disabled="store.currentPage === store.totalPages"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.c-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
}

.c-page-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background-color: transparent;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 800;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.2s ease;
}

.c-page-item:hover:not(.c-page-item--disabled, .c-page-item--active) {
  border-color: #d1d5db;
  background-color: #f3f4f6;
}

.c-page-item--active {
  border-color: #4f46e5;
  color: #4f46e5;
  background-color: transparent;
  pointer-events: none;
}

.c-page-item--dots {
  display: flex;
  justify-content: center;
  align-items: end;
  width: 40px;
  height: 45px;
  font-size: 1.5rem;
  font-weight: 800;
  color: #374151;
  letter-spacing: 2px;
  padding-bottom: 8px;
}

.c-page-item--nav {
  color: #9ca3af;
}

.c-page-item--disabled {
  background-color: #d1d5db;
  border-color: #d1d5db;
  color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.8;
}
</style>
