<template>
    <div class="form-container">
      <v-toolbar flat color="primary">
        <v-toolbar-title>
          Cadastrar Vendedor
        </v-toolbar-title>
        <v-divider class="mx-12" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
  
      <v-divider class="mx-2" inset vertical></v-divider>
  
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <!-- Campo para o nome do vendedor -->
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="seller.name"
                label="Nome do Vendedor"
                required
                :rules="[rules.required]"
                class="input-field mb-4"
              />
            </v-col>
  
            <!-- Campo para o e-mail do vendedor -->
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="seller.email"
                label="Email do Vendedor"
                required
                type="email"
                :rules="[rules.required, rules.isEmail]"
                class="input-field mb-4"
              />
            </v-col>
  
            <!-- Botões de salvar e limpar -->
            <v-row>
              <v-btn :disabled="!valid || loading" color="primary" @click="submitForm">
                Salvar Vendedor
              </v-btn>
              <v-btn color="grey" @click="resetForm">Limpar</v-btn>
            </v-row>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: false,
        loading: false,
        seller: {
          name: '',
          email: '',
        },
        urlApi: 'http://localhost:8000/api',
        rules: {
          required: (value) => !!value || 'Campo obrigatório.',
          isEmail: (value) => /\S+@\S+\.\S+/.test(value) || 'E-mail inválido.',
        },
      };
    },
    methods: {
      async submitForm() {
        this.loading = true;
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${this.urlApi}/sellers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(this.seller),
          });
  
          if (!response.ok) {
            throw new Error('Erro ao cadastrar vendedor');
          }
  
          const result = await response.json();
          alert('Vendedor cadastrado com sucesso!');
          this.resetForm();
        } catch (error) {
          console.error('Erro ao cadastrar vendedor:', error.message);
          this.$router.push('/login');
        } finally {
          this.loading = false;
        }
      },
      resetForm() {
        this.seller = {
          name: '',
          email: '',
        };
        this.$refs.form.reset();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Centraliza o conteúdo */
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
  }
  
  /* Título azul */
  .form-title {
    color: blue;
    margin-bottom: 20px;
  }
  
  /* Estilo para os inputs */
  .input-field {
    background-color: black; /* Cinza claro */
    padding: 10px;
  }
  
  /* Garanta que o placeholder não fique visível no fundo do input */
  .input-field input::placeholder {
    color: transparent; /* Torna o placeholder transparente */
  }
  
  /* Cor preta para o label */
  .input-field label {
    color: black !important;
    position: absolute;
    top: -10px; /* Ajusta a posição do label acima do input */
    left: 10px;
    font-weight: bold;
    font-size: 14px;
    background-color: white;
    padding: 0 5px;
  }
  
  /* Ajuste a posição do campo de texto */
  .v-input__control {
    margin-top: 20px; /* Espaço entre os campos */
  }
  
  /* Adiciona margem ao botão */
  .v-btn {
    margin-top: 10px;
  }
  </style>
  