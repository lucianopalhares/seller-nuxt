<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-4" elevation="2">
          <!-- Texto superior "Entrar" -->
          <v-row>
            <v-col class="text-center" cols="12">
              <v-toolbar flat color="primary">
                <v-toolbar-title>Cadastro de Usuário</v-toolbar-title>
                <v-divider class="mx-12" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-col>
          </v-row>
          
          <!-- Formulário -->
          <v-form ref="form" @submit.prevent="submitForm" v-model="valid">
            <v-text-field
              v-model="user.name"
              label="Nome"
              required
              outlined
              class="input-field mb-4"
            />

            <v-text-field
              v-model="user.email"
              label="Email"
              required
              outlined
              :rules="[emailRule]"
              class="input-field mb-4"
            />

            <v-text-field
              v-model="user.password"
              label="Senha"
              required
              outlined
              type="password"
              :rules="[passwordRule]"
              class="input-field mb-4"
            />

            <v-text-field
              v-model="user.password_confirmation"
              label="Confirmação de Senha"
              required
              outlined
              type="password"
              :rules="[passwordMatchRule]"
              class="input-field mb-4"
            />

            <v-btn :disabled="!valid" type="submit" color="primary" block>
              Salvar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false, // Para validação geral do formulário
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      emailRule: (value) =>
        !!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Email inválido.',
      passwordRule: (value) =>
        (value && value.length >= 8) || 'A senha deve ter no mínimo 8 caracteres.',
      passwordMatchRule: (value) =>
        value === this.user.password || 'As senhas não correspondem.',
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        // Enviar os dados
        this.$emit('submit', this.user);
        alert('Formulário enviado com sucesso!');
      } else {
        alert('Por favor, corrija os erros no formulário.');
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  background-color: #fff;
  border-radius: 8px;
}

/* Estilo para os inputs */
.input-field {
  background-color: black; /* Preto */
  padding: 10px;
  position: relative;
}

.input-field input::placeholder {
  color: transparent; /* Torna o placeholder transparente */
}

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

/* Ajuste da borda dos inputs */
.v-text-field .v-input__control {
  border-color: black;
}

.v-btn {
  margin-top: 20px;
}

h3 {
  font-weight: bold;
}
</style>
