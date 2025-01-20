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
          const response = await this.$auth.loginWith('local', { data: userData })

          console.log('response', response)
  
          // Verifique se o login foi bem-sucedido e redirecione
          if (response && response.data.token) {
            localStorage.setItem('token', response.data.token);
            this.$router.push('/sellers')  // Redireciona para a página de criação de vendedor
          } else {
            alert('Login falhou. Verifique suas credenciais e tente novamente.')
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error)
          alert('Ocorreu um erro ao fazer login. Tente novamente.')
        }
      }
    }
  }
  </script>
  