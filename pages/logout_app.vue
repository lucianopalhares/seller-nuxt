<template>
  <div>
    <!-- Seu conteúdo aqui -->
  </div>
</template>

<script>
export default {
  mounted() {
    // Chama o método logout quando a página é carregada
    this.logout();
  },
  methods: {
    async logout() {
      try {
        const token = localStorage.getItem('token');

        // Se o token existir, faz a requisição de logout
        if (token) {
          const response = await this.$axios.$post(
            'logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Adiciona o Bearer token no cabeçalho
              }
            }
          );

          // Ação após o logout bem-sucedido, como redirecionamento ou limpeza de estado
          console.log('Logout realizado com sucesso', response);
          
          // Opcional: Redireciona para a página de login após o logout
          this.$router.push('/login');
        } else {
          console.log('Token de autenticação não encontrado');
        }
      } catch (error) {
        console.error('Erro ao realizar o logout:', error);
      }
    }
  }
};
</script>
