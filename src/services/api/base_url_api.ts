import axios from 'axios';

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
 * Instancia global de Axios preconfigurada
 */
export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor de respuestas para manejo centralizado de errores
 */
apiClient.interceptors.response.use(
    (response) => {
        // Si la respuesta es exitosa (código 2xx), la devolvemos tal cual
        return response;
    },
    (error) => {
        let errorMessage = 'Ocurrió un error inesperado';
        let status = 0;

        // Si el servidor respondió con un código de error HTTP
        if (error.response) {
            status = error.response.status;
            switch (status) {
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
                    errorMessage = `Error HTTP: ${status} - ${error.response.statusText}`;
            }
        }
        // Si la petición se hizo pero no hubo respuesta
        else if (error.request) {
            errorMessage = 'Error de red: Por favor, comprueba tu conexión a internet o la política CORS.';
        }

        // Se rechaza nuestra promesa devolviendo nuestra clase de error personalizada
        return Promise.reject(new ApiError(status, errorMessage));
    }
);