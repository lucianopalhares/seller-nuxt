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

        this.$store.dispatch('user/logoutUser');

      } catch (error) {
        console.error('Erro ao realizar o logout:', error);
      }
    }
  }
};
</script>
