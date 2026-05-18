export const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Clase de error personalizada para manejar excepciones de la API
 */
export class ApiError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Validador de respuestas HTTP
 */
const handleHttpErrors = async (response: Response): Promise<Response> => {
    if (!response.ok) {
        let errorMessage = 'Ocurrió un error inesperado';

        switch (response.status) {
            case 400:
                errorMessage = 'Solicitud incorrecta: El servidor no pudo entender la petición.';
                break;
            case 401:
                errorMessage = 'No autorizado: Acceso denegado.';
                break;
            case 403:
                errorMessage = 'Prohibido: No tienes permiso para acceder a este recurso.';
                break;
            case 404:
                errorMessage = 'No encontrado: No se pudo encontrar el recurso solicitado.';
                break;
            case 500:
                errorMessage = 'Error interno del servidor: Algo salió mal en el servidor.';
                break;
            case 503:
                errorMessage = 'Servicio no disponible: El servidor actualmente no puede manejar la solicitud.';
                break;
            default:
                errorMessage = `Error HTTP: ${response.status} - ${response.statusText}`;
        }

        throw new ApiError(response.status, errorMessage);
    }

    return response;
};

/**
 * Wrapper genérico para realizar peticiones fetch
 */
export const fetchApi = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        await handleHttpErrors(response);
        return (await response.json()) as T;

    } catch (error) {
        // rrores de red
        if (error instanceof TypeError) {
            throw new Error('Error de red: Por favor, comprueba tu conexión a internet o la política CORS.');
        }
        // Error inesperado
        throw error;
    }
};