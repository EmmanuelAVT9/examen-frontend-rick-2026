<script setup lang="ts">
import { useRouter } from 'vue-router'
import ListadoPersonajes from '@/components/ListadoPersonajes.vue'
import BuscadorPersonaje from '@/components/BuscadorPersonaje.vue'

const router = useRouter()

const handleSearch = (query: string) => {
  console.log('Buscando:', query)
}
</script>

<template>
  <main class="l-home">
    <header class="l-home__header">
      <h1 class="l-home__title">Wubba lubba dub dub!</h1>
      <h2 class="l-home__subtitle">Base de datos de personajes de Rick y Morty</h2>
    </header>

    <div class="l-home__actions">
      <div class="l-home__actions-left">
        <BuscadorPersonaje @search="handleSearch" />
      </div>

      <div class="l-home__actions-right">
        <button class="c-btn-favorites-nav" @click="router.push('/favoritos')">
          Mis favoritos
          <span class="c-btn-favorites-nav__icon">★</span>
        </button>
      </div>
    </div>

    <section class="l-home__main">
      <ListadoPersonajes />
    </section>
  </main>
</template>

<style scoped>
.l-home {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
.l-home__header {
  text-align: center;
  margin-bottom: 2rem;
}
.l-home__title {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
}
.l-home__subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}
.l-home__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.c-btn-favorites-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f5f5f5;
  border: 1px solid #eaeaea;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.c-btn-favorites-nav:hover {
  background-color: #e0e0e0;
}
.c-btn-favorites-nav__icon {
  background-color: #5a4bff;
  color: white;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .l-home__actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
