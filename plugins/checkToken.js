export default ({ app }, inject) => {
    // Função para verificar se o token existe no localStorage
    const checkToken = () => {
      const token = localStorage.getItem('token');
      return !!token; // Retorna true se o token existe, caso contrário false
    };

    const removeToken = () => {
        localStorage.removeItem('token');
    };   
  
    inject('checkToken', checkToken);
    inject('removeToken', removeToken);
  };
  