<template>
    <div>
      <v-divider class="mx-2" inset vertical></v-divider>
  
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="sale.seller_id"
                :items="sellers"
                :item-text="'name'"
                :item-value="'id'"
                label="Selecione o vendedor"
                required
                :rules="[rules.required]"
                :loading="loadingSellers"
              ></v-select>
            </v-col>
  
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="sale.sale_value"
                label="Valor da Venda"
                required
                :rules="[rules.required, rules.isNumber]"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
  
          <v-row>
            <v-btn
              :disabled="!valid || loading"
              color="primary"
              class="mr-3"
              @click="submitForm"
            >
              Salvar Venda
            </v-btn>
            <v-btn color="grey" @click="resetForm">Limpar</v-btn>
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
        loadingSellers: false,
        sellers: [],
        sale: {
          seller_id: null,
          sale_value: null,
        },
        urlApi: 'http://localhost:8000/api',
        rules: {
          required: (value) => !!value || 'Campo obrigatório.',
          isNumber: (value) =>
            !isNaN(value) || 'O valor deve ser um número válido.',
        },
      };
    },
    methods: {
      async fetchSellers() {
        this.loadingSellers = true;
        try {
          const token = localStorage.getItem('token');

          console.log('token1', token)

          const response = await fetch(`${this.urlApi}/sellers`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Erro ao buscar vendedores');
          }

          if (response.status === 204) {
            console.log('Nenhum vendedor encontrado');
          } else {
            const result = await response.json();
            this.sellers = result.data;
          }

        } catch (error) {
          console.error('Erro ao carregar vendedores:', error.message);
        } finally {
          this.loadingSellers = false;
        }
      },
      async submitForm() {
        this.loading = true;
        try {
          const token = localStorage.getItem('token');

          console.log('token2', token)

          const response = await fetch(`${this.urlApi}/sales`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(this.sale),
          });
  
          if (!response.ok) {
            throw new Error('Erro ao salvar venda');
          }

          console.log('response sale', response)
  
          const result = await response.json();
          alert('Venda cadastrada com sucesso!');
          console.log('Venda cadastrada:', result);
  
          this.resetForm();
        } catch (error) {
          console.error('Erro ao salvar venda:', error.message);
        } finally {
          this.loading = false;
        }
      },
      resetForm() {
        this.sale = {
          seller_id: null,
          sale_value: null,
        };
        this.$refs.form.reset();
      },
    },
    mounted() {
      this.fetchSellers(); // Carrega a lista de vendedores ao montar o componente
    },
  };
  </script>
  
  <style scoped>
  /* Adicione seus estilos personalizados aqui, se necessário */
  </style>
  