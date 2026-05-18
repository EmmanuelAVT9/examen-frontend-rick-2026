import { apiClient } from '../api/base_url_api';
import type { CharacterResponse } from '@/models/CharactersModel';

/**
 * Obtiene la lista de personajes de la API de Rick and Morty
 * @param page Número de página opcional (por defecto 1)
 */
export const getCharacters = async (page: number = 1): Promise<CharacterResponse> => {
    // Axios inyecta automáticamente el JSON en la propiedad "data"
    const response = await apiClient.get<CharacterResponse>(`/character/?page=${page}`);
    return response.data;
};