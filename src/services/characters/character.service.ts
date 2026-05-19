import { apiClient } from '../api/base_url_api';
import type { CharacterResponse } from '@/models/CharactersModel';

/**
 * Obtiene la lista de personajes de la API de Rick and Morty
 * @param page Número de página (por defecto 1)
 * @param name Nombre a buscar (opcional)
 */
export const getCharacters = async (page: number = 1, name: string = ''): Promise<CharacterResponse> => {
    const params = new URLSearchParams({ page: page.toString() });

    if (name) {
        params.append('name', name);
    }

    const response = await apiClient.get<CharacterResponse>(`/character/?${params.toString()}`);
    return response.data;
};