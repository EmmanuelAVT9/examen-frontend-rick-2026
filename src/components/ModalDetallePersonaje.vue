<script setup lang="ts">
import type { Character } from '@/models/CharactersModel'

defineProps<{
  character: Character | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const getStatusBadgeStyle = (status: 'Alive' | 'Dead' | 'unknown') => {
  if (status === 'unknown') {
    return { backgroundColor: 'var(--badge-unknown)' }
  }
  return { backgroundColor: 'var(--badge-alive)' }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen && character" class="c-modal-overlay" @click.self="emit('close')">
        <div class="c-modal">
          <button class="c-modal__close" @click="emit('close')" aria-label="Cerrar detalles">
            CERRAR <span class="c-modal__close-icon">&times;</span>
          </button>

          <div class="c-modal__content">
            <img :src="character.image" :alt="character.name" class="c-modal__image" />

            <div class="c-modal__details">
              <h2 class="c-modal__title">{{ character.name }}</h2>

              <div class="c-modal__badges">
                <span class="c-badge" :style="getStatusBadgeStyle(character.status)">
                  <strong>Estado:</strong> {{ character.status }}
                </span>

                <span class="c-badge c-badge--gender">
                  <strong>Género:</strong> {{ character.gender }}
                </span>

                <span class="c-badge c-badge--species">
                  <strong>Especie:</strong> {{ character.species }}
                </span>

                <span class="c-badge c-badge--origin">
                  <strong>Origen:</strong> {{ character.origin.name }}
                </span>

                <span class="c-badge c-badge--location c-badge--wide">
                  <strong>Ubicación:</strong> {{ character.location.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.c-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--modal-overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.c-modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.c-modal__close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: #fde8e8;
  color: #c81e1e;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
}

.c-modal__close-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.c-modal__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

.c-modal__image {
  width: 80%;
  max-width: 350px;
  height: auto;
  aspect-ratio: 1;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 1.5rem;
}

.c-modal__details {
  width: 100%;
  text-align: center;
}

.c-modal__title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.c-modal__badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
}

.c-badge {
  font-family: 'Arial', sans-serif;
  font-weight: 200;
  font-style: normal;
  color: var(--black);
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 999px;
  color: #333;
  white-space: nowrap;
}

.c-badge strong {
  font-weight: 800;
  color: #111;
}

.c-badge--gender {
  font-family: 'Arial', sans-serif;
  font-weight: 200;
  font-style: normal;
  color: var(--black);
  font-size: 1rem;
  background-color: var(--badge-gender);
}
.c-badge--species {
  font-family: 'Arial', sans-serif;
  font-weight: 200;
  font-style: normal;
  color: var(--black);
  font-size: 1rem;
  background-color: var(--badge-species);
}
.c-badge--origin {
  font-family: 'Arial', sans-serif;
  font-weight: 200;
  font-style: normal;
  color: var(--black);
  font-size: 1rem;
  background-color: var(--badge-origin);
}
.c-badge--location {
  font-family: 'Arial', sans-serif;
  font-weight: 200;
  font-style: normal;
  color: var(--black);
  font-size: 1rem;
  background-color: var(--badge-location);
}

.c-badge--wide {
  width: 90%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
