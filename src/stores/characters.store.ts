import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCharacters } from '@/services/characters/character.service';
import type { Character } from '@/models/CharactersModel';

export const useCharactersStore = defineStore('characters', () => {
    const characters = ref<Character[]>([]);
    const isLoading = ref<boolean>(false);
    const errorMessage = ref<string | null>(null);
    const currentQuery = ref<string>('');

    const loadCharacters = async (name: string = '') => {
        isLoading.value = true;
        errorMessage.value = null;
        currentQuery.value = name;

        try {
            const response = await getCharacters(1, name);
            characters.value = response.results;
        } catch (error: any) {
            if (error.status === 404) {
                characters.value = [];
                errorMessage.value = 'No se encontraron personajes con ese nombre.';
            } else {
                errorMessage.value = error.message || 'Ocurrió un error al buscar.';
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        characters,
        isLoading,
        errorMessage,
        currentQuery,
        loadCharacters
    };
});