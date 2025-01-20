<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-4" elevation="2">
          <!-- Texto superior "Entrar" -->
          <v-row>
            <v-col class="text-center" cols="12">
              <h3>Entrar</h3>
            </v-col>
          </v-row>
          
          <!-- Formulário -->
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="user.name"
              label="Nome"
              required
              outlined
              color="black"
              class="mb-4"
            />
            <v-text-field
              v-model="user.email"
              label="Email"
              required
              outlined
              type="email"
              class="mb-4"
            />
            <v-text-field
              v-model="user.password"
              label="Senha"
              required
              outlined
              type="password"
              color="black"
              class="mb-4"
            />
            <v-btn type="submit" color="primary" block>
              Login
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
      user: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.user)
    },
  },
}
</script>

<style scoped>
.v-card {
  background-color: #fff;
  border-radius: 8px;
}

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
