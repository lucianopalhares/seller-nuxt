export default function ({ $axios, redirect }) {

    // Interceptador de erro
    $axios.onError((error) => {
      console.log('Erro capturado no axios:', error); // Verifique se o erro está sendo capturado
      
      // Verifica se o erro é 401 (não autorizado)
      if (error.response && error.response.status === 401) {
        console.log('erro axios 401', error.response.status);
        
        // Redireciona para a página de login usando o redirect
        localStorage.removeItem('token');
      }
    });
  }
  