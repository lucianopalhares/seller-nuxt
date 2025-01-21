<template>
    <div>
      <h1>Login</h1>
      <UserForm @submit="login" />
    </div>
  </template>
  
  <script>
  import UserForm from '~/components/UserForm.vue'
  
  export default {
    components: {
      UserForm
    },
    methods: {
      async login(userData) {
        // Validação simples dos dados do usuário antes de enviar
        if (!userData.email || !userData.password) {
          alert('Por favor, preencha todos os campos!')
          return
        }
  
        try {
          this.$store.dispatch('user/loginUser', userData);

          if (this.$checkToken()) this.$router.push('/sellers');
        } catch (error) {
          console.error('Erro ao fazer login:', error)
          alert('Ocorreu um erro ao fazer login. Tente novamente.')
        }
      }
    }
  }
  </script>
  