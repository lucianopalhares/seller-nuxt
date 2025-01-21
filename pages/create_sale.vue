<template>
    <div class="form-container">
        <v-toolbar
    flat
    color="primary"
    >

    <v-toolbar-title >      
        Realizar venda
    </v-toolbar-title>

    <v-divider
        class="mx-12"
        inset
        vertical
    ></v-divider>

    <v-spacer></v-spacer>
        
    </v-toolbar>
  
      <v-divider class="mx-2" inset vertical></v-divider>
 
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-select
                v-model="sale.seller_id"
                :items="sellers"
                :item-text="'name'"
                :item-value="'id'"
                label="Selecione o vendedor"
                required
                :rules="[rules.required]"
                :loading="loadingSellers"
                class="input-field"
              ></v-select>
            </v-col>
    
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                v-model="sale.sale_value"
                label="Valor da Venda"
                required
                :rules="[rules.required, rules.isNumber]"
                type="number"
                class="input-field"
              ></v-text-field>
            </v-col>
    
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
          const response = await fetch(`${process.env.URL_API}/sellers`, {
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
          this.$removeToken()
          this.$router.push('/login');
        } finally {
          this.loadingSellers = false;
        }
      },
      async submitForm() {
        this.loading = true;
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${process.env.URL_API}/sales`, {
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
  
          const result = await response.json();
          alert('Venda cadastrada com sucesso!');
          this.resetForm();
        } catch (error) {
          console.error('Erro ao salvar venda:', error.message);
          this.$router.push('/login');
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
  