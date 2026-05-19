import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCharacters } from '@/services/characters/character.service';
import type { Character } from '@/models/CharactersModel';

export const useCharactersStore = defineStore('characters', () => {
    // Estados
    const characters = ref<Character[]>([]);
    const isLoading = ref<boolean>(false);
    const errorMessage = ref<string | null>(null);

    // Estados de Búsqueda y Paginación
    const currentQuery = ref<string>('');
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(0);

    // Modificamos loadCharacters para aceptar la página
    const loadCharacters = async (page: number = 1, name: string = currentQuery.value) => {
        isLoading.value = true;
        errorMessage.value = null;
        currentQuery.value = name;

        try {
            const response = await getCharacters(page, name);
            characters.value = response.results;
            currentPage.value = page;
            totalPages.value = response.info.pages;
        } catch (error: any) {
            if (error.status === 404) {
                characters.value = [];
                totalPages.value = 0;
                errorMessage.value = 'No se encontraron personajes con ese nombre.';
            } else {
                errorMessage.value = error.message || 'Ocurrió un error al buscar.';
            }
        } finally {
            isLoading.value = false;
        }
    };

    // Funciones auxiliares para cambiar de página
    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            loadCharacters(currentPage.value + 1);
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            loadCharacters(currentPage.value - 1);
        }
    };

    return {
        characters,
        isLoading,
        errorMessage,
        currentQuery,
        currentPage,
        totalPages,
        loadCharacters,
        nextPage,
        prevPage
    };
});