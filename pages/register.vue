<template>
    <div>
      <UserFormRegister @submit="register" />
    </div>
  </template>
  
  <script>
  import UserFormRegister from '~/components/UserFormRegister.vue'
  
  export default {
    components: {
      UserFormRegister
    },
    methods: {
      async register(userData) {
        // Validação simples dos dados do usuário antes de enviar
        if (!userData.email || !userData.password || !userData.password_confirmation || !userData.name) {
          alert('Por favor, preencha todos os campos!')
          return
        }
  
        try {
          const response = await this.$axios.post('/register', userData);
          
          console.log('response', response)
  
          // Verifique se o cadastro foi bem-sucedido e redirecione
          if (response && response.data.token) {
            localStorage.setItem('token', response.data.token);

            this.$store.dispatch('user/loginUser', response.data.user);

            this.$router.push('/sellers')  // Redireciona para a página de criação de cadastro
          } else {
            alert('cadastro falhou. Verifique suas credenciais e tente novamente.')
          }
        } catch (error) {
          console.error('Erro ao fazer cadastro:', error)
          alert('Ocorreu um erro ao fazer cadastro. Tente novamente.')
        }
      }
    }
  }
  </script>
  