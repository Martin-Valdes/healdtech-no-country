export const handleApiError = (error: any) => {
    console.error('API Error:', error);
    let errorMessage = 'An unexpected error occurred';
  
    if (error.response) {
      // El servidor respondió con un estado fuera del rango 2xx
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      errorMessage = 'No response received from server';
    } else {
      // Algo pasó al configurar la solicitud
      errorMessage = error.message;
    }
  
    return { success: false, message: errorMessage };
  };