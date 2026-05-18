import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Character } from '@/models/CharactersModel';

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref<Character[]>([]);

    const toggleFavorite = (character: Character) => {
        const index = favorites.value.findIndex((c) => c.id === character.id);
        if (index === -1) {
            favorites.value.push(character);
            return true;
        } else {
            favorites.value.splice(index, 1);
            return false;
        }
    };

    const isFavorite = (id: number): boolean => {
        return favorites.value.some((c) => c.id === id);
    };

    return { favorites, toggleFavorite, isFavorite };
}, {
    persist: true,
});