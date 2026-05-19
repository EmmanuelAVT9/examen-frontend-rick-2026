<script setup lang="ts">
import { useRouter } from 'vue-router'
import ListadoPersonajesFavoritos from '@/components/ListadoPersonajesFavoritos.vue'

const router = useRouter()
</script>

<template>
  <main class="l-favorites">
    <header class="l-favorites__header">
      <h1 class="l-favorites__title">Mis favoritos</h1>
    </header>

    <div class="l-favorites__actions">
      <button class="c-btn-back" @click="router.push('/')">
        <span class="c-btn-back__icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </span>
        Volver
      </button>
    </div>

    <section class="l-favorites__content">
      <ListadoPersonajesFavoritos />
    </section>
  </main>
</template>

<style scoped>
.l-favorites {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.l-favorites__header {
  text-align: center;
  margin-bottom: 2rem;
}

.l-favorites__title {
  font-size: 2.5rem;
  font-weight: 900;
}

.l-favorites__actions {
  margin-bottom: 2rem;
}

/* Estilos exactos para el botón Volver del mockup */
.c-btn-back {
  display: inline-flex;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #eaeaea;
  padding: 0;
  padding-right: 16px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: opacity 0.2s;
}

.c-btn-back:hover {
  opacity: 0.8;
}

.c-btn-back__icon {
  background-color: #2b5b84; /* Azul oscuro del mockup */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  margin-right: 12px;
}
</style>
